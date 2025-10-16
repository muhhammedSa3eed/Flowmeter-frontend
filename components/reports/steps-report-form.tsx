/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
import Stepper from './stepper';
import { Button } from '../ui/button';
import StepOne from './forms-steps/step-1';
import StepTwo from './forms-steps/step-2';
import StepThree from './forms-steps/step-3';
import StepFour from './forms-steps/step-4';
import StepFive from './forms-steps/step-5';
import StepSix from './forms-steps/step-6';
import { useForm } from 'react-hook-form';
import { ReportSchema } from '@/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '../ui/form';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { DataType } from '@/types';
import toast from 'react-hot-toast';
import { steps } from '@/lib/static-data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useRouter } from 'next/navigation';
// const stepFieldPaths: Record<number, string[]> = {
//   1: ['primaryMeteringDevice'],
//   2: ['secondaryMeteringDevice'],
//   3: ['dataCollection'],
//   4: ['inSituFlowComparison'],
//   5: ['coverageProbability'],
// };
// const steps = [
//   { id: 1, label: 'Primary Metering Device' },
//   { id: 2, label: 'Secondary Metering Device' },
//   { id: 3, label: 'Data Collection' },
//   { id: 4, label: 'In Situ Flow Comparisons' },
//   { id: 5, label: 'Overall/ Expanded Uncertainty' },
//   { id: 6, label: 'Review & Generate Report' },
// ];
interface searchStepData {
  token?: string;
  rfpIdData?: number | undefined;
  formData: any;
}
const StepsReportForm = ({ token, rfpIdData, formData }: searchStepData) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<DataType | null>(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isShowBack, setIsShowBack] = useState(true);
  const router = useRouter();
  type Inputs = z.infer<typeof ReportSchema>;
  type FieldName = keyof Inputs;
  const form = useForm<z.infer<typeof ReportSchema>>({
    resolver: zodResolver(ReportSchema) as any,
    defaultValues: {
      primaryMeteringDevice: {
        specifiedManufacturerUncertainty: {
          relativeUncertainty:
            formData.RfpStandardSpecs.specifiedManufacturerUncertainty,
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
        installationEffects: {
          // effectsRelativeUncertaintyList: [1, 2, 3],
          effectsRelativeUncertaintyList: [],
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
        hydraulicEffect: {
          // effectsRelativeUncertaintyList: [1, 2, 3],
          effectsRelativeUncertaintyList: [],
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
        unsteadyFlow: {
          relativeUncertainty: formData.RfpStandardSpecs.unsteadyFlow,
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
        envTemperatureEffect: {
          opertTemperatureC: formData.RfpStandardSpecs.operatingTempC,
          uncertTemperatureC: formData.RfpStandardSpecs.tempUncertaintyC,
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
      },
      secondaryMeteringDevice: {
        electronicInstrumentation: {
          relativeUncertainty: formData.RfpStandardSpecs.electronicUncertainty,
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
        displayResolution: {
          noDecimalPoints: formData.RfpStandardSpecs.displayDecimalPoints,
          maxCurrentOutput: undefined,
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
        signalConversion: {
          fullFlowScale: formData.RfpStandardSpecs.fullFlowScale,
          minCurrentOutput: formData.RfpStandardSpecs.minCurrentOutput,
          maxCurrentOutput: formData.RfpStandardSpecs.maxCurrentOutput,
          repeatabilityError: formData.RfpStandardSpecs.repeatabilityError,
          meterAccuracy: formData.RfpStandardSpecs.meterAccuracy,
          testSamples: [],

          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
      },

      dataCollection: {
        weightedError: {
          startDate: '',
          // startDate: '2025-09-30',
          // endDate: 'yyyy-mm-dd',
          flowMeterDiameter: undefined,
          // endDate: '',
          endDate: '',

          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
        dataSignalConversion: {
          noDecimalPoints: formData.RfpStandardSpecs.dataDecimalPoints,
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
          adcAccuracy: undefined,
          manufacturerRef: undefined,
        },
        estimatesForMissingData: {
          relativeUncertainty: undefined,
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
      },
      inSituFlowComparison: {
        flowReferenceStandard: formData.RfpStandardSpecs.flowRefStandard,
        probabilityDistribution: '',
        sensitivityCoefficient: undefined,
      },
      coverageProbability: undefined,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      console.log('field changed:', name, value);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const nextStep = async () => {
    const fields = steps[currentStep - 1].fields;
    console.log({ fields });
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });
    if (!output) {
      toast.error('Please fill in all required fields before continuing.');
      return;
    }

    if (currentStep < steps.length) {
      if (currentStep === 5) {
        try {
          const formValues = form.getValues();

          const values = {
            title: 'Report',
            rfpId: rfpIdData,
            ...formValues,
          };
          // console.log('xxxxx', JSON.stringify(values));

          const res = await fetch(`/api/calculate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ values }),
          });

          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || 'Failed to submit step 5 data');
          }

          const data = await res.json();
          console.log('✅ Step 5 request success:', data);
          setData(data.result);
        } catch (error) {
          console.error('❌ Error submitting data:', error);
        }
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  async function onSubmit(values: z.infer<typeof ReportSchema>) {
    console.log(JSON.stringify(values));
    console.log({ token });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reports`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
          body: JSON.stringify({
            title: 'Report',
            rfpId: rfpIdData,
            ...values,
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to submit report');
      }

      const data = await res.json();

      console.log('Report created successfully:', data);
      toast.success('Report created successfully');
      setIsShowBack(false);
      router.push(`/dashboard/RfpReports/${data.id}`);
      return data;
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6  p-4 h-[calc(100vh-210px)]">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <div className="md:col-span-3 lg:col-span-4 bg-white shadow-sm px-2 py-6">
        <div className="flex flex-col">
          <div>
            <div className="flex items-center justify-center gap-4 px-4 py-1">
              <h2 className="mb-3 text-3xl font-bold text-green-500 text-center">
                {steps[currentStep - 1].id}.{steps[currentStep - 1].label}
              </h2>
              {isShowBack && (
                <span className="mb-3">
                  <Badge variant="secondary">
                    Needs Review <Check size={20} />
                  </Badge>
                </span>
              )}
            </div>
            <Form {...form}>
              <form
                // onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {currentStep == 1 && <StepOne form={form} />}
                {currentStep == 2 && <StepTwo form={form} />}
                {currentStep == 3 && <StepThree form={form} />}
                {currentStep == 4 && <StepFour form={form} />}
                {currentStep == 5 && <StepFive form={form} />}
                {currentStep == 6 && <StepSix data={data} />}

                <div className="flex gap-2 justify-between px-6">
                  {isShowBack && (
                    <Button
                      onClick={prevStep}
                      type="button"
                      disabled={currentStep === 1}
                      className={`bg-gray-500 text-gray-100 ${
                        currentStep === 1 && 'bg-muted text-gray-400'
                      } rounded text-base duration-150 hover:bg-gray-600`}
                    >
                      Back
                    </Button>
                  )}
                  {currentStep === 6 ? (
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => setIsSaveDialogOpen(true)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button type="button" onClick={nextStep}>
                      Next Step
                    </Button>
                  )}
                  {/* {currentStep === steps.length +1 ? (
                    <Button
                      type="button"
                      onClick={form.handleSubmit(onSubmit)}
                      variant="default"
                      className="bg-blue-600 rounded text-base duration-150 hover:bg-blue-600/75"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={nextStep}
                      variant="default"
                      className="bg-green-500 rounded text-base duration-150 hover:bg-green-500/75"
                    >
                      Next Step
                    </Button>
                  )} */}
                </div>
              </form>
            </Form>
            {/* Modal Confirmation */}
            <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Save</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to save this report?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsSaveDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={form.handleSubmit((values) => {
                      onSubmit(values);
                      setIsSaveDialogOpen(false);
                    })}
                  >
                    OK
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsReportForm;

// async function onSubmit(values: z.infer<typeof ReportSchema>) {
//   console.log('Form Submitted:', JSON.stringify(values));
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/reports`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: 'include',

//         body: JSON.stringify({
//           ...values,
//           title: 'Industrial Flow Monitoring Report - Site',
//           coverageProbability: 0.98,
//           rfpId: 4,
//         }),
//       }
//     );

//     if (!res.ok) {
//       throw new Error('Failed to submit report');
//     }

//     const data = await res.json();
//     console.log('Report created successfully:', data);
//   } catch (error) {
//     console.error('Error submitting report:', error);
//   }
// }
