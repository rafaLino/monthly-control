import { DotIndicator } from '@/components/dot-indicator/dot-indicator';
import { Button } from '@/components/ui/button';
import { Save as SaveIcon } from 'lucide-react';
import { ComponentPropsWithoutRef, FC, PropsWithChildren } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & { label: string };

const Root: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex justify-end gap-4 w-full">{children}</div>;
};

const Btn: FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <Button variant="outline" className="cursor-pointer" {...props}>
      {label}
    </Button>
  );
};

const Save: FC<ButtonProps & { active: boolean }> = ({ active, label, ...props }) => {
  return (
    <Button variant="default" className="relative gap-2 cursor-pointer" {...props}>
      {label}
      <SaveIcon className="size-4" />
      <DotIndicator active={active} animate />
    </Button>
  );
};

export const Actions = {
  Root,
  Btn,
  Save
};
