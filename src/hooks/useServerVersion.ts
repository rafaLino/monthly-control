import { versionService } from "@/services/version.service";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";

export function useServerVersion() {
    const [version, setVersion] = useState<number | undefined>(() => {
        const val = Cookies.get('version');
        return val ? Number(val) : undefined;
    });

    const set = useCallback((value: number | ((prev: number) => number)) => {
        const nextState = typeof value === 'function' ? value(version!) : value;
        setVersion(nextState);
        Cookies.set('version', String(nextState), { expires: 1 })
    }, [])

    useEffect(() => {
        async function get() {
            if (!Cookies.get('version')) {
                const version = await versionService.get();
                set(version);
            }
        }
        get();
    }, [])


    return [version, set] as const;
}