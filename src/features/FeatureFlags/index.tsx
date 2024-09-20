import { Input } from '@/components/ui/input';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { replaceSpacesWithUnderscores, transformObjectIntoArray } from '@/lib/utils';
import { KeyboardEvent, MouseEvent, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FlagItem } from './flag-item';

export const FeatureFlags = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'flags' });
  const [flags, setFlags] = useLocalStorage<Record<string, string>>('flags', {});
  const inputRef = useRef<HTMLInputElement>(null);
  const flagAsList = useMemo(() => transformObjectIntoArray(flags), [flags]);

  const handleFlagChange = (value: 'ON' | 'OFF', key: string) => {
    setFlags((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFlagRemove = (event: MouseEvent<HTMLButtonElement>) => {
    setFlags((prev) => {
      const newFlags = { ...prev };
      delete newFlags[event.currentTarget.dataset.key!];
      return newFlags;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = inputRef.current?.value;
      if (value) {
        handleFlagChange('OFF', replaceSpacesWithUnderscores(value));
        inputRef.current.value = '';
      }
    }
  };

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4 h-full">
      <legend className="-ml-1 px-1 text-sm font-medium">{t('title')}</legend>

      {flagAsList.map((item) => (
        <FlagItem key={item.key} item={item} onChange={handleFlagChange} onRemove={handleFlagRemove} />
      ))}
      <div className="grid gap-3">
        <Input ref={inputRef} placeholder={t('addNewFlag')} onKeyDown={handleKeyDown} />
      </div>
    </fieldset>
  );
};
