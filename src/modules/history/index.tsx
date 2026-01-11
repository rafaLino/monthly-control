import { CurrencyItem } from '@/components/currency-item';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getTotal } from '@/lib/business-logic';
import { sum } from '@/lib/utils';
import { apiService } from '@/services/api.service';
import { QueryKeys } from '@/types/queryKeys';
import { RefDateSchema } from '@/types/refDate';
import { Register } from '@/types/register.types';
import { Query, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { CheckCircle2, XCircle } from 'lucide-react';
import {
  ComponentPropsWithoutRef,
  FC,
  Fragment,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useDeferredValue,
  useRef,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';

const Route = getRouteApi('/_main/history');

export function History() {
  const navigate = Route.useNavigate();

  const { ref } = Route.useSearch();
  const refValue = useDeferredValue(ref);

  const handleSelectRef = (value: string) => {
    navigate({ search: { ref: value } });
  };

  const { data } = useQuery({
    queryKey: [QueryKeys.history, refValue],
    queryFn: () => apiService.getByRef(refValue ?? ''),
    enabled: !!refValue
  });

  return (
    <main className="grid p-4 gap-4 text-muted-foreground">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <RefDateInput value={ref} onEnter={handleSelectRef} />
        <PreviousRefList
          renderItem={(cache) => (
            <PreviousRefItem value={cache.queryKey.at(1)} onClick={(e) => handleSelectRef(e.currentTarget.dataset.key!)} />
          )}
        />
      </div>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center gap-1 text-sm text-muted-foreground w-full">
          <CardDescription className="text-xs">{data?.id}</CardDescription>
          <CardTitle className="">{data?.date}</CardTitle>
          <Summary records={data?.records} />
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 gap-2 w-full">
            <RecordTable records={data?.records.incomes} />
            <RecordTable records={data?.records.expenses} />
            <RecordTable records={data?.records.investments} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

const RecordTable: FC<{ records?: Register[] }> = ({ records = [] }) => {
  const { t } = useTranslation('translation');
  const total = sum(records);
  return (
    <Card className="shadow-lg w-full">
      <CardContent>
        <Table parentClassName="h-full sm:h-150">
          <TableHeader>
            <TableRow>
              <TableHead className="p-3" />
              <TableHead colSpan={3} className="text-right p-0">
                {t('currency', { value: total })}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((item) => (
              <TableRow key={item.id} className="[&_td]:p-1.5">
                <TableCell>
                  <Check checked={item.checked} />
                </TableCell>
                <TableCell colSpan={2}>{item.name}</TableCell>
                <TableCell className="text-right">{t('currency', { value: item.value })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const Check: FC<{ checked: boolean }> = ({ checked }) =>
  checked ? <CheckCircle2 className="size-3 text-green-800" /> : <XCircle className="size-3 text-grey-800" />;

const RefDateInput: FC<ComponentPropsWithoutRef<'input'> & { onEnter: (value: string) => void }> = ({
  onEnter,
  value,
  ...props
}) => {
  const [error, setError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter' || !inputRef.current) return;

    const parsedResult = RefDateSchema.safeParse(inputRef.current.value);
    if (parsedResult.success) {
      onEnter(parsedResult.data);
      setError('');
    } else {
      setError(parsedResult.error.errors.map((err) => err.message).join(','));
    }
  };
  return (
    <div className="grid w-full max-w-sm items-center">
      <Input ref={inputRef} name="ref" defaultValue={value} onKeyDown={handleEnter} {...props} />
      <span className="text-red-400 text-xs mx-2">{error}</span>
    </div>
  );
};

const Summary: FC<{
  records: { incomes: Array<Register>; expenses: Array<Register>; investments: Array<Register> } | undefined;
}> = ({ records }) => {
  const total = getTotal(records);
  return (
    <div className="flex flex-row sm:flex-col justify-between gap-2 w-full sm:w-min sm:gap-0">
      <CurrencyItem className="text-lg font-semibold" value={total.balance} color={{ true: 'text-blue-400' }} />
      <CurrencyItem className="text-lg font-semibold" value={total.cost} color={{ true: 'text-red-400' }} />
    </div>
  );
};

const PreviousRefList: FC<{
  renderItem: (cache: Query) => ReactNode;
}> = ({ renderItem }) => {
  const query = useQueryClient();
  return (
    <div className="flex gap-2 flex-wrap text-xs">
      {query
        .getQueryCache()
        .findAll({ queryKey: [QueryKeys.history] })
        .map((cache) => (
          <Fragment key={cache.queryHash}>{renderItem(cache)}</Fragment>
        ))}
    </div>
  );
};

const PreviousRefItem: FC<{ value?: unknown; onClick: (event: MouseEvent<HTMLButtonElement>) => void }> = ({
  value,
  onClick
}) => {
  return value ? (
    <button className="border p-1 rounded-lg cursor-pointer" data-key={value} onClick={onClick}>
      {value as string}
    </button>
  ) : null;
};
