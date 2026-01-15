import { FC, MouseEvent, useState } from 'react';
import { Bill } from '../../types';
import { PinButton } from './components/pin-button';
import { TagsContainer } from './components/tags-container';

export const BillsTags: FC<{
  data: Bill[];
}> = ({ data }) => {
  const tags = Array.from(new Set(data.flatMap((bill) => bill.tags)));
  const [pins, setPins] = useState<number[]>([1]);

  const handleTogglePin = (e: MouseEvent<HTMLButtonElement>) => {
    const isPinned = e.currentTarget.dataset.selected === 'true';
    const pin = Number(e.currentTarget.dataset.value);
    setPins((prev) => (isPinned && prev.length > 1 ? prev.filter((p) => p !== pin) : [...prev, pin + 1]));
  };

  return (
    <div className="grid gap-2 w-full overflow-auto max-h-130">
      <div className="grid grid-cols-3 gap-2 h-full">
        {pins.map((pin, index, { length }) => (
          <div key={pin} className="border rounded-md">
            <PinButton value={pin} selected={length > 1 && index !== length - 1} onClick={handleTogglePin} />
            <TagsContainer tags={tags} bills={data} />
          </div>
        ))}
      </div>
    </div>
  );
};
