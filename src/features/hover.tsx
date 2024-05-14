import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {ReactNode} from "react";

interface ATMHoverProps {
    children: ReactNode;
    tooltipContent: string;
}


export function ATMHover({children, tooltipContent}: ATMHoverProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className="max-w-60 whitespace-normal">
                    <div>{tooltipContent}</div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
