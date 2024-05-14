"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function ATMCheckbox({ id, label, onChange }) {
    const [checked, setChecked] = useState(false)

    const handleChange = (checked) => {
        setChecked(checked)
        if (onChange) {
            onChange(checked)
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <Checkbox id={id} checked={checked} onCheckedChange={handleChange} />
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
        </div>
    )
}
