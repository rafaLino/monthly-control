import { KanbanBoard, KanbanCard, KanbanCards, KanbanHeader, KanbanProvider } from '@/components/ui/shadcn-io/kanban';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useBoardColumns } from '../hooks/useBoardColumns';
import { useBoardFeatures } from '../hooks/useBoardFeatures';
import { checkSnapshotInSession, clearBoardSnapshot, setBoardSnapshot } from '../utils/board-snapshot';
import { Feature } from '../utils/types';
import { CardContent, HeaderContent, MenuDropdown, MenuDropdownClickEvent, Result } from './board';



export const ProjectionContent = () => {
  const [activeSnapshot, setActiveSnapshot] = useState(checkSnapshotInSession);

  const { columns, isNoGroupColumn, mergeGroups } = useBoardColumns();
  const { features, totals, setFeatures, moveFeatures } = useBoardFeatures();

  const menuItems = columns.filter((col) => !isNoGroupColumn(col.id));

  const mergeColumns = (target: string, source: string) => {
    moveFeatures(target, source);
    mergeGroups(target, source);
  };

  const clearSnapshot = () => {
    clearBoardSnapshot();
    setActiveSnapshot(false);
  }

  const handleMenuClick = (event: MenuDropdownClickEvent) => {
    if (event.action === 'merge-group') {
      const { target, source } = event.params;
      mergeColumns(target, source);
    }

    if (event.action === 'clear-snapshot') {
      clearSnapshot();
    }
  }

  const handleSaveSnapshot = () => {
    setBoardSnapshot({ columns, features });
    setActiveSnapshot(true);
  }

  return (
    <KanbanProvider columns={columns} data={features} onDataChange={setFeatures}>
      {(column) => (
        <KanbanBoard id={column.id} key={column.id}>
          <KanbanHeader className={cn(isNoGroupColumn(column.id) && 'min-h-14 py-4')}>
            <HeaderContent
              isNotGrouped={isNoGroupColumn(column.id)}
              activeSnapshot={activeSnapshot}
              value={column.value}
              name={column.name}
              onBulletClick={handleSaveSnapshot}
              Menu={
                <MenuDropdown
                  show={!isNoGroupColumn(column.id)}
                  columnId={column.id}
                  items={menuItems}
                  onClick={handleMenuClick}
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
                <CardContent name={feature.name} value={feature.value} />
              </KanbanCard>
            )}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>
  );
};
