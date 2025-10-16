'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { distOptions } from '@/lib/static-data';
import { ReportSchema } from '@/schemas';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type StepfourProps = {
  form: UseFormReturn<z.infer<typeof ReportSchema>>;
};

const StepFour = ({ form }: StepfourProps) => {
  return (
    <div className=" px-6 space-y-6 ">
      <p className="text-gray-600  font-semibold text-center mb-8">
        Please provide the necessary information for this step.
      </p>
      <div className="space-y-6 mt-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="signal" className="col-span-1 text-sm font-semibold">
            Flow Reference Standard:
          </Label>
          <FormField
            control={form.control}
            name="inSituFlowComparison.flowReferenceStandard"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Input
                    placeholder="0.0"
                    {...field}
                    type="number"
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === '' ? '' : +value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inSituFlowComparison.probabilityDistribution"
            render={({ field }) => (
              <FormItem className="col-span-1  w-full">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Prob. dist." />
                    </SelectTrigger>
                    <SelectContent>
                      {distOptions.map((opt: string) => (
                        <SelectItem key={opt} value={opt}>
                          {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inSituFlowComparison.sensitivityCoefficient"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Input
                    placeholder="sens. factor"
                    {...field}
                    type="number"
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === '' ? '' : +value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default StepFour;
