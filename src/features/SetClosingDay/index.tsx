import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const SetClosingDay = () => {
  return (
    <Card x-chunk="dashboard-04-chunk-2">
      <CardHeader>
        <CardTitle>Closing day</CardTitle>
        <CardDescription>Set here the closing day</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input placeholder="Closing day" defaultValue="25" disabled />
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button disabled>Save</Button>
      </CardFooter>
    </Card>
  );
};
