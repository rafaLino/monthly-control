import { KanbanBoard, KanbanCard, KanbanCards, KanbanHeader, KanbanProvider } from '@/components/ui/shadcn-io/kanban';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useBoardColumns } from '../hooks/useBoardColumns';
import { useBoardFeatures } from '../hooks/useBoardFeatures';
import { boardSnapshot } from '../utils/board-snapshot';
import { Feature } from '../utils/types';
import { CardContent, HeaderContent, MenuDropdown, MenuDropdownClickEvent, Result } from './board';

export const ProjectionContent = () => {
  const [activeSnapshot, setActiveSnapshot] = useState(boardSnapshot.checkSnapshotInSession);

  const { columns, isNoGroupColumn, mergeColumns } = useBoardColumns();
  const { features, totals, setFeatures, moveFeatures } = useBoardFeatures();

  const menuItems = columns.filter((col) => !isNoGroupColumn(col.id));

  const mergeGroups = (target: string, source: string) => {
    moveFeatures(target, source);
    mergeColumns(target, source);
  };

  const clearSnapshot = () => {
    boardSnapshot.clearBoardSnapshot();
    setActiveSnapshot(false);
  };

  const handleMenuClick = (event: MenuDropdownClickEvent) => {
    if (event.action === 'merge-group') {
      const { target, source } = event.params;
      mergeGroups(target, source);
    }

    if (event.action === 'clear-snapshot') {
      clearSnapshot();
    }
  };

  const handleSaveSnapshot = () => {
    boardSnapshot.setBoardSnapshot({ columns, features });
    setActiveSnapshot(true);
  };

  return (
    <KanbanProvider columns={columns} data={features} onDataChange={setFeatures}>
      {(column) => (
        <KanbanBoard id={column.id} key={column.id}>
          <KanbanHeader className={cn(isNoGroupColumn(column.id) && 'min-h-14 py-4')}>
            <HeaderContent
              isNoGroupColumn={isNoGroupColumn(column.id)}
              bulletActive={activeSnapshot}
              value={column.value}
              name={column.name}
              onBulletClick={handleSaveSnapshot}
              Menu={<MenuDropdown columnId={column.id} items={menuItems} onClick={handleMenuClick} />}
              Result={<Result column={column} totals={totals} />}
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
                <CardContent name={feature.name} value={feature.value} />
              </KanbanCard>
            )}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>
  );
};
