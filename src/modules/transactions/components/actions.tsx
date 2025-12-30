import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CircleArrowDown, EllipsisVertical, Save as SaveIcon, Trash2Icon, XCircle } from 'lucide-react';
import { ComponentPropsWithoutRef, MouseEvent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export type TAction = 'save' | 'reset' | 'refetch' | 'remove';
const DEFAULT = ['save', 'reset', 'refetch', 'remove'] satisfies Array<TAction>;

const iconsMap: Record<TAction, ReactElement> = {
  save: <SaveIcon className="size-4" />,
  reset: <XCircle className="size-4" />,
  refetch: <CircleArrowDown className="size-4" />,
  remove: <Trash2Icon className="size-4" />
};

type ActionsProps = {
  actions?: Array<TAction>;
  disabled?: boolean;
  slots?: Partial<Record<TAction, ComponentPropsWithoutRef<typeof DropdownMenuItem>>>;
  onClick?: (action: TAction, event: MouseEvent<HTMLDivElement>) => void;
};
export function Actions({ actions = DEFAULT, disabled, slots, onClick }: Readonly<ActionsProps>) {
  const { t } = useTranslation('translation', { keyPrefix: 'transactions' });
  return (
    <div className="flex justify-end gap-4 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {actions.map((item) => (
              <DropdownMenuItem key={item} className="justify-between" onClick={(e) => onClick?.(item, e)} {...slots?.[item]}>
                {t(item)}
                {iconsMap[item]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
