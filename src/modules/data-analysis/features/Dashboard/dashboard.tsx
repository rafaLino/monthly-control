import { LoaderIcon } from "lucide-react";
import { FC, useEffect, useState } from "react"
import { transformData } from "../../utils/transform-data";
import { Summary } from "../../types/summary";

type Props = {
    data: string
}
export const Dashboard: FC<Props> = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<Summary>()

    useEffect(() => {
        const init = async () => {
            const summary = await transformData(data)
            setLoading(false);
            setSummary(summary);
        }
        init();
    }, [])

    return <div>
        {loading && (<LoaderIcon className="animate-spin" />)}

        {summary && JSON.stringify(summary, null, 2)}
    </div>

}