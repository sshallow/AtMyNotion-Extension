import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    console.log(new Date().getTime(),"background 开始请求 NotionSearchMenu Notion 图片",req.body.page_icon)
    const response = await fetch(req.body.page_icon, {
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    const blob = await response.blob(); // 将响应体转换为blob
    console.log(new Date().getTime(),"background 请求到 NotionSearchMenu 图片", blob)

    // 将图片作为Blob发送回前端
    res.send({
        blob: blob,
    });
}

export default handler
