import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"

import {useAppDispatch, useAppSelector} from "~store"
import {useState} from "react";
import {setPreferences} from "~notion/notion-slice";

export function ATMSpaceSwitcher() {
    // 读取 store
    const spacesList = useAppSelector((state) => state.notion.spaces)
    const preferences = useAppSelector((state) => state.notion.preferences)
    // 分发
    const dispatch = useAppDispatch()

    // 当前选择的工作区id

    // 更新当前选择
    const handleSelectOnChange = (selectValue: any) => {
        const space = spacesList.find((s) => s.id === selectValue)

        if (preferences) {
            console.log("存在 preferences", preferences, space);
            // 创建一个新的 preferences 对象，而不是直接修改现有的
            const newPreferences = {
                ...preferences,
                currentSpace: space
            };
            dispatch(setPreferences(newPreferences));
        } else {
            console.log("不存在 preferences", preferences, space);
            const newPreferences = {
                isLoggedIn: true,
                currentSpace: space,
                SearchWithFiltersEnabled: false,
                SearchWithAtMyNotionEnabled: false
            };
            dispatch(setPreferences(newPreferences));
        }
    }

    return (
        <Select onValueChange={handleSelectOnChange} value={preferences?.currentSpace?.id}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select notion workspace"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {spacesList.map((space) => (
                        <SelectItem
                            key={space.id}
                            value={space.id}
                            imgSrc={space.icon}>
                            {space.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
