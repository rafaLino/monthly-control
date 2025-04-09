import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FC, HTMLAttributes, PropsWithChildren, PropsWithoutRef } from "react"

type Props = PropsWithChildren<{
    title?: string
}> & PropsWithoutRef<HTMLAttributes<HTMLDivElement>>
export const ChartCard: FC<Props> = ({ title, children, ...props }) => {
    return (
        <Card className="mb-1" {...props}>
            <CardHeader className="items-center">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}