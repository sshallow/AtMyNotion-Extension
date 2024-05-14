import type {PlasmoMessaging} from "@plasmohq/messaging"
import fetchClient from "~fetch/fetch";

console.log("background-notion-search")

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

    const {user, userPreferences, query} = req.body

    if (!user || !userPreferences || !query) {
        throw new Error("Missing required parameters: user, userPreferences, or query");
    }

    // 获取最近页面访问数据
    const recentPagesResponse = await fetchClient({
        url: "https://www.notion.so/api/v3/getRecentPageVisits",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Notion-Active-User-Header": user.id,
            "X-Notion-Space-Id": userPreferences.currentSpace.id,
        },
        body: {
            userId: user.id,
            spaceId: userPreferences.currentSpace.id
        }
    });

    if (!recentPagesResponse) {
        console.log("recentPagesResponse 失败")
        throw new Error("Network response was not ok");
    }

    // 修改 recentPagesForBoosting
    recentPagesResponse.pages = recentPagesResponse.pages.map(item => ({
        visitedAt: item.visitedAt,
        pageId: item.id,
    }));

    // 构建新的请求体，将最近页面访问数据插入到 recentPagesForBoosting 字段中
    const requestBody = {
        source: "quick_find_input_change",
        sort: {
            field: "relevance",
        },
        filters: {
            lastEditedTime: {},
            excludeTemplates: false,
            navigableBlockContentOnly: false,
            ancestors: [],
            editedBy: [],
            requireEditPermissions: false,
            createdBy: [],
            isDeletedOnly: false,
            createdTime: {},
            inTeams: [],
            includePublicPagesWithoutExplicitAccess: false,
        },
        excludedBlockIds: [],
        query: query,
        limit: 8,
        recentPagesForBoosting: recentPagesResponse.pages, // 插入最近页面数据
        type: "BlocksInSpace",
        searchSessionId: "edd8ad05-fa6e-411b-8478-98378c024e3b",
        searchSessionFlowNumber: 3,
        searchExperimentOverrides: {},
        spaceId: userPreferences.currentSpace.id
    };

    // 开始搜索
    const response = await fetchClient({
        url: "https://www.notion.so/api/v3/search",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Notion-Active-User-Header": user.id,
            "X-Notion-Space-Id": userPreferences.currentSpace.id,
        },
        body: requestBody,
    });

    // 解析 为每个结果添加 title，path，icon
    const resultsWithIcon = await Promise.all(
        response.results.map(async (item) => {
            const recordBlock = response.recordMap.block[item.id];
            let updatedItem = item;

            debugger
            // 处理 title, pathText
            if (item.highlight?.title  && item.highlight.title.includes('<gzkNfoUU>')) {
                updatedItem.highlight.pathText = item.highlight.pathText.replace(item.highlight.title, '');
                updatedItem = {
                    ...updatedItem,
                    title:item.highlight?.title
                };
            }

            if (!updatedItem.highlight?.title) {
                const titleText = recordBlock.value.properties.title[0][0];
                updatedItem = {
                    ...updatedItem,
                    title: titleText
                };
            }

            // 处理 icon
            if (recordBlock?.value?.format?.page_icon) {
                let pageIcon=recordBlock?.value?.format?.page_icon
                if (pageIcon.includes("amazonaws.com")) {
                    const encodedUrl = encodeURIComponent(pageIcon);
                    const tableIdQuery = item.id ? `?table=block&id=${item.id}&width=40&cache=v2` : "";
                    const iconUrl = `https://www.notion.so/image/${encodedUrl}${tableIdQuery}`;
                    const response = await fetch(iconUrl, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }
                    const imageBlob = await response.blob();
                    //
                    const base64String = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(imageBlob);
                    });
                    console.log("成功转为了 blob 图片 base64String ",base64String)
                    updatedItem = {
                        ...updatedItem,
                        pageIcon:base64String
                    };
                } else if (pageIcon.includes("sinaimg.c")){
                    const replacedIconUrl = pageIcon.replace(/^(https?:\/\/)([^\/]+)(\/.*)$/, '$1i1.wp.com/$2$3');
                    updatedItem = {
                        ...updatedItem,
                        pageIcon:replacedIconUrl
                    };
                }  else {
                    updatedItem = {
                        ...updatedItem,
                        pageIcon
                    };
                }

            }

            return updatedItem;
        })
    );

    console.log("resultsWithIcon",resultsWithIcon)
    res.send({
        response:resultsWithIcon,
    })
}

export default handler
