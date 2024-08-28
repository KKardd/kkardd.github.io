const {Client} = require("@notionhq/client");
const {NotionToMarkdown} = require("notion-to-md");
const getKey = require("./get-secret-notion-key.js");
const getPostStyle = require("./post-style.constant.js");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const secreyKey = getKey();
const notion = new Client({
    auth: secreyKey,
});
const n2m = new NotionToMarkdown({notionClient: notion});

(async () => {
    // 제목 설정
    const title = "DB migration";
    // 페이지 ID 설정
    const mdblocks = await n2m.pageToMarkdown("b0d616077d1c474b8ab6b4747dd2d842");

    let i = 0;
    for (const block of mdblocks) {
        if (block.type === "image") {
            const imageUrlStartIdx = block.parent.indexOf("https://");
            const imageUrl = block.parent.slice(imageUrlStartIdx, -1);
            await downloadImage(imageUrl, title, i);
            block.parent = `![image.jpg](../../assets/img/Study/${title}-${i}.jpg)`;
            i++;
        }
    }

    const date = await getDate();
    let mdString = n2m.toMarkdownString(mdblocks);

    mdString.parent = mdString.parent.replace(/\n\n/g, "\n");
    const refinedPost = getPostStyle(title);

    fs.writeFile(
        path.resolve(__dirname + "/..") + `/study/_posts/${date}-${title}.md`,
        refinedPost + mdString.parent,
        (err) => {
            if (err) {
                console.error("파일을 저장하는 동안 오류가 발생했습니다.", err);
            } else {
                console.log("파일이 성공적으로 저장되었습니다.");
            }
        }
    );
})();

async function getDate() {
    // 현재 날짜와 시간을 가져옵니다.
    const now = new Date();

    // 한국 시간(KST)으로 변환합니다.
    const kstOffset = 9 * 60; // KST는 UTC+9 이므로, 분 단위로 변환합니다.
    const kstTime = new Date(now.getTime() + kstOffset * 60 * 1000);

    // 시간을 추출하여 9시 이전인지 확인합니다.
    const hours = kstTime.getUTCHours();

    // 만약 오전 9시 이전이라면, 날짜를 전날로 조정합니다.
    if (hours < 9) {
        kstTime.setUTCDate(kstTime.getUTCDate() - 1);
    }

    // 연도, 월, 일을 추출합니다.
    const year = kstTime.getUTCFullYear();
    const month = String(kstTime.getUTCMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(kstTime.getUTCDate()).padStart(2, "0");

    // YYYY-MM-DD 형식으로 만듭니다.
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

async function downloadImage(url, title, idx) {
    const savePath = path.resolve(__dirname + "/..") + `/assets/img/Study/${title}-${idx}.jpg`;
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
