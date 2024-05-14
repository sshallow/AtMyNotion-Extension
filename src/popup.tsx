import "~style.css"

import {CircleHelp} from "lucide-react"

import {ThemeProvider} from "~components/theme-provider"
import {Separator} from "~components/ui/separator"
import {ATMPopover} from "~features/popover"
import {ATMSpaceSwitcher} from "~features/space-switcher"
import {ATMSwitch} from "~features/switch"
import {useStorage} from "@plasmohq/storage/hook"
import {persistor, store} from '~store';
import {Provider} from "react-redux"
import {PersistGate} from "@plasmohq/redux-persist/integration/react"
import {NotionStatus} from "~features/notion/notion-status";
import {ChevronRightIcon, GearIcon} from "@radix-ui/react-icons";

function IndexPopup() {

    const [checked, setChecked] = useStorage("checked", false)

    const handleSwitchChange = (checked) => {
        console.log("Switch checked:", checked)
        setChecked(checked)
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <div
                        className="px-5 py-4 flex flex-col items-start min-h-96 w-[300px] bg-muted/40 gap-y-1.5">
                        <NotionStatus/>
                        <Separator className="mt-2 mb-1.5"/>
                        {/*<div className="text-slate-500 text-sm font-bold">*/}
                        {/*    Associated workspace*/}
                        {/*</div>*/}
                        <ATMSpaceSwitcher/>
                        <div className="text-slate-400">
                            The plugin will query relevant content within the
                            selected workspace.
                        </div>
                        <div
                            className="mt-7 mb-1 text-slate-500 text-sm font-bold">
                            Advanced options
                        </div>
                        <ATMSwitch
                            id="Advanced-search-mode"
                            label="Search With Filters"
                            onChange={handleSwitchChange}>
                            <ATMPopover
                                tooltipContent={
                                    "Apply advanced filters and sorting on the search page."
                                }>
                                <CircleHelp className="h-4 w-4 text-slate-400"/>
                            </ATMPopover>
                        </ATMSwitch>
                        <ATMSwitch
                            id="Search-@AtMyNotion-mode"
                            label="Search With @AtMyNotion"
                            onChange={handleSwitchChange}>
                            <ATMPopover
                                tooltipContent={
                                    // "Search for posts on Weibo and Jike from the database saved by @AtMyNotion."
                                    "Search for Weibo and Jike posts from the database saved by @AtMyNotion."
                                }>
                                <CircleHelp className="h-4 w-4 text-slate-400"/>
                            </ATMPopover>
                        </ATMSwitch>

                        <div
                            className="w-full mt-auto py-1 flex items-center justify-between">
                            <button className="text-gray-400 hover:text-gray-900 " onClick={() => {
                                chrome.tabs.create({
                                    url: "/options.html"
                                })
                            }}>
                                <GearIcon className="h-5 w-5"/>
                            </button>

                            <div className="flex mt-4 justify-center mt-0 space-x-5 rtl:space-x-reverse">
                                <a href="https://twitter.com/doit_2017" target="_blank"
                                   className="text-gray-400 hover:text-gray-900 ">
                                    <svg className="w-5 h-5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg"
                                         fill="currentColor"
                                         viewBox="0 0 20 17">
                                        <path fillRule="evenodd"
                                              d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </a>
                                <a href="https://github.com/sshallow/AtMyNotion-Extension" target="_blank"
                                   className="text-gray-400 hover:text-gray-900 ">
                                    <svg className="w-5 h-5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg"
                                         fill="currentColor"
                                         viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                                              clipRule="evenodd"/>
                                    </svg>

                                </a>
                            </div>
                        </div>
                    </div>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    )
}

export default IndexPopup
