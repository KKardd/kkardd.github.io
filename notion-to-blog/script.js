const {Client} = require("@notionhq/client");
const {NotionToMarkdown} = require("notion-to-md");
const getKey = require("./get-secret-notion-key.js");
const getPostStyle = require("./post-style.constant.js");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

// 비밀 키를 가져옴 (수동으로 실행할 때에도 동일)
const secreyKey = getKey();
const notion = new Client({
    auth: secreyKey,
});
const n2m = new NotionToMarkdown({notionClient: notion});

(async () => {
    // 사용자가 직접 설정하는 제목
    const title = "Node VS Java"; // 페이지 제목 수동 설정
    // 사용자가 수동으로 설정한 Notion 페이지 ID
    const pageId = "42181bcd288a4c5cac9b5c0ef5fe3f36"; // 수동으로 Notion 페이지 ID를 설정

    // Notion 페이지에서 Markdown 블록을 가져옴
    const mdblocks = await n2m.pageToMarkdown(pageId);

    let imageCount = 0;
    let fileCount = 0;

    // 각 블록을 처리하면서, 이미지 및 파일 다운로드
    for (const block of mdblocks) {
        if (block.type === "image") {
            // 이미지 URL 추출 및 다운로드 처리
            const imageUrlStartIdx = block.parent.indexOf("https://");
            const imageUrl = block.parent.slice(imageUrlStartIdx, -1);
            await download(imageUrl, title, imageCount, "jpg");
            block.parent = `![image.jpg](../../assets/img/Study/${title}-${imageCount}.jpg)`;
            imageCount++;
        } else if (block.type === "file") {
            // 파일 URL 및 확장자 추출 및 다운로드 처리
            const fileUrlStartIdx = block.parent.indexOf("https://");
            const fileUrl = block.parent.slice(fileUrlStartIdx, -1);
            const fileExtensionStartIdx = block.parent.indexOf(".", block.parent.indexOf("?X-Amz-Algorithm=") - 6) + 1;
            const fileExtensionEndIdx = block.parent.indexOf("?X-Amz-Algorithm=");
            const fileExtension = block.parent.slice(fileExtensionStartIdx, fileExtensionEndIdx);
            await download(fileUrl, title, fileCount, fileExtension);
            block.parent = `[Download file](../../assets/img/Study/${title}-${fileCount}.${fileExtension})`;
            fileCount++;
        }
    }

    // 현재 날짜를 가져오는 함수 호출
    const date = await getDate();

    // 가져온 mdblocks를 Markdown 문자열로 변환
    let mdString = n2m.toMarkdownString(mdblocks);
    // 문자열을 정제 (불필요한 개행 제거)
    mdString.parent = mdString.parent.replace(/\n\n/g, "\n");

    // 정해진 형식으로 게시글 내용 구성
    const refinedPost = getPostStyle(title);

    // 파일을 저장할 경로 설정
    const filePath = path.resolve(__dirname + "/..") + `/study/_posts/${date}-${title}.md`;

    // 파일 저장
    fs.writeFile(filePath, refinedPost + mdString.parent, (err) => {
        if (err) {
            console.error("파일을 저장하는 동안 오류가 발생했습니다.", err);
        } else {
            console.log("파일이 성공적으로 저장되었습니다.");
            return -1;
        }
    });

    // 새로운 페이지 ID를 저장
    const postedPagesFile = path.resolve(__dirname, "posted_pages.json");
    postedPages.push(pageId);
    fs.writeFileSync(postedPagesFile, JSON.stringify({posted_pages: postedPages}, null, 2));
})();

// 현재 날짜를 KST 기준으로 가져오는 함수
async function getDate() {
    const now = new Date();
    const kstOffset = 9 * 60;
    const kstTime = new Date(now.getTime() + kstOffset * 60 * 1000);
    const hours = kstTime.getUTCHours();

    if (hours < 9) {
        kstTime.setUTCDate(kstTime.getUTCDate() - 1);
    }

    const year = kstTime.getUTCFullYear();
    const month = String(kstTime.getUTCMonth() + 1).padStart(2, "0");
    const day = String(kstTime.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// 파일 및 이미지를 다운로드하는 함수
async function download(url, title, idx, type) {
    const savePath = path.resolve(__dirname + "/..") + `/assets/img/Study/${title}-${idx}.${type}`;
    try {
        const response = await axios({
            url,
            responseType: "stream",
        });

        const writer = fs.createWriteStream(savePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });
    } catch (error) {
        console.error(`Error downloading the image: ${error}`);
    }
}
