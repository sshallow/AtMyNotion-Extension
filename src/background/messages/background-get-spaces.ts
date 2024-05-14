import type {PlasmoMessaging} from "@plasmohq/messaging"
import fetchClient from "~fetch/fetch";
import {Storage} from "@plasmohq/storage";
import {SpaceInfo, UserInfo} from "~notion/notion-model";
import {setSpaces, setUser} from "~notion/notion-slice";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

    // 请求 getSpaces
    const response = await fetchClient({
        url: "https://www.notion.so/api/v3/getSpaces", method: "POST"
    });

    const spacesResponse = Object.values(response)[0];
    const spaceIdList = Object.keys(spacesResponse.space);

    // 请求 getPublicSpaceData
    const requestBody = {
        type: "space-ids",
        spaceIds: spaceIdList
    };
    const spaceDataResponse = await fetchClient({
        url: "https://www.notion.so/api/v3/getPublicSpaceData", method: "POST", body: requestBody
    });


    // 响应
    res.send({
        response,
        spaceDataResponse
    })
}

export default handler
