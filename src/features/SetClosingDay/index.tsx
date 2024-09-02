import { SettingsForm } from '@/components/setting-form';
import {
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Schema } from '@/types/goal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function SetClosingDay() {
  const form = useForm<{ closingDay: number }>({
    resolver: zodResolver(Schema),
    defaultValues: { closingDay: 25 },
  });

  return (
    <SettingsForm
      disabled
      form={form}
      title="closingDaySettings.title"
      description="closingDaySettings.description"
    >
      <FormField
        control={form.control}
        name="closingDay"
        disabled={true}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input className="disabled:text-stone-400" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </SettingsForm>
  );
}
