import { Column, Feature } from './types';

type BoardSnapshot = {
  columns: Column[];
  features: Feature[];
};
function getBoardSnapshot(): BoardSnapshot | null {
  const snapshot = localStorage.getItem('board-snapshot');
  return snapshot ? JSON.parse(snapshot) : null;
}

function setBoardSnapshot(data: BoardSnapshot) {
  const snapshot = JSON.stringify(data);
  localStorage.setItem('board-snapshot', snapshot);
}

function clearBoardSnapshot() {
  localStorage.removeItem('board-snapshot');
}

function checkSnapshotInSession() {
  return localStorage.getItem('board-snapshot') !== null;
}

export const boardSnapshot = { getBoardSnapshot, setBoardSnapshot, clearBoardSnapshot, checkSnapshotInSession };
