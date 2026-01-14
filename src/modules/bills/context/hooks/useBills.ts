import { useContext } from "react";
import { BillsContext } from "../context";

export function useBills() {
    return useContext(BillsContext);
}