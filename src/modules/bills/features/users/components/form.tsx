import { Button } from "@/components/ui/button";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Status } from "@/modules/bills/types";
import { CheckCircle, CircleX, LoaderCircle } from "lucide-react";
import { FC, useActionState } from "react";

export const UserForm: FC<{
    action: (status: Status, formData: FormData) => Promise<Status>;
}> = ({ action }) => {
    const [status, formAction, isPending] = useActionState<Status, FormData>(action, 'idle');
    return (
        <form action={formAction}>
            <DialogHeader>
                <DialogTitle>Create User</DialogTitle>
                <DialogDescription>Make changes to your user here. Click save when you&apos;re done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" name="amount" type="number" />
                </div>
            </div>
            <DialogFooter className="flex flex-row mt-4 items-center sm:justify-between">
                <StatusMark pending={isPending} status={status} />
                <div className="flex sm:gap-x-2 items-center">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </div>
            </DialogFooter>
        </form>
    );
};

const StatusMark: FC<{ pending: boolean; status: Status }> = ({ pending, status }) => {
    if (pending) {
        return <LoaderCircle className="text-amber-500 animate-spin" />;
    }
    switch (status) {
        case 'success':
            return <CheckCircle className="size-5 text-green-500 animate-in" />;
        case 'error':
            return <CircleX className="size-5 text-red-500 animate-in" />;
        default:
            return null;
    }
}