import { BillsModule } from '@/modules/bills';
import { BillsModuleSkeleton } from '@/modules/bills/skeleton';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_main/bills')({
  component: BillsModule,
  pendingComponent: BillsModuleSkeleton
});
