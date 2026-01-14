import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useActionState } from "react";

export const AddUserDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant="outline" size="icon" className='rounded-full cursor-pointer'>
                    <UserPlus className='size-4' />
                </Button>
            </DialogTrigger>
            <UserDialogContentForm />
        </Dialog>
    )
}

const add = async (state: string | null, formData: FormData) => {
    console.log('Submitting form with data:', formData.get('name'));
    console.log('Current state:', state);
    await new Promise(resolve => {
        setTimeout(resolve, 2000);
    });

    return 'it works!'
}

const UserDialogContentForm = () => {
    const [state, formAction, isPending] = useActionState(add, null);
    return (
        <DialogContent className="sm:max-w-[425px]">
            <form action={formAction} >
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                    <DialogDescription>
                        Make changes to your user here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" name="amount" type='number' />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="tags">Tags</Label>
                        <Input id="tags" name="tags" />
                    </div>
                </div>
                <DialogFooter className='mt-4 items-center'>
                    {isPending ? 'Saving...' : state}
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}