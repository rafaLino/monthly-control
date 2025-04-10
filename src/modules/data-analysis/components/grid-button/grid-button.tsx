import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { useLocalParams } from '@/store';
import { LayoutGrid } from 'lucide-react';
import { gridOptionsArray } from '../../utils/grid-config';

import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const GridButton = () => {
  const [gridCol, setParams] = useLocalParams<number>('grid_col');

  const handleChangeValue = (value?: string) => {
    if (!value) return;
    setParams('grid_col', +value);
  };

  return (
    <div className="flex gap-0.5 flex-row justify-end px-12">
      <Menubar className="border-0 bg-stale-200 w-14">
        <MenubarMenu value={String(gridCol)}>
          <MenubarTrigger className="cursor-pointer" asChild>
            <Button variant="outline" className="rounded-md gap-1">
              Grid Layout
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </MenubarTrigger>
          <MenubarContent className="min-w-8 flex" side="right" hideWhenDetached>
            <ToggleGroup type="single" value={String(gridCol)} onValueChange={handleChangeValue}>
              {gridOptionsArray.map((col, index) => (
                <ToggleGroupItem key={col} size="sm" value={String(index)}>
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
