/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
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

// steps array (as عندك)
export const steps = [
  {
    id: 1,
    label: 'Primary Metering Device',
    fields: [
      'primaryMeteringDevice.specifiedManufacturerUncertainty.relativeUncertainty',
      'primaryMeteringDevice.specifiedManufacturerUncertainty.probabilityDistribution',
      'primaryMeteringDevice.specifiedManufacturerUncertainty.sensitivityCoefficient',

      'primaryMeteringDevice.installationEffects.effectsRelativeUncertaintyList',
      'primaryMeteringDevice.installationEffects.probabilityDistribution',
      'primaryMeteringDevice.installationEffects.sensitivityCoefficient',

      'primaryMeteringDevice.hydraulicEffect.effectsRelativeUncertaintyList',
      'primaryMeteringDevice.hydraulicEffect.probabilityDistribution',
      'primaryMeteringDevice.hydraulicEffect.sensitivityCoefficient',

      'primaryMeteringDevice.unsteadyFlow.relativeUncertainty',
      'primaryMeteringDevice.unsteadyFlow.probabilityDistribution',
      'primaryMeteringDevice.unsteadyFlow.sensitivityCoefficient',

      'primaryMeteringDevice.envTemperatureEffect.opertTemperatureC',
      'primaryMeteringDevice.envTemperatureEffect.uncertTemperatureC',
      'primaryMeteringDevice.envTemperatureEffect.probabilityDistribution',
      'primaryMeteringDevice.envTemperatureEffect.sensitivityCoefficient',
    ],
  },
  {
    id: 2,
    label: 'Secondary Metering Device',
    fields: [
      'secondaryMeteringDevice.electronicInstrumentation.relativeUncertainty',
      'secondaryMeteringDevice.electronicInstrumentation.probabilityDistribution',
      'secondaryMeteringDevice.electronicInstrumentation.sensitivityCoefficient',

      'secondaryMeteringDevice.displayResolution.noDecimalPoints',
      'secondaryMeteringDevice.displayResolution.maxCurrentOutput',
      'secondaryMeteringDevice.displayResolution.probabilityDistribution',
      'secondaryMeteringDevice.displayResolution.sensitivityCoefficient',

      'secondaryMeteringDevice.signalConversion.maxCurrentOutput',
      'secondaryMeteringDevice.signalConversion.fullFlowScale',
      'secondaryMeteringDevice.signalConversion.minCurrentOutput',
      'secondaryMeteringDevice.signalConversion.repeatabilityError',
      'secondaryMeteringDevice.signalConversion.meterAccuracy',
      'secondaryMeteringDevice.signalConversion.testSamples',
      'secondaryMeteringDevice.signalConversion.probabilityDistribution',
      'secondaryMeteringDevice.signalConversion.sensitivityCoefficient',
    ],
  },
  {
    id: 3,
    label: 'Data Collection',
    fields: [
      'dataCollection.weightedError.startDate',
      'dataCollection.weightedError.endDate',
      'dataCollection.weightedError.probabilityDistribution',
      'dataCollection.weightedError.sensitivityCoefficient',
      'dataCollection.weightedError.flowMeterDiameter',

      'dataCollection.dataSignalConversion.noDecimalPoints',
      'dataCollection.dataSignalConversion.adcAccuracy',
      'dataCollection.dataSignalConversion.manufacturerRef',
      'dataCollection.dataSignalConversion.probabilityDistribution',
      'dataCollection.dataSignalConversion.sensitivityCoefficient',

      'dataCollection.estimatesForMissingData.relativeUncertainty',
      'dataCollection.estimatesForMissingData.probabilityDistribution',
      'dataCollection.estimatesForMissingData.sensitivityCoefficient',
    ],
  },
  {
    id: 4,
    label: 'In-Situ Flow Comparison',
    fields: [
      'inSituFlowComparison.flowReferenceStandard',
      'inSituFlowComparison.probabilityDistribution',
      'inSituFlowComparison.sensitivityCoefficient',
    ],
  },
  {
    id: 5,
    label: 'Coverage Probability',
    fields: ['coverageProbability'],
  },
];

interface searchStepData {
  token?: string;
  rfpIdData?: number | undefined;
  formData: any;
}

const StepsReportForm = ({ token, rfpIdData, formData }: searchStepData) => {
  // use the big ReportSchema as resolver for final submit (optional),
  // but we will run per-step zod checks manually.
  const form = useForm<z.infer<typeof ReportSchema>>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      primaryMeteringDevice: {
        specifiedManufacturerUncertainty: {
          relativeUncertainty:
            formData.RfpStandardSpecs.specifiedManufacturerUncertainty,
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
        installationEffects: {
          effectsRelativeUncertaintyList: [1, 2, 3],
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
        hydraulicEffect: {
          effectsRelativeUncertaintyList: [4, 5, 6],
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
        unsteadyFlow: {
          relativeUncertainty: undefined,
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
        envTemperatureEffect: {
          opertTemperatureC: undefined,
          uncertTemperatureC: undefined,
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
          testSamples: [
            [0.0, 4.0],
            [856.0, 8.72],
            [858.0, 8.72],
          ],
          probabilityDistribution: '',
          sensitivityCoefficient: undefined,
        },
      },

      dataCollection: {
        weightedError: {
          startDate: '',
          flowMeterDiameter: undefined,
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

  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<DataType | null>(null);

  // ---- build Zod schemas per step by picking from ReportSchema
  const Step1Schema = ReportSchema.pick({ primaryMeteringDevice: true });
  const Step2Schema = ReportSchema.pick({ secondaryMeteringDevice: true });
  const Step3Schema = ReportSchema.pick({ dataCollection: true });
  const Step4Schema = ReportSchema.pick({ inSituFlowComparison: true });
  const Step5Schema = ReportSchema.pick({ coverageProbability: true });

  const stepSchemas: Record<number, z.ZodType<any>> = {
    1: Step1Schema,
    2: Step2Schema,
    3: Step3Schema,
    4: Step4Schema,
    5: Step5Schema,
  };

  // helper: convert zod errors to react-hook-form errors
  const applyZodErrorsToForm = (zodError: z.ZodError) => {
    // clear previous errors for this form to avoid stale messages
    form.clearErrors();

    zodError.errors.forEach((e) => {
      // e.path is array like ['secondaryMeteringDevice','signalConversion','testSamples',0,1]
      const path = e.path.map((p) => String(p)).join('.'); // produce "secondaryMeteringDevice.signalConversion.testSamples.0.1"
      if (path) {
        form.setError(path as any, { type: 'manual', message: e.message });
      } else {
        // fallback generic error
        toast.error(e.message);
      }
    });
  };

  // validate only the current step using its schema (returns boolean)
  const validateStep = (stepIndex: number) => {
    const schema = stepSchemas[stepIndex] as any;
    if (!schema) return true;

    const allValues = form.getValues();

    // build object that matches picked schema shape:
    // Step1Schema expects { primaryMeteringDevice: {...} } so we pass exactly that
    let objToValidate: any = {};
    if (stepIndex === 1) objToValidate = { primaryMeteringDevice: allValues.primaryMeteringDevice };
    if (stepIndex === 2) objToValidate = { secondaryMeteringDevice: allValues.secondaryMeteringDevice };
    if (stepIndex === 3) objToValidate = { dataCollection: allValues.dataCollection };
    if (stepIndex === 4) objToValidate = { inSituFlowComparison: allValues.inSituFlowComparison };
    if (stepIndex === 5) objToValidate = { coverageProbability: allValues.coverageProbability };

    const result = schema.safeParse(objToValidate);
    if (result.success) {
      // clear errors related to this step only
      // (we already cleared above in applyZodErrorsToForm when errors exist)
      return true;
    } else {
      applyZodErrorsToForm(result.error);
      return false;
    }
  };

  const nextStep = async () => {
    // validate current step
    const isValid = validateStep(currentStep);
    if (!isValid) {
      toast.error('Please fill in all required fields before continuing.');
      return;
    }

    // special behavior on step 5 (your existing calculate call)
    if (currentStep === 5) {
      try {
        const formValues = form.getValues();
        const values = {
          title: 'Report',
          rfpId: rfpIdData,
          ...formValues,
        };
        const res = await fetch(`/api/calculate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ values }),
        });
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'Failed to submit step 5 data');
        }
        const data = await res.json();
        setData(data.result);
      } catch (error) {
        console.error('❌ Error submitting data:', error);
      }
    }

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  async function onSubmit(values: z.infer<typeof ReportSchema>) {
    // final submit (you had this already)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        credentials: 'include',
        body: JSON.stringify({ title: 'Report', rfpId: rfpIdData, ...values }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to submit report');
      }
      const data = await res.json();
      toast.success('Report created successfully');
      return data;
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6  p-4 h-[calc(100vh-210px)]">
      <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="md:col-span-3 lg:col-span-4 bg-white shadow-sm px-2 py-6">
        <div className="flex flex-col">
          <div>
            <div className="flex items-center justify-center gap-4 px-4 py-1">
              <h2 className="mb-3 text-3xl font-bold text-green-500 text-center">
                {steps[currentStep - 1].id}.{steps[currentStep - 1].label}
              </h2>
              <span className="mb-3">
                <Badge variant="secondary">
                  Needs Review <Check size={20} />
                </Badge>
              </span>
            </div>
            <Form {...form}>
              <form className="space-y-6">
                {currentStep == 1 && <StepOne form={form} />}
                {currentStep == 2 && <StepTwo form={form} />}
                {currentStep == 3 && <StepThree form={form} />}
                {currentStep == 4 && <StepFour form={form} />}
                {currentStep == 5 && <StepFive form={form} />}
                {currentStep == 6 && <StepSix data={data} />}

                <div className="flex gap-2 justify-between px-6">
                  <Button onClick={prevStep} type="button" disabled={currentStep === 1} className={`bg-gray-500 text-gray-100 ${currentStep === 1 && 'bg-muted text-gray-400'} rounded text-base duration-150 hover:bg-gray-600`}>
                    Back
                  </Button>
                  {currentStep === steps.length ? (
                    <Button type="button" onClick={form.handleSubmit(onSubmit)} variant="default" className="bg-blue-600 rounded text-base duration-150 hover:bg-blue-600/75">
                      Save
                    </Button>
                  ) : (
                    <Button type="button" onClick={nextStep} variant="default" className="bg-green-500 rounded text-base duration-150 hover:bg-green-500/75">
                      Next Step
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsReportForm;
