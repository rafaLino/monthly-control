import { CurrencyItem } from '@/components/currency-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useSet } from '@/hooks/useSet';
import { sumItems } from '@/lib/utils';
import { Bill } from '@/modules/bills/types';
import { FC, Fragment } from 'react';
import { Tag } from './tag';

export const TagsContainer: FC<{
  tags: string[];
  bills: Bill[];
}> = ({ tags, bills }) => {
  const selecteds = useSet<string>();

  const selectedBills = bills.filter((bill) => bill.tags.some((tag) => selecteds.has(tag)));
  const total = sumItems(selectedBills, (item) => item.amount);

  return (
    <div className="p-2">
      <div className="flex flex-row gap-2 flex-wrap">
        {tags.map((tag) => (
          <Tag
            key={tag}
            name={tag}
            selected={selecteds.has(tag)}
            onClick={(e) => selecteds.toggle(e.currentTarget.dataset.id as string)}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <h4 className="my-2 text-sm leading-none font-medium text-zinc-600">
          Total:
          <CurrencyItem value={total} color={{ true: 'text-blue-400' }} />
        </h4>
        <ScrollArea className="h-full max-h-90 w-full rounded-md">
          <div className="p-4">
            {selectedBills.map((bill) => (
              <Fragment key={bill.id}>
                <div className="text-sm">{bill.title}</div>
                <Separator className="my-2" />
              </Fragment>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
