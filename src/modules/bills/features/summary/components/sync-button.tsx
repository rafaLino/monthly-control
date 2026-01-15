import { isFalsy } from "@/lib/utils";
import { QueryKeys } from "@/types/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { DownloadCloudIcon, LoaderCircle, UploadCloudIcon } from "lucide-react";
import { FC } from "react";

export const SyncButton: FC<{
    value: number;
    isPending?: boolean;
    onClick: (action: 'download' | 'upload') => void;
}> = ({ value, isPending, onClick }) => {
    const queryClient = useQueryClient();
    const cachedValue = queryClient.getQueryData<number>([QueryKeys.emergencyFund]);
    const action = checkValue(cachedValue, value);

    const handler = () => {
        if (action !== 'equal') {
            onClick(action);
        }
    };
    return (
        <button className="text-indigo-500" onClick={handler} disabled={isPending}>
            {renderIcon(action, isPending)}
        </button>
    );
};

const renderIcon = (comparison: 'equal' | 'download' | 'upload', isPending?: boolean) => {
    if (isPending) return <LoaderCircle className="size-4 text-amber-500 animate-spin" />
    switch (comparison) {
        case 'equal':
            return null;
        case 'upload':
            return <UploadCloudIcon className="size-4" />;
        case 'download':
            return <DownloadCloudIcon className="size-4" />;
    }
};

const checkValue = (cached: number | undefined, value: number) => {
    if (isFalsy(cached) || cached === value) return 'equal';

    if (value === 0) return 'download';

    return 'upload';
};