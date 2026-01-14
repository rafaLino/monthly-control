import { FC, MouseEvent } from "react";
import { Bill } from "../../types";
import { useBills } from "../../context/hooks/useBills";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EditableCell, EditableNumberCell } from "@/components/editable-cell";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Translation } from "react-i18next";
import { AddInput } from "@/components/add-input";

export const BillsTable: FC<{
    data: Bill[],
    onRemove?: (event: MouseEvent<HTMLButtonElement>) => void,
    onChange?: (id: string, field: keyof Bill, value: string | number) => void,
}> = ({ data, onChange, onRemove }) => {
    const { calculateBillPercentage } = useBills();
    return (
        <div className='grid grid-rows-[auto_1fr] h-full gap-2 overflow-hidden'>
            <AddInput id="add-bill" onAdd={console.log} />
            <Table parentClassName='h-190 overflow-auto' className='w-full'>
                <TableHeader className='sticky bg-secondary top-0'>
                    <TableRow >
                        <TableHead className='w-80'>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>%</TableHead>
                        <TableHead className='w-0'></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((bill) => (
                        <TableRow key={bill.id}>
                            <TableCell className='px-2'>
                                <EditableCell id={`name-${bill.id}`} value={bill.name} onBlur={(newValue) => onChange?.(bill.id, 'name', newValue)} />
                            </TableCell>
                            <TableCell>
                                <EditableNumberCell id={`amount-${bill.id}`} value={bill.amount} onBlur={(newValue) => onChange?.(bill.id, 'amount', newValue)} />
                            </TableCell>
                            <TableCell>
                                <PercentBadge value={calculateBillPercentage(bill)} />
                            </TableCell>
                            <TableCell className='group'>
                                <Button variant="link" size="icon" className='cursor-pointer sm:invisible group-hover:visible' data-id={bill.id} onClick={onRemove}>
                                    <XCircle className='size-4' />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}


const PercentBadge: FC<{ value: number }> = ({ value }) => {
    return (
        <Badge variant="secondary">
            <Translation>{(t) => t('percentage', { value })}</Translation>
        </Badge>
    )
}