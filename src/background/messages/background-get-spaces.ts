import type {PlasmoMessaging} from "@plasmohq/messaging"
import fetchClient from "~fetch/fetch";
import {Storage} from "@plasmohq/storage";
import type {SpaceInfo, UserInfo} from "~notion/notion-model";
import {setSpaces, setUser} from "~notion/notion-slice";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    console.log("在 background-get-spaces 中 req", req)
    // 请求 getSpaces
    const response = await fetchClient({
        url: "https://www.notion.so/api/v3/getSpaces", method: "POST"
    });


    console.log("在 background-get-spaces 中 response", response)

    const spacesResponse = Object.values(response)[0];
    // const spaceIdList = Object.keys(spacesResponse.space);
    const userRootData = (Object.values((spacesResponse as any).user_root)[0] as any).value;
    const spaceIdList = userRootData.space_view_pointers.map((pointer: any) => pointer.spaceId);

    // 循环请求每个空间的 getTeams
    const spaceDataResponses = [];
    for (const spaceId of spaceIdList) {
        const teamResponse = await fetchClient({
            url: "https://www.notion.so/api/v3/getTeams",
            method: "POST",
            body: {
                spaceId: spaceId,
                includeArchived: false,
                onlyJoined: true
            }
        });
        
        // 只提取需要的字段
        const spaceData = teamResponse.recordMap?.space?.[spaceId]?.value;
        if (spaceData) {
            spaceDataResponses.push({
                id: spaceData.id,
                name: spaceData.name,
                icon: spaceData.icon
            });
        }
    }

    // 响应
    res.send({
        response,//用户信息
        spaceDataResponse: spaceDataResponses//空间信息
    })
}

export default handler
