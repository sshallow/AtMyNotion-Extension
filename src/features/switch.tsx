import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function ATMSwitch({ id, label, onChange, children }) {
    const handleChange = (checked) => {
        if (onChange) {
            onChange(checked);
        }
    };

    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Label className="text-sm font-normal text-primary  " htmlFor={id}>{label}</Label>
                {children}
            </div>
            <Switch className="bg-blue-500" id={id} onCheckedChange={handleChange} />
        </div>
    );
}
