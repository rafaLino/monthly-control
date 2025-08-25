import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { FC, HTMLAttributes, PropsWithChildren, PropsWithoutRef, ReactNode } from 'react';

type Props = PropsWithChildren<{
  title?: string;
  header?: ReactNode;
}> &
  PropsWithoutRef<HTMLAttributes<HTMLDivElement>>;
export const ChartCard: FC<Props> = ({ title, children, header, ...props }) => {
  return (
    <Card className="mb-1 h-full" {...props}>
      <CardHeader className="grid grid-cols-[20px_1fr] sm:grid-cols-3 items-center p-0 pb-2">
        <Button variant="ghost" size="icon" data-swapy-handle className="text-gray-500 hover:bg-transparent">
          <GripVertical className="h-4 w-4" />
        </Button>

        <CardTitle className="text-center">{title}</CardTitle>
        <div className="col-span-2 sm:col-span-1">{header}</div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
