import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { useLocalParams } from '@/store';
import { LayoutGrid } from 'lucide-react';
import { gridOptionsArray } from '../../utils/grid-config';

import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { FC } from 'react';

type Props = {
  title?: string;
};
export const GridButton: FC<Props> = ({ title }) => {
  const [gridCol, setParams] = useLocalParams<number>('grid_col');

  const handleChangeValue = (value?: string) => {
    if (!value) return;
    setParams('grid_col', +value);
  };

  return (
    <div className="flex sm:gap-0.5 flex-row justify-end sm:px-12">
      <Menubar className="border-0 bg-stale-200 sm:w-14">
        <MenubarMenu value={String(gridCol)}>
          <MenubarTrigger className="cursor-pointer" asChild>
            <Button variant="ghost" className="rounded-md gap-1 px-0 sm:px-3">
              <span className="hidden sm:block">{title}</span>
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </MenubarTrigger>
          <MenubarContent className="min-w-8 flex" side="right" hideWhenDetached>
            <ToggleGroup type="single" value={String(gridCol)} onValueChange={handleChangeValue}>
              {gridOptionsArray.map((col, index) => (
                <ToggleGroupItem key={col} size="sm" value={String(index + 1)}>
                  {index + 1}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
