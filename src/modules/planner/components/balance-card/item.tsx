import { CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Translation } from "react-i18next";

type ItemProps = {
    testid: string;
    value: number;
    color: 'green' | 'red';
}

export const Item = ({ value, color, testid }: ItemProps) => {
    const colorClass = color === 'green' ? 'text-green-600 hover:text-green-600/80' : 'text-red-600 hover:text-red-600/80';
    return <Translation>
        {(t) => (
            <CardTitle className={cn("text-base", colorClass)} data-testid={testid}>
                {t('currency', { value })}
            </CardTitle>
        )}
    </Translation>
}