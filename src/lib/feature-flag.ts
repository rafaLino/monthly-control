type Flags = Record<string, string>;

const KEY = 'flags';

function _getFlags() {
  const flagsAsString = localStorage.getItem(KEY);
  if (!flagsAsString) return null;
  return JSON.parse(flagsAsString) as Flags;
}

function _getFlag(key: string) {
  try {
    return _getFlags()![key];
  } catch {
    return null;
  }
}

export function checkFlag(key: string) {
  const flag = _getFlag(key);
  if (!flag) return false;

  return flag === 'ON';
}
