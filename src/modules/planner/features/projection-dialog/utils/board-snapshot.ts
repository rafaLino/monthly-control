import { Column, Feature } from './types';

type BoardSnapshot = {
  columns: Column[];
  features: Feature[];
};
function getBoardSnapshot(): BoardSnapshot | null {
  const snapshot = sessionStorage.getItem('board-snapshot');
  return snapshot ? JSON.parse(snapshot) : null;
}

function setBoardSnapshot(data: BoardSnapshot) {
  const snapshot = JSON.stringify(data);
  sessionStorage.setItem('board-snapshot', snapshot);
}

function clearBoardSnapshot() {
  sessionStorage.removeItem('board-snapshot');
}

function checkSnapshotInSession() {
  return sessionStorage.getItem('board-snapshot') !== null;
}

export const boardSnapshot = { getBoardSnapshot, setBoardSnapshot, clearBoardSnapshot, checkSnapshotInSession };
