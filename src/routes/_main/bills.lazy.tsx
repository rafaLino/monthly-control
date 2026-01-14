import { BillsModule } from '@/modules/bills';
import { createLazyFileRoute } from '@tanstack/react-router';
export const Route = createLazyFileRoute('/_main/bills')({
  component: BillsModule,
})
