import {useEffect, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "~components/ui/avatar"
import type {SpaceInfo, UserInfo} from "~notion/notion-model";
import {useAppDispatch, useAppSelector} from "~store";
import {setPreferences, setSpaces, setUser} from "~notion/notion-slice";
import {sendToBackground} from "@plasmohq/messaging";

export const NotionStatus = () => {

    const [login, setLogin] = useState(false);

    // 读取 store 用户信息
    const userInfo = useAppSelector((state) => state.notion.user)
    // 存储
    const dispatch = useAppDispatch()

    // 监听 background 发送的消息
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        // 判断消息类型
        if (message.type === "notion_cookies_onChanged") {
            setLogin(true)
        }
    });

    const fetchSpacesAndHandleData = async () => {
        sendToBackground({
            name: "background-get-spaces",
            body: {
                searchTerm: "req"
            }
        }).then(response => {
            if (response) {
                const spacesResponse = Object.values(response.response)[0];

                const userInfo = Object.values(spacesResponse.notion_user)[0].value;
                const {id, name, email, profile_photo} = userInfo;
                const user: UserInfo = {id, name, email, profile_photo};
                dispatch(setUser(user));

                const spaceDataResponseList = Object.values(response.spaceDataResponse.results);

                const spaceInfo = Object.values(spacesResponse.space);
                const spaces: SpaceInfo[] = spaceInfo.map(({ value: { id, name, icon } }) => {
                    const spaceData = spaceDataResponseList.find(space => space.id === id);
                    return {
                        id,
                        name,
                        icon,
                        domain: spaceData?.domain || '',
                        publicDomainIds: spaceData?.publicDomainIds || []
                    };
                });
                dispatch(setSpaces(spaces));

                // 初始设置默认第一个
                const newPreferences = {
                    isLoggedIn: true,
                    currentSpace: spaces[0],
                    SearchWithFiltersEnabled: false,
                    SearchWithAtMyNotionEnabled: false
                };
                dispatch(setPreferences(newPreferences));

            } else {
                console.log("Empty spaces response");
            }
        }).catch(error => {
            console.error("发送消息失败:", error);
        });
    };

    useEffect(() => {
        if (!userInfo) {
            fetchSpacesAndHandleData();
        }
    }, [login]);

    return userInfo ? (
        <div className="flex items-center gap-3">
            <Avatar className="border border-gray-100 shadow h-8 w-8 flex">
                <AvatarImage src={userInfo.profile_photo} alt="Avatar"/>
                <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className=" ">
                <p className="text-sm font-medium">{userInfo.name}</p>
                <p className="-mt-1 text-xs text-muted-foreground">{userInfo.email}</p>
            </div>
        </div>) : (
        <div
            className="rounded-lg border border-orange-100 bg-orange-50 text-orange-800 p-2">
            <div className="flex">
                <span className="-mt-0.5 text-base" style={{fontFamily: "sans-serif"}}>⚠️</span>
                <div className="ml-2">
                    <p className="text-sm ">
                        {"You are not logged into Notion. Please"}
                        <strong>
                            <a href="https://www.notion.so" target="_blank"
                               className="underline hover:text-orange-600">
                                {" log in"}
                            </a>
                        </strong>
                        {"  to continue."}
                    </p>
                </div>
            </div>
        </div>)
}
