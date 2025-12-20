import { useSet } from "@/hooks/useSet";
import { cn, sum } from "@/lib/utils";
import { useTab } from "@/modules/planner/hooks/useTab";
import { useReadRegisters } from "@/store";
import { Register } from "@/types/register.types";
import { FC, Fragment, MouseEvent } from "react";
import { Translation } from "react-i18next";

export const AdderContent: FC<{
  onClose: (e: MouseEvent<HTMLButtonElement>) => void
}> = ({
  onClose
}) => {
    const [tab] = useTab();
    const items = useReadRegisters(tab);
    const set = useSet<string>();

    const selectedItems = items.filter(item => set.has(item.id));
    const total = sum(selectedItems)

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.dataset.id!;
      set.toggle(id);
    }

    return (
      <section className="grid grid-rows-2 items-center gap-2 relative bg-muted">
        <div className="flex flex-col gap-1 items-center">
          <CloseButton onClick={onClose} />
          <Result value={total} />
          <Expression selecteds={selectedItems} />
        </div>
        <GridItems items={items} onClick={handleClick} isActive={set.has} />
      </section>
    );
  };

const CloseButton: FC<{ onClick: (event: MouseEvent<HTMLButtonElement>) => void }> = ({
  onClick
}) => {
  return (<button aria-label="close" onClick={onClick} className="absolute h-2.5 w-20 top-5 rounded-xl bg-neutral-400" />)
}

const Result: FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex justify-center items-center border outline shadow-xl rounded-md p-4 w-80 h-32 bg-sky-50">
      <Translation>
        {(t) => (
          <span className="font-serif font-light text-neutral-600 text-3xl inline-block text-ellipsis whitespace-nowrap overflow-hidden">
            {t('currency', { value })}
          </span>
        )}
      </Translation>
    </div>
  )
}

const Expression: FC<{
  selecteds: Register[],
}> = ({
  selecteds
}) => {
    return (
      <div className="flex flex-row flex-wrap items-center gap-x-2 px-6 font-serif min-h-5">
        {selecteds.map(({ id, value }, index, { length }) => (
          <Fragment key={id}>
            <Translation>
              {(t) => (
                <span key={id} className="text-xs font-medium text-muted-foreground">
                  {t('currency', { value })}
                  <i className={cn('ml-1', index === length - 1 && "hidden")}>+</i>
                </span>
              )}
            </Translation>
          </Fragment>
        ))}
      </div>
    )
  }


const GridItems: FC<{
  items: Register[],
  onClick: (event: MouseEvent<HTMLButtonElement>) => void,
  isActive: (value: string) => boolean
}> = ({
  items,
  isActive,
  onClick,
}) => {
    return (
      <div className="flex flex-row flex-wrap justify-center px-2 gap-2 overflow-auto max-h-64">
        {items.map(item => (
          <button
            key={item.id}
            data-id={item.id}
            onClick={onClick}
            className={
              cn("flex flex-col justify-evenly p-2 bg-current/10 rounded-md shadow-md cursor-pointer size-20",
                isActive(item.id) && 'bg-red-300'
              )}>
            <Translation>
              {(t) => (
                <span className="text-xs font-bold text-neutral-600">
                  {t('currency', { value: item.value })}
                </span>
              )}
            </Translation>
            <span
              title={item.name}
              className="text-xs font-light text-neutral-600/80 inline-block whitespace-pre-line text-ellipsis overflow-hidden">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    )
  }