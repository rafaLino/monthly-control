import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { BadgeCheckIcon } from "lucide-react"
import { useRef } from "react"
import { MouseEvent } from "react"
import { FC } from "react"

type AlertProps = {
    onClick?: (value: string) => void;

}
export const Alert: FC<AlertProps> = ({ onClick }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const value = inputRef.current?.value;
        if (!value) return;

        e.preventDefault();
        onClick?.(value);
    }
    return (
        <div className="fixed bg-background flex w-full max-w-md flex-col gap-6 sm:my-1 sm:mx-[50%] z-40">
            <Item variant="outline">
                <ItemMedia>
                    <BadgeCheckIcon className="size-5" />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Give a name to this access point</ItemTitle>
                    <ItemDescription>
                        <Input ref={inputRef} name="access_name" placeholder="Access Point Name" />
                    </ItemDescription>
                </ItemContent>
                <ItemActions className="pt-5">
                    <Button variant="outline" size="sm" onClick={handleClick}>
                        Save
                    </Button>
                </ItemActions>
            </Item>
        </div>
    )
}