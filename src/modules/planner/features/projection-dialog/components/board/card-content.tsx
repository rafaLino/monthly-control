import { FC } from 'react';
import { Translation } from 'react-i18next'

type CardContentProps = {
    name: string;
    value: number;
}
export const CardContent: FC<CardContentProps> = ({ name, value }) => {
    return (
        <div className="flex items-start justify-between gap-2">
            <div className="flex flex-row items-center justify-between w-full gap-1">
                <Translation>
                    {(t) => (
                        <p className="m-1 flex-1 font-medium text-sm">
                            {t('currency', { value })}
                        </p>
                    )}
                </Translation>
                <span>
                    {name}
                </span>
            </div>
        </div>
    )
}