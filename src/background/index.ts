import {persistor, store} from "~store"

console.log("Live now; make now always the most precious time. Now will never come again.")

// 监听 cookies 的变化
chrome.cookies.onChanged.addListener((changeInfo) => {
    // .notion.so 的 cookie 变化
    if (changeInfo.cookie.domain === ".notion.so") {
        console.log(".notion.so 的 cookie 变化",changeInfo.cookie)
        // explicit + overwrite + file_token 登录操作下变化
        if ((changeInfo.cause === "explicit" || changeInfo.cause === "overwrite") && changeInfo.cookie.name === "file_token") {
            const date = new Date()
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
            console.log(formattedDate, "监听到 .notion.so 的 file_token 的变化", changeInfo)
            // 发送消息到popup页面
            chrome.runtime.sendMessage({type: "notion_cookies_onChanged", payload: changeInfo}, function (res) {
                if (res) {
                    console.log("回调函数:", res)
                } else if (res && res.error) {
                    console.log("回调函数 Error:", res)
                }
            })
        } else {
        }
    }
})

persistor.subscribe(() => {
    console.log("background index.ts subscribe State: ", store?.getState())
})
