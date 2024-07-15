const {Client} = require("@notionhq/client");
const {NotionToMarkdown} = require("notion-to-md");
const getKey = require("./get-secret-notion-key.js");
const getPostStyle = require("./post-style.constant.js");
const fs = require("fs");

const secreyKey = getKey();

const notion = new Client({
    auth: secreyKey,
});

// passing notion client to the option
const n2m = new NotionToMarkdown({notionClient: notion});

(async () => {
    // 제목 설정
    const title = "Menu Orders";
    // 페이지 ID 설정
    const mdblocks = await n2m.pageToMarkdown("cfc3f346f7b7402288353d7d7474afe7");

    const date = await getDate();
    const mdString = n2m.toMarkdownString(mdblocks);
    const refinedPost = getPostStyle(title);

    fs.writeFile(`../study/_posts/${date}-${title}.md`, refinedPost + mdString.parent, (err) => {
        if (err) {
            console.error("파일을 저장하는 동안 오류가 발생했습니다.", err);
        } else {
            console.log("파일이 성공적으로 저장되었습니다.");
        }
    });
})();

async function getDate() {
    // 현재 날짜와 시간을 가져옵니다.
    const now = new Date();

    // 한국 시간(KST)으로 변환합니다.
    const kstOffset = 9 * 60; // KST는 UTC+9 이므로, 분 단위로 변환합니다.
    const kstTime = new Date(now.getTime() + kstOffset * 60 * 1000);

    // 연도, 월, 일을 추출합니다.
    const year = kstTime.getUTCFullYear();
    const month = String(kstTime.getUTCMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(kstTime.getUTCDate()).padStart(2, "0");

    // YYYY-MM-DD 형식으로 만듭니다.
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}
