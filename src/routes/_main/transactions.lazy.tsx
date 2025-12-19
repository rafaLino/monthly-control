import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CsvDropZone } from '@/modules/data-analysis/components/csv-drop-zone/csv-drop-zone';
import { CSVtoObject } from '@/modules/data-analysis/utils/csv-to-object';
import { resolveCsv } from '@/modules/data-analysis/utils/resolve-csv';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const Route = createLazyFileRoute('/_main/transactions')({
  component: Index,
})


function Index() {
  return (
    <main className="grid flex-1 items-start gap-4 p-2 sm:py-0 md:gap-8">
      <div className="flex flex-1 flex-col gap-4 items-center p-1 sm:p-4 md:gap-4 md:p-6">
        <RouteComponent />
      </div>
    </main>
  );
}

const mock = [
  {
    "date": "2025-12-19",
    "title": "Honest Ubuntu",
    "amount": "23.50"
  },
  {
    "date": "2025-12-14",
    "title": "Drogasil2776",
    "amount": "89.20"
  },
  {
    "date": "2025-12-14",
    "title": "Munhozmultimarcas",
    "amount": "16.00"
  },
  {
    "date": "2025-12-13",
    "title": "Claro Flex",
    "amount": "39.99"
  },
  {
    "date": "2025-12-11",
    "title": "Conta Vivo",
    "amount": "156.00"
  },
  {
    "date": "2025-12-09",
    "title": "Centauro Ce220",
    "amount": "109.98"
  },
  {
    "date": "2025-12-09",
    "title": "Shopee *Lupakids",
    "amount": "113.36"
  },
  {
    "date": "2025-12-09",
    "title": "Amazonmktplc*Inoxshopc",
    "amount": "19.00"
  },
  {
    "date": "2025-12-09",
    "title": "Park Place",
    "amount": "22.00"
  },
  {
    "date": "2025-12-08",
    "title": "Leroy Merlin",
    "amount": "126.45"
  },
  {
    "date": "2025-12-08",
    "title": "Ubuntuhomemarket",
    "amount": "11.00"
  },
  {
    "date": "2025-12-07",
    "title": "Wet N Wild Sao Paulo",
    "amount": "18.00"
  },
  {
    "date": "2025-12-07",
    "title": "Tkt360*X8ae",
    "amount": "422.47"
  },
  {
    "date": "2025-12-07",
    "title": "Auto Ban Jundiai",
    "amount": "13.70"
  },
  {
    "date": "2025-12-07",
    "title": "Drogasil2776",
    "amount": "31.95"
  },
  {
    "date": "2025-12-07",
    "title": "Wet N Wild Sao Paulo",
    "amount": "44.90"
  },
  {
    "date": "2025-12-07",
    "title": "Burger King",
    "amount": "104.80"
  },
  {
    "date": "2025-12-07",
    "title": "Auto Ban Jundiai",
    "amount": "13.70"
  },
  {
    "date": "2025-12-06",
    "title": "Pagamento recebido",
    "amount": "-408.00"
  },
  {
    "date": "2025-12-01",
    "title": "Pagamento recebido",
    "amount": "-344.33"
  },
  {
    "date": "2025-12-01",
    "title": "Ubuntuhomemarket",
    "amount": "8.00"
  },
  {
    "date": "2025-12-01",
    "title": "Shopee *Meufestore",
    "amount": "29.99"
  },
  {
    "date": "2025-12-01",
    "title": "Ubuntuhomemarket",
    "amount": "14.50"
  },
  {
    "date": "2025-11-30",
    "title": "Fernandalina",
    "amount": "80.00"
  },
  {
    "date": "2025-11-29",
    "title": "Drogasil2776",
    "amount": "52.89"
  },
  {
    "date": "2025-11-29",
    "title": "Gelateria Della Vitta",
    "amount": "21.53"
  },
  {
    "date": "2025-11-29",
    "title": "Munhozmultimarcas",
    "amount": "22.00"
  },
  {
    "date": "2025-11-28",
    "title": "Casasbahiacom - Parcela 5/5",
    "amount": "115.80"
  }
]

type Transaction = {
  date: string;
  title: string;
  amount: string;
  id: string;
}
function RouteComponent() {
  const [items, setItems] = useState<Transaction[]>((mock.map((item, index) => ({ ...item, id: String(index + 1) }))))
  const { t } = useTranslation('translation');
  const [{ mouseX, mouseY }, setMouseMovement] = useState({ mouseX: 0, mouseY: 0 });
  const handleDrop = async (file: File | undefined) => {
    if (!file) return;
    const csv = await resolveCsv(file);
    const data = CSVtoObject<Transaction>(csv);
    setItems(data
      .filter(item => item.date && item.title && item.amount)
      .map((item, index) => ({ ...item, id: String(index + 1) })));
  };

  const groupedItems = Object.groupBy(items, item => item.date);

  const cost = items.filter(item => parseFloat(item.amount) > 0).reduce((acc, item) => acc + parseFloat(item.amount), 0);
  const paid = items.filter(item => parseFloat(item.amount) < 0).reduce((acc, item) => acc + parseFloat(item.amount), 0);
  const balance = paid + cost;
  return (
    <>
      <div draggable={true} style={{ top: mouseY, left: mouseX }} className="mb-4 size-80 z-50 bg-amber-300 text-center text-sm text-muted-foreground absolute" onDrag={(event) => {
        setMouseMovement({ mouseX: event.clientX, mouseY: event.clientY });
      }}>

      </div>
      {items.length > 0 ? (
        <>
          <div className='flex flex-row justify-evenly gap-2'>
            <Translation>
              {(t) => (
                <>
                  <span>Expenses: {t('currency', { value: cost })}</span>
                  <span>Paid: {t('currency', { value: paid })}</span>
                  <span>Total: {t('currency', { value: balance })}</span>
                </>
              )}
            </Translation>
          </div>
          <ScrollArea type='scroll' className="h-190 max-h- w-full rounded-md overflow-y-hidden">
            <Accordion
              type="multiple"
              className='w-auto'
              defaultValue={Object.keys(groupedItems)}
            >
              {Object.entries(groupedItems).map(([date, items]) => (
                <AccordionItem value={date}>
                  <AccordionTrigger>{date}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-2.5 text-balance">
                    {items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col rounded-md bg-muted hover:bg-muted/40 p-2"
                      >
                        <span className={cn("text-muted-foreground font-medium text-lg", parseFloat(item.amount) > 0 ? 'text-red-500' : 'text-green-500')}>
                          {t('currency', { value: item.amount })}
                        </span>
                        <div className="font-medium text-sm">{item.title}</div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </>
      )
        : <CsvDropZone onDrop={handleDrop} />}
    </>)
}
