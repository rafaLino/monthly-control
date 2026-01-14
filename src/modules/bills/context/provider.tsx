import { FC, ReactNode, useMemo } from "react";
import { Bill, User } from "../types";
import { computeBills } from "./compute";
import { BillsContext } from "./context";

export const BillsProvider: FC<{
    bills: Bill[];
    users: User[];
    children: ReactNode;
}> = ({ bills, users, children }) => {
    const computed = useMemo(() => computeBills(bills, users), [bills, users]);
    return <BillsContext.Provider value={computed}>{children}</BillsContext.Provider>;
};