import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import {
  PropsWithChildren,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { SettingsFormContext } from './settings-form-context';

type SettingsFormProps<T extends FieldValues> = PropsWithChildren<{
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  title: string;
  description: string;
}>;
export function SettingsForm<T extends FieldValues>({
  children,
  form,
  onSubmit,
  title,
  description,
}: Readonly<SettingsFormProps<T>>) {
  const { t } = useTranslation();
  const formId = useId();
  const [enableForm, setEnableForm] = useState(false);

  const { formState } = form;

  const submit = useCallback((data: T) => {
    onSubmit(data);
    setEnableForm(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      enabled: enableForm,
    }),
    [enableForm],
  );

  return (
    <SettingsFormContext.Provider value={contextValue}>
      <Card>
        <CardHeader>
          <CardTitle>{t(title)}</CardTitle>
          <CardDescription>{t(description)}</CardDescription>
          <div className="flex items-center space-x-2 pt-4">
            <Checkbox
              id={formId}
              checked={enableForm}
              onCheckedChange={(val) => setEnableForm(!!val)}
            />
            <Label htmlFor={formId}>{t('enabled')}</Label>
          </div>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            aria-disabled={!enableForm}
          >
            <CardContent>{children}</CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button
                type="submit"
                disabled={!formState.isValid || !enableForm}
              >
                {t('save')}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </SettingsFormContext.Provider>
  );
}
