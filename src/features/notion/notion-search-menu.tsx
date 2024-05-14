import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableRow
} from "@/components/ui/table";
import {sendToBackground} from "@plasmohq/messaging";
import imageUrl from "data-url:/assets/icon.png";
import React, {useEffect, useState} from 'react';
import {Separator} from "~components/ui/separator";
import HighlightNotionText from "~features/notion/highlight-notion-text";
import NotionPageIcon from "~features/notion/notion-page-icon";
import {useAppSelector} from "~store";

export function NotionSearchMenu({searchInputValue}: { searchInputValue: string }) {

    // 读取 store 用户信息
    const userInfo = useAppSelector((state) => state.notion.user);
    const preferences = useAppSelector((state) => state.notion.preferences);

    // const searchInputValue = document.querySelector('input[name="q"]'); // 根据实际情况修改选择器

    const [searchResults, setSearchResults] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchSearchAndHandleData = async () => {
        setIsLoading(true);
        sendToBackground({
            name: "background-notion-search",
            body: {
                user: userInfo,
                userPreferences: preferences,
                query: searchInputValue
            },
        }).then((response) => {
            setSearchResults(response.response);
            setIsLoading(false);
        }).catch((error) => {
            console.error("search error:", error);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        if (userInfo && preferences) {
            fetchSearchAndHandleData();
        }
    }, [searchInputValue]);

    const handleRowClick = (item) => {
        const {spaceId, id, highlightBlockId} = item;
        const domain = preferences.currentSpace.domain;
        let url = `https://www.notion.so/${domain}/${id}`;

        if (item.highlight.text && item.highlight.text.includes('<gzkNfoUU>')) {
            url += `#${highlightBlockId}`;
        }
        // 去除-
        url = url.replace(/-/g, ''); // 去除域名中的连字符

        window.open(url, '_blank');
    };

    return (
        <div>
            <div className="flex items-center p-5 py-4 text-sm text-gray-500">
                <span className="italic whitespace-normal dark:text-white/[.44]">
                    <span className="mr-1">Searching for</span>
                    <span
                        className="mr-2 font-medium text-gray-500 dark:text-gray-300">"{searchInputValue}"</span>
                    <span
                        className="mr-1">in {preferences.currentSpace.name}</span>
                </span>
            </div>
            <Separator className="dark:bg-white/15"/>
            <Table>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell className="h-12 pl-5 text-center">
                                <span
                                    className="pt-2 loading loading-dots loading-xs"></span>
                            </TableCell>
                        </TableRow>
                    ) : searchResults?.length ? (
                        searchResults.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <TableRow key={item.id}
                                          className="flex border-0 hover:cursor-pointer dark:hover:bg-muted/10"
                                          onClick={() => handleRowClick(item)}
                                >
                                    <TableCell
                                        className="pt-2.5 pl-5 align-top">
                                        <NotionPageIcon pageIcon={item.pageIcon}
                                                        tableID={item.id}/>
                                    </TableCell>
                                    <TableCell className="flex-1 pl-0 pr-5">
                                        <div className="break-all">
                                            {item.title && (
                                                <div
                                                    className="text-sm font-medium text-[#a6adbb] dark:text-neutral-500">
                                                    <HighlightNotionText
                                                        text={item.title}/>
                                                </div>
                                            )}
                                            {item.highlight.pathText && (
                                                <div className="text-xs text-[#a6adbb] dark:text-white/[.28]">
                                                    <HighlightNotionText
                                                        text={item.highlight.pathText}/>
                                                </div>
                                            )}
                                            {item.highlight.text && (
                                                <div className="text-xs pt-1 text-[#a6adbb] dark:text-white/[.44]">
                                                    <HighlightNotionText
                                                        text={item.highlight.text}/>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                                {index !== searchResults.length - 1 && (
                                    <tr>
                                        <td colSpan="100%">
                                            <div
                                                className="mx-5 border-b dark:border-white/10"></div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))) : (
                        <TableRow>
                            <TableCell className="h-12 pl-5 text-center">No
                                results.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Separator className="dark:bg-white/15"/>

            <div className="p-2 bg-muted/50 dark:bg-white/5">
                <div
                    className="flex items-center justify-end py-1 pr-5 text-xs font-light text-right text-neutral-400">
                    <div className="italic">
                        Notion search powered by
                    </div>
                    <div
                        className="flex items-center text-sm font-normal text-neutral-500 dark:text-neutral-300">
                        <img src={imageUrl}
                             className="h-4 w-4 ml-2.5 mr-1"
                             alt="Icon"/>
                        AtMyNotion
                    </div>

                </div>
            </div>
        </div>
    );
}
