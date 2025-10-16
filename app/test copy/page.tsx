/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';

// 🧩 1. Schema
const schema = z.object({
  stepOne: z.object({
    siteName: z.string().min(1, 'Site name is required'),
    siteCode: z
      .number({ invalid_type_error: 'Site code must be a number' })
      .refine((val) => val !== undefined, 'Site code is required'), // require
  }),
  stepTwo: z.object({
    contactName: z.string().min(1, 'Contact name is required'),
    contactEmail: z.string().email('Invalid email'),
  }),
  stepThree: z.object({
    measurementType: z.enum(['flow', 'pressure'], {
      errorMap: () => ({ message: 'Select measurement type' }),
    }),
    measurementValue: z
      .number({ invalid_type_error: 'Must be a number' })
      .min(0, 'Value must be >= 0'),
  }),
});

type FormData = z.infer<typeof schema>;

const steps = [
  {
    id: 1,
    label: 'Site Details',
    fields: ['stepOne.siteName', 'stepOne.siteCode'],
  },
  {
    id: 2,
    label: 'Contact Info',
    fields: ['stepTwo.contactName', 'stepTwo.contactEmail'],
  },
  {
    id: 3,
    label: 'Measurement',
    fields: ['stepThree.measurementType', 'stepThree.measurementValue'],
  },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      stepOne: { siteName: '', siteCode: undefined},
      stepTwo: { contactName: '', contactEmail: '' },
      stepThree: { measurementType: 'flow', measurementValue: 0 },
    },
  });

  const nextStep = async () => {
    const current = steps[currentStep - 1];
    const valid = await form.trigger(current.fields as any);

    if (!valid) {
      toast.error('Please fix the errors before continuing.');
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep((s) => s + 1);
    } else {
      toast.success('Form submitted successfully!');
      console.log('✅ Final Values:', form.getValues());
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 mt-10 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-green-600">
        Multi-Step Form
      </h2>

      <div className="flex gap-2 mb-8">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              currentStep === s.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {s.id}. {s.label}
          </div>
        ))}
      </div>

      <Form {...form}>
        <form className="space-y-6">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <>
              <FormField
                control={form.control}
                name="stepOne.siteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter site name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stepOne.siteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Code</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter numeric site code"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <>
              <FormField
                control={form.control}
                name="stepTwo.contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stepTwo.contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <>
              <FormField
                control={form.control}
                name="stepThree.measurementType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Measurement Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flow">Flow</SelectItem>
                          <SelectItem value="pressure">Pressure</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stepThree.measurementValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Measurement Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter numeric value"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Back
            </Button>

            <Button
              type="button"
              onClick={nextStep}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {currentStep === steps.length ? 'Submit' : 'Next'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
