'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import MultipleSelector, { Option } from '@/components/ui/multiselect';

// 🔹 خلى القيم strings (لأن component بيحتاجها كده)
const frameworks: Option[] = [
  { value: '1', label: 'Next.js' },
  { value: '2', label: 'SvelteKit' },
  { value: '3', label: 'Nuxt.js', disable: true },
  { value: '4', label: 'Remix' },
  { value: '5', label: 'Astro' },
  { value: '6', label: 'Angular' },
  { value: '7', label: 'Vue.js' },
  { value: '8', label: 'React' },
  { value: '9', label: 'Ember.js' },
  { value: '10', label: 'Gatsby' },
];

// ✅ schema: بيستقبل array من الأرقام
const formSchema = z.object({
  frameworks: z
    .array(z.number(), {
      required_error: 'Please select at least one framework',
    })
    .min(1, 'You must select at least one framework'),
});

export default function Component() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      frameworks: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // { frameworks: [1, 2] }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-sm"
      >
        <FormField
          control={form.control}
          name="frameworks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Frameworks</FormLabel>
              <FormControl>
                <MultipleSelector
                  defaultOptions={frameworks}
                  placeholder="Select frameworks"
                  // نحول القيم المحفوظة في الفورم (أرقام) لـ strings عشان تعرضها multiselect
                  value={frameworks.filter((f) =>
                    field.value.includes(Number(f.value))
                  )}
                  // نحول القيم اللى راجعة من multiselect لـ أرقام عشان الفورم
                  onChange={(selected) =>
                    field.onChange(selected.map((item) => Number(item.value)))
                  }
                  hideClearAllButton
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className="text-center text-sm">No results found</p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
