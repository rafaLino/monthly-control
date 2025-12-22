import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDataTableMenu } from '@/context/DataTableMenuContext';
import { MediaQueries, useMediaQuery } from '@/hooks/useMediaQuery';
import { cn, sumItems } from '@/lib/utils';
import { Register } from '@/types/register.types';
import { HeaderContext, RowModel } from '@tanstack/react-table';
import { Ellipsis, Trash } from 'lucide-react';
import { ComponentPropsWithoutRef, FC } from 'react';
import { Translation } from 'react-i18next';

export function MenuHeaderCell({ table }: Readonly<HeaderContext<Register, unknown>>) {
  'use no memo';
  const rowModel = table.getSelectedRowModel();
  const isDesktop = useMediaQuery(MediaQueries.sm);

  return (
    <div className="flex justify-center w-full min-w-4">
      {isDesktop ? (
        <Popover>
          <PopoverTrigger asChild>
            <MenuButton />
          </PopoverTrigger>
          <PopoverContent>
            <MenuHeaderContent model={rowModel} onClear={() => table.toggleAllRowsSelected(false)} />
          </PopoverContent>
        </Popover>
      ) : (
        <MenuMobile />
      )}
    </div>
  );
}

const MenuHeaderContent: FC<{
  model: RowModel<Register>;
  onClear: () => void;
}> = ({ model, onClear }) => {
  const total = sumItems(model.rows, (item) => item.original.value);
  return (
    <div className="grid gap-4">
      <div className="flex flex-row justify-between gap-3 items-center">
        <Translation>
          {(t) => (
            <>
              <h4 className="leading-none font-medium">{t('dataTable.sum')}:</h4>
              <p className={cn('text-sm', total >= 0 ? 'text-blue-400' : 'text-red-400')}>{t('currency', { value: total })}</p>
              <Button variant="ghost" size="icon" disabled={total === 0} onClick={onClear}>
                <Trash className="size-4" />
              </Button>
            </>
          )}
        </Translation>
      </div>
    </div>
  );
};

const MenuMobile = () => {
  const { onClick } = useDataTableMenu();
  return <MenuButton onClick={onClick} />;
};

const MenuButton = (props: ComponentPropsWithoutRef<'button'>) => {
  return (
    <Button {...props} variant="ghost" size="icon" className="w-full hover:bg-transparent">
      <Ellipsis className="size-4" />
    </Button>
  );
};
