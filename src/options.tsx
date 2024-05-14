import "~style.css"

import { useState } from "react"
import {
    CircleUser,
    Menu,
    Package2,
    Search,
    CircleHelp
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import {ThemeProvider} from "~components/theme-provider";
import {NotionStatus} from "~features/notion/notion-status";
import {Separator} from "~components/ui/separator";
import {ATMSpaceSwitcher} from "~features/space-switcher";
import {persistor, store} from "~store";
import {Provider} from "react-redux"
import {PersistGate} from "@plasmohq/redux-persist/integration/react"
import {Label} from "~components/ui/label";

function OptionsIndex() {
  const [data, setData] = useState("")
    const handleCheckboxChange = (checked) => {
        console.log("Checkbox checked:", checked)
        // 在这里做其他操作
    }
    const handleSwitchChange = (checked) => {
        console.log("Switch checked:", checked);
        // 在这里执行其他操作
    };
  return (
    <div>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        > <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                        <div className="mx-auto grid w-full max-w-6xl gap-2">
                            <div className="py-4">
                                <h3 className="text-3xl text-gray-800 font-semibold md:text-4xl">
                                   About
                                </h3>
                                <p className="text-lg text-gray-600 mt-3">
                                    The plugin retrieves and displays content from your Notion workspace next to search engine results as you search.
                                </p>
                            </div>
                            {/*<a*/}
                            {/*    className="group px-4 py-2 text-indigo-600 font-medium bg-indigo-50 rounded-full inline-flex items-center w-40"*/}
                            {/*    href="javascript:void()">*/}
                            {/*    Try it out*/}
                            {/*    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1 duration-150 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />*/}
                            {/*    </svg>*/}
                            {/*</a>*/}
                        </div>
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold">Settings</h1>
                    </div>
                    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav
                            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                        >
                            <a href="#" className="font-semibold text-primary">
                                General
                            </a>
                            {/*<a href="#" className="cursor-not-allowed ">Security</a>*/}
                            {/*<a href="#" className="cursor-not-allowed ">Integrations</a>*/}
                            {/*<a href="#" className="cursor-not-allowed ">Organizations</a>*/}
                            <a href="#" className="cursor-not-allowed ">Advanced</a>
                            <a href="#" className="cursor-not-allowed ">Support</a>
                        </nav>
                        <div className="grid gap-6">
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle className="text-xl">User</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <NotionStatus/>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-04-chunk-2">
                                <CardHeader>
                                    <CardTitle className="text-xl">Workspace</CardTitle>
                                    <CardDescription>
                                        The plugin will query relevant content within the selected workspace.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="w-80">
                                    <ATMSpaceSwitcher/>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </PersistGate>
        </Provider>
        </ThemeProvider>
    </div>
  )
}

export default OptionsIndex
