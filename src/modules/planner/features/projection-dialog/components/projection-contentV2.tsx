import { KanbanBoard, KanbanCard, KanbanCards, KanbanHeader, KanbanProvider } from '@/components/ui/shadcn-io/kanban';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useBoardColumns } from '../hooks/useBoardColumns';
import { useBoardFeatures } from '../hooks/useBoardFeatures';
import { Feature } from '../utils/types';
import { HeaderContent } from './board/header-content';
import { MenuDropdown } from './board/menu-dropdown';
import { Result } from './board/result';

export const ProjectionContent = () => {
  const { t } = useTranslation('translation');

  const { columns, isNoGroupColumn, mergeGroups } = useBoardColumns();

  const { features, totals, setFeatures, moveFeatures } = useBoardFeatures();

  const menuItems = columns.filter((col) => !isNoGroupColumn(col.id));

  const handleMergeGroups = (target: string, source: string) => {
    moveFeatures(target, source);
    mergeGroups(target, source);
  };

  return (
    <KanbanProvider columns={columns} data={features} onDataChange={setFeatures}>
      {(column) => (
        <KanbanBoard id={column.id} key={column.id}>
          <KanbanHeader className={cn(isNoGroupColumn(column.id) && 'min-h-14 py-4')}>
            <HeaderContent
              isNotGrouped={isNoGroupColumn(column.id)}
              value={column.value}
              name={column.name}
              Menu={
                <MenuDropdown
                  show={!isNoGroupColumn(column.id)}
                  columnId={column.id}
                  items={menuItems}
                  onClick={handleMergeGroups}
                />
              }
              Result={<Result show={!isNoGroupColumn(column.id)} column={column} totals={totals} />}
            />
          </KanbanHeader>
          <KanbanCards id={column.id}>
            {(feature: Feature) => (
              <KanbanCard
                column={column.id}
                id={feature.id}
                key={feature.id}
                name={feature.name}
                className={cn(feature.color, 'opacity-80')}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-row items-center justify-between w-full gap-1">
                    <p className="m-1 flex-1 font-medium text-sm">{t('currency', { value: feature.value })}</p>
                    {feature.name}
                  </div>
                </div>
              </KanbanCard>
            )}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>
  );
};
