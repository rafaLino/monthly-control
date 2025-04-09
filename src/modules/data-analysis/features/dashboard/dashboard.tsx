import { FC, useEffect, useState, useTransition } from "react";
import { Metadata } from "../../types/metadata";
import { generateMetadata } from "../../utils/generate-metadata";
import { DashboardBarCharts } from "./components/dashboard-bar-charts";
import { DashboardSkeleton } from "./components/dashboard-skeleton";

type Props = {
    data: string
}

export const Dashboard: FC<Props> = ({ data }) => {
    const [metadata, setMetadata] = useState<Metadata[]>([])
    const [isPending, startTransition] = useTransition()

    const transformDataAction = async () => {
        setMetadata(generateMetadata(data));
    }

    useEffect(() => {
        const run = () => {
            startTransition(() => {
                transformDataAction();
            })
        }
        run();
    }, [])

    if (isPending) {
        return <DashboardSkeleton />
    }

    return <div className="grid grid-cols-2 w-full gap-2">
        {metadata.map(item => (
            <DashboardBarCharts key={item.type} {...item} />
        ))}
    </div>

}