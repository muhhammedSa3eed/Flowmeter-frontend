'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { distOptions } from '@/lib/static-data';
import { ReportSchema } from '@/schemas';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
type StepOneProps = {
  form: UseFormReturn<z.infer<typeof ReportSchema>>;
};
const effectsOptions: Option[] = [
  { value: '1', label: 'Effect 1' },
  { value: '2', label: 'Effect 2' },
  { value: '3', label: 'Effect 3' },
  { value: '4', label: 'Effect 4' },
  { value: '5', label: 'Effect 5' },
];

const hydraulicOptions: Option[] = [
  { value: '1', label: 'Hydraulic 1' },
  { value: '2', label: 'Hydraulic 2' },
  { value: '3', label: 'Hydraulic 3' },
  { value: '4', label: 'Hydraulic 4' },
  { value: '5', label: 'Hydraulic 5' },
];
const StepOne = ({ form }: StepOneProps) => {
  return (
    <div className=" px-6 space-y-6 ">
      <p className="text-gray-600  font-semibold text-center mb-8">
        Please provide the necessary information for this step.
      </p>
      <div className="space-y-6 mt-4">
        {/* Row 1 */}
        <div className="grid grid-cols-4 items-center gap-4">
          <h3 className="col-span-1 text-sm font-semibold">
            Specified Uncertainty from Manufacturer:
          </h3>

          <FormField
            control={form.control}
            name="primaryMeteringDevice.specifiedManufacturerUncertainty.relativeUncertainty"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Input
                    placeholder="2%"
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
            name="primaryMeteringDevice.specifiedManufacturerUncertainty.probabilityDistribution"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Prob. dist." />
                    </SelectTrigger>
                    <SelectContent>
                      {/* <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="uniform">Uniform</SelectItem> */}
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
            name="primaryMeteringDevice.specifiedManufacturerUncertainty.sensitivityCoefficient"
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

        {/* Row 2 */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="col-span-1">Installation Effect:</Label>
          {/* <FormField
            control={form.control}
            name="primaryMeteringDevice.installationEffects.effectsRelativeUncertaintyList"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Select
                    onValueChange={(val) => field.onChange([Number(val)])}
                    value={field.value?.[0]?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Drop-down" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Effect 1</SelectItem>
                      <SelectItem value="2">Effect 2</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="primaryMeteringDevice.installationEffects.effectsRelativeUncertaintyList"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultipleSelector
                    defaultOptions={effectsOptions}
                    placeholder="Select Effects Relative Uncertainty List"
                    value={effectsOptions.filter((f) =>
                      field.value.includes(Number(f.value))
                    )}
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
          <FormField
            control={form.control}
            name="primaryMeteringDevice.installationEffects.probabilityDistribution"
            render={({ field }) => (
              <FormItem className="col-span-1">
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
            name="primaryMeteringDevice.installationEffects.sensitivityCoefficient"
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

        {/* Row 3 */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="col-span-1">Hydraulic Effects:</Label>
          {/* <FormField
            control={form.control}
            name="primaryMeteringDevice.hydraulicEffect.effectsRelativeUncertaintyList"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Select
                    onValueChange={(val) => field.onChange([Number(val)])}
                    value={field.value?.[0]?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Drop-down" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Hydraulic 1</SelectItem>
                      <SelectItem value="2">Hydraulic 2</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="primaryMeteringDevice.hydraulicEffect.effectsRelativeUncertaintyList"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultipleSelector
                    defaultOptions={hydraulicOptions}
                    placeholder="Select Effects Relative Uncertainty List"
                    value={hydraulicOptions.filter((f) =>
                      field.value.includes(Number(f.value))
                    )}
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
          <FormField
            control={form.control}
            name="primaryMeteringDevice.hydraulicEffect.probabilityDistribution"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="col-span-1">
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
            name="primaryMeteringDevice.hydraulicEffect.sensitivityCoefficient"
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

        {/* Row 4 */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="col-span-1">Unsteady Flow:</Label>
          <FormField
            control={form.control}
            name="primaryMeteringDevice.unsteadyFlow.relativeUncertainty"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Input
                    placeholder="1%"
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
            name="primaryMeteringDevice.unsteadyFlow.probabilityDistribution"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="col-span-1">
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
            name="primaryMeteringDevice.unsteadyFlow.sensitivityCoefficient"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Input
                    placeholder="1.0"
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
        {/* Row 5 */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="col-span-1">
            Environmental Factors - Temperature:
          </Label>
          <FormField
            control={form.control}
            name="primaryMeteringDevice.envTemperatureEffect.opertTemperatureC"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Input
                    placeholder="T oper | [C]"
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

        {/* Row 6 */}
        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="primaryMeteringDevice.envTemperatureEffect.uncertTemperatureC"
            render={({ field }) => (
              <FormItem className="col-span-1 col-start-2">
                <FormControl>
                  <Input
                    placeholder="Delta (T) | [C]"
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
            name="primaryMeteringDevice.envTemperatureEffect.probabilityDistribution"
            render={({ field }) => (
              <FormItem className="col-start-3">
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
            name="primaryMeteringDevice.envTemperatureEffect.sensitivityCoefficient"
            render={({ field }) => (
              <FormItem className="col-span-1 col-start-4">
                <FormControl>
                  <Input
                    placeholder="sens. factor"
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

export default StepOne;

// export default function PrimaryMeteringDevices() {
//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6">
//       {/* this is the header of step 1 form */}
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle className="text-xl font-bold">
//             1. Primary Metering Devices
//           </CardTitle>
//           <div className="flex items-center gap-4 px-4 py-1">
//             <Badge variant="secondary">Needs Review</Badge>
//             <Check size={20} />
//           </div>
//         </CardHeader>
//         <CardContent className="text-gray-600  font-semibold">
//           Please provide the necessary information for this step.
//         </CardContent>

//         {/* this is the content of the form */}

//         <CardContent className="space-y-6 mt-4">
//           {/* Row 1 */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <h1 className="col-span-1 text-base font-semibold">
//               Specified Uncertainty - from Manufacturer:
//             </h1>
//             <Input className="col-span-1" placeholder="2%" />
//             <Select>
//               <SelectTrigger className="col-span-1">
//                 <SelectValue placeholder="Prob. dist." />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="normal">Normal</SelectItem>
//                 <SelectItem value="uniform">Uniform</SelectItem>
//               </SelectContent>
//             </Select>
//             <Input placeholder="sens. factor" className="col-span-1" />
//           </div>

//           {/* Row 2 */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label className="col-span-1">Installation Effect:</Label>
//             <Select>
//               <SelectTrigger className="col-span-1">
//                 <SelectValue placeholder="Drop-down" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="effect1">Effect 1</SelectItem>
//                 <SelectItem value="effect2">Effect 2</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select>
//               <SelectTrigger className="col-span-1">
//                 <SelectValue placeholder="Prob. dist." />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="normal">Normal</SelectItem>
//                 <SelectItem value="uniform">Uniform</SelectItem>
//               </SelectContent>
//             </Select>
//             <Input placeholder="sens. factor" className="col-span-1" />
//           </div>

//           {/* Row 3 */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label className="col-span-1">Hydraulic Effects:</Label>
//             <Select>
//               <SelectTrigger className="col-span-1">
//                 <SelectValue placeholder="Drop-down" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="hydro1">Hydraulic 1</SelectItem>
//                 <SelectItem value="hydro2">Hydraulic 2</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select>
//               <SelectTrigger className="col-span-1">
//                 <SelectValue placeholder="Prob. dist." />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="normal">Normal</SelectItem>
//                 <SelectItem value="uniform">Uniform</SelectItem>
//               </SelectContent>
//             </Select>
//             <Input placeholder="sens. factor" className="col-span-1" />
//           </div>

//           {/* Row 4 */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label className="col-span-1">Unsteady Flow:</Label>
//             <Input className="col-span-1" placeholder="1%" />
//             <Select>
//               <SelectTrigger className="col-span-1">
//                 <SelectValue placeholder="Prob. dist." />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="normal">Normal</SelectItem>
//                 <SelectItem value="uniform">Uniform</SelectItem>
//               </SelectContent>
//             </Select>
//             <Input placeholder="sens. factor" className="col-span-1" />
//           </div>
//           {/* Row 5 */}
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label className="col-span-1">
//               Environmental Factors - Temperature:
//             </Label>
//             <Input placeholder="T oper | [C]" className="col-span-1" />
//           </div>

//           {/* Row 6 */}
//           <div className="grid grid-cols-4 gap-4">
//             <Input
//               placeholder="Delta (T) | [C]"
//               className="col-span-1 col-start-2"
//             />
//             <Select className="col-start-3">
//               <SelectTrigger>
//                 <SelectValue placeholder="Prob. dist." />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="normal">Normal</SelectItem>
//                 <SelectItem value="uniform">Uniform</SelectItem>
//               </SelectContent>
//             </Select>
//             <Input
//               placeholder="sens. factor"
//               className="col-span-1 col-start-4"
//             />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
