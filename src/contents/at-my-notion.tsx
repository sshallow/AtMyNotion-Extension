import { PersistGate } from "@plasmohq/redux-persist/es/integration/react";
import cssText from "data-text:~style.css";
import type {
    PlasmoCSConfig,
    PlasmoCSUIJSXContainer,
    PlasmoCSUIProps,
    PlasmoRender
} from "plasmo";
import type { FC } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "~components/theme-provider";
import { persistor, store } from "~store";

export const config: PlasmoCSConfig = {
    matches: ["*://*.bing.com/*"]
}

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText.replaceAll(':root', ':host(plasmo-csui)');
    return style
}

export const getRootContainer = () =>
    new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            const rootContainerParent = document.querySelector(`#b_context`)
            if (rootContainerParent) {
                clearInterval(checkInterval)
                const rootContainer = document.createElement("div")
                rootContainerParent.appendChild(rootContainer)
                resolve(rootContainer)
            }
        }, 137)
    })

const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {

    const handleSwitchChange = (checked) => {
        console.log("Switch checked:", checked)
        // 在这里执行其他操作
    }
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {/*<div className="w-full pb-8">*/}
                    {/*<span className="text-3xl text-red-700">*/}
                    {/*AtMyNotion*/}

                    {/*</span>*/}
                    {/*    /!*<NotionStatus/>*!/*/}

                    {/*    /!*<ATMSpaceSwitcher/>*!/*/}
                    {/*    <ATMSwitch*/}
                    {/*        id="Advanced-search-mode"*/}
                    {/*        label="Search with Filters"*/}
                    {/*        onChange={handleSwitchChange}>*/}
                    {/*        <ATMPopover*/}
                    {/*            tooltipContent={*/}
                    {/*                "Apply advanced filters and sorting on the search page."*/}
                    {/*            }>*/}
                    {/*            <CircleHelp className="w-4 h-4 text-slate-400"/>*/}
                    {/*        </ATMPopover>*/}
                    {/*    </ATMSwitch>*/}
                    {/*</div>*/}
                </PersistGate>
            </Provider>
        </ThemeProvider>

    )
}

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
    createRootContainer
}) => {
    const rootContainer = await createRootContainer()
    const root = createRoot(rootContainer)
    root.render(<PlasmoOverlay />)
}

export default PlasmoOverlay
