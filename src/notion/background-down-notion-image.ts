interface Page {
    id: string;
    pageId: string
    name: string;
    fullIconUrl: string;
    visitedAt: number;
}


async function downNotionImage(page_icon: string): Promise<any> {
    console.log("downNotionImage")
    const response = await fetch(page_icon, {
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    console.log("下载成功",response.blob())
    return await response.blob();
}

export default downNotionImage;
