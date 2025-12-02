import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Group, MoreHorizontalIcon, X } from 'lucide-react';
import { FC } from 'react';
import { Translation } from 'react-i18next';

export type MenuDropdownClickEvent =
  | {
      action: 'merge-group';
      params: { target: string; source: string };
    }
  | {
      action: 'clear-snapshot';
    };

type MenuDropdownProps = {
  items: { id: string; name: string }[];
  columnId: string;
  onClick: (event: MenuDropdownClickEvent) => void;
};

export const MenuDropdown: FC<MenuDropdownProps> = ({ items, columnId, onClick }) => {
  return (
    <ButtonGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="More Options" className="bg-transparent border-none">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <Group />
                <Translation>{(t) => t('projectionDialog.group')}</Translation>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={'label'}
                  onValueChange={(target) => onClick({ action: 'merge-group', params: { source: columnId, target } })}
                >
                  {items
                    .filter((item) => item.id !== columnId)
                    .map((item) => (
                      <DropdownMenuRadioItem key={item.id} value={item.id}>
                        {item.name}
                      </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem className="gap-2" onClick={() => onClick({ action: 'clear-snapshot' })}>
              <X />
              Clear Snapshot
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
};
