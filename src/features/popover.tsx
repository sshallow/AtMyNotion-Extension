import {Popover, PopoverTrigger} from "@radix-ui/react-popover";
import {PopoverContent} from "~components/ui/popover";
import type {ReactNode} from "react";

interface ATMHoverProps {
    children: ReactNode;
    tooltipContent: string;
}

export function ATMPopover({children, tooltipContent}: ATMHoverProps) {
    return (
        <Popover>
            <PopoverTrigger
                className="flex items-center text-muted-background hover:text-background"
            >
                {children}
            </PopoverTrigger>
            <PopoverContent
                side="top"
                sideOffset={20}
                className="py-3 px-4 border border-gray-200 bg-white space-y-3  shadow-xl max-w-64"
            >
                <p className="text-xs text-slate-600">
                    {tooltipContent}
                </p>
            </PopoverContent>
        </Popover>
    );
}

