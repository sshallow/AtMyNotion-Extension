import {PersistGate} from "@plasmohq/redux-persist/integration/react";
import cssText from "data-text:~style.css";
import type {PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo";
import {Provider} from "react-redux";
import {ThemeProvider} from "~components/theme-provider";
import {NotionSearchMenu} from "~features/notion/notion-search-menu";
import {persistor, store} from "~store";


export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText.replaceAll(':root', ':host');
    return style
}
export const config: PlasmoCSConfig = {
    matches: ["*://*.google.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
    element: document.querySelector("#rhs"), insertPosition: "afterbegin"
})

const PlasmoCSUI = () => {
    const handleSwitchChange = (checked) => {
        console.log("Switch checked:", checked)
        // 在这里执行其他操作
    }
    let searchInputValue = document.querySelector('input[name="q"]'); // 根据实际情况修改选择器
    if (!searchInputValue) {
        searchInputValue = document.querySelector('textarea[name="q"]'); // 根据实际情况修改选择器
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <div className="flex-1 w-full mb-8 -ml-5 -mr-5 border dark:border-white/10 rounded-md">
                        <div className="w-full">
                            <NotionSearchMenu
                                searchInputValue={searchInputValue.value}/>
                        </div>
                    </div>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    )
}

export default PlasmoCSUI
