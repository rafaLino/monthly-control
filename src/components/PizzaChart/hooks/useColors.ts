import randomColor from 'randomcolor';
import { useEffect, useRef } from 'react';


export function useColors(count: number) {
    const colorsRef = useRef(randomColor({ count, format: 'hsl' }));
    const countRef = useRef(count);

    useEffect(() => {
        if (colorsRef.current && countRef.current !== count) {
            colorsRef.current = colorsRef.current.concat(randomColor({ format: 'hsl' }));
        }
    }, [count]);

    return colorsRef.current;
}