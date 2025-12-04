import { SortDirection } from "@/types/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { FC } from "react";

export const SortingIcon: FC<{ direction: SortDirection | false }> = ({ direction }) => {
    if (!direction) return null;

    return direction === 'asc' ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />
}