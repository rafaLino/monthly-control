import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { PropsWithChildren, useCallback, useId, useMemo, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SettingsFormContext } from './settings-form-context';

type SettingsFormProps<T extends FieldValues> = PropsWithChildren<{
  form: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
  onSubmitAsync?: (data: T) => Promise<void>;
  title: string;
  description: string;
  disabled?: boolean;
  contentClassName?: string;
}>;
export function SettingsForm<T extends FieldValues>({
  children,
  form,
  title,
  description,
  disabled,
  contentClassName,
  onSubmit,
  onSubmitAsync
}: Readonly<SettingsFormProps<T>>) {
  const { t } = useTranslation();
  const formId = useId();
  const [enableForm, setEnableForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    formState: { isValid, isDirty }
  } = form;

  const submit = useCallback(
    async (data: T) => {
      if (onSubmit) {
        onSubmit(data);
        setEnableForm(false);
        return;
      }

      try {
        setLoading(true);
        await onSubmitAsync?.(data);
      } finally {
        setEnableForm(false);
        setLoading(false);
      }
    },
    [onSubmit]
  );

  const saveDisabled = !isDirty || !isValid || !enableForm || loading;

  const contextValue = useMemo(
    () => ({
      enabled: enableForm
    }),
    [enableForm]
  );

  return (
    <SettingsFormContext.Provider value={contextValue}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{t(title)}</CardTitle>
          <CardDescription>{t(description)}</CardDescription>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id={formId} disabled={disabled} checked={enableForm} onCheckedChange={(val) => setEnableForm(!!val)} />
            <Label htmlFor={formId}>{t('enabled')}</Label>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} aria-readonly={!enableForm}>
            <CardContent className={cn('min-h-48', contentClassName)}>{children}</CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" disabled={saveDisabled} className="gap-2">
                {t('save')}
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </SettingsFormContext.Provider>
  );
}
