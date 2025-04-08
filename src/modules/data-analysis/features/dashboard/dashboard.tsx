import { LoaderIcon } from "lucide-react";
import { FC, useEffect, useState, useTransition } from "react";
import { Metadata } from "../../types/metadata";
import { generateMetadata } from "../../utils/generate-metadata";
import { DashboardBarCharts } from "./components/dashboard-bar-charts";

type Props = {
    data: string
}

export const Dashboard: FC<Props> = ({ data }) => {
    const [metadata, setMetadata] = useState<Metadata[]>([])
    const [isPending, startTransition] = useTransition()

    const transformDataAction = async () => {
        const groupPerMonthMetadata = await generateMetadata(data)
        setMetadata(groupPerMonthMetadata);
    }

    useEffect(() => {
        const init = async () => {
            startTransition(() => {
                transformDataAction();
            })
        }
        init();
    }, [])

    return <div className="flex w-full justify-center">
        {isPending && (<LoaderIcon className="animate-spin" />)}

        {metadata.map(item => (
            <DashboardBarCharts key={item.type} {...item} />
        ))}
    </div>

}