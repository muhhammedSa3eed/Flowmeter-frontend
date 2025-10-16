/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

import StepsReportForm from './steps-report-form';
import { FlowMeterSearch } from './flowmeter-search';
import { RFP } from '@/types';

interface FlowData {
  flowMeterData: any;
  token?: string;
  formData?:any
}
const AddReportForm = ({ flowMeterData, token }: FlowData) => {
  const [showStepsForm, setShowStepsForm] = useState(false);
  const [rfpIdData, setRfpIdData] = useState<number | undefined>(undefined);
  const [formData, setFormData] = useState<RFP | null>(null);
  // console.log({ showStepsForm });
  console.log({ formData });
  return (
    <div>
      {!showStepsForm && (
        <FlowMeterSearch
          setShowStepsForm={setShowStepsForm}
          data={flowMeterData}
          setRfpIdData={setRfpIdData}
          setFormData={setFormData}
        />
      )}
      {showStepsForm && <StepsReportForm token={token} rfpIdData={rfpIdData} formData={formData} />}
    </div>
  );
};

export default AddReportForm;
