import { saveRegisters } from '@/lib/fetchRegisters';
import { getAll } from '@/store/store';
import { useCallback, useEffect, useState } from 'react';

const THREE_SECONDS = 3_000;
const FIVE_MINUTES = 5 * 60 * 1000;
export function useSave() {
    const [saving, setSaving] = useState(false)

    const save = useCallback(async () => {
        setSaving(true);
        await saveRegisters(getAll());

        setTimeout(() => {
            setSaving(false);
        }, THREE_SECONDS);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            await save();
        }, FIVE_MINUTES);

        return () => clearInterval(intervalId);
    }, [save])

    return [saving, save] as const;
}