import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FC, PropsWithChildren } from "react"

type Props = PropsWithChildren<{
    title?: string

}>
export const ChartCard: FC<Props> = ({ title, children }) => {
    return (
        <Card className="mb-1">
            <CardHeader className="items-center">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}