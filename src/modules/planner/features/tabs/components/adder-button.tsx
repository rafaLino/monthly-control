import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calculator } from "lucide-react"
import { ComponentPropsWithoutRef, FC } from "react"

export const AdderButton: FC<ComponentPropsWithoutRef<"button">> = ({ onClick, className, ...props }) => {
    return (
        <Button
            {...props}
            variant="link"
            className={cn('p-0', className)}
            onClick={onClick}
        >
            <Calculator className="w-4 h-4" />
        </Button>
    )
}