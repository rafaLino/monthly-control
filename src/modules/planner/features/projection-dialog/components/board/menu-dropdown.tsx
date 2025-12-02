import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Group, MoreHorizontalIcon } from 'lucide-react';
import { FC } from 'react';
import { Translation } from 'react-i18next';

type MenuDropdownProps = {
  show: boolean;
  items: { id: string; name: string }[];
  columnId: string;
  onClick: (columnId: string, groupId: string) => void;
};

export const MenuDropdown: FC<MenuDropdownProps> = ({ show, items, columnId, onClick }) => {
  return show ? (
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
              <DropdownMenuSubTrigger className='gap-2'>
                <Group />
                <Translation>{(t) => t('projectionDialog.group')}</Translation>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={'label'} onValueChange={(target) => onClick(target, columnId)}>
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
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  ) : null;
};
