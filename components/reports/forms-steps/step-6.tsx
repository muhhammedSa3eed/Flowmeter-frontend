/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DataType } from "@/types";
import React from "react";



function Section({ title, sectionData }: { title: string; sectionData: any }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2 border-b border-gray-400 pb-1">
        {title}
      </h2>
      <table className="w-full border border-black text-sm">
        <thead className="bg-gray-200 text-gray-900 font-semibold">
          <tr>
            <th className="border border-black p-2">Uncertainty Source</th>
            <th className="border border-black p-2">Relative Uncertainty</th>
            <th className="border border-black p-2">
              Probability Distribution
            </th>
            <th className="border border-black p-2">Division Factor</th>
            <th className="border border-black p-2">Sensitivity Coefficient</th>
            <th className="border border-black p-2">Std. Uncertainty</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(sectionData).map(([key, value]: any) => (
            <tr key={key} className="hover:bg-gray-50">
              <td className="border border-black p-2 font-medium">{key}</td>
              <td className="border border-black p-2 text-center">
                {value.relativeUncertainty.toFixed(4)}
              </td>
              <td className="border border-black p-2 text-center">
                {value.probabilityDistribution}
              </td>
              <td className="border border-black p-2 text-center">
                {value.divisionFactor.toFixed(3)}
              </td>
              <td className="border border-black p-2 text-center">
                {value.sensitivityCoefficient.toFixed(2)}
              </td>
              <td className="border border-black p-2 text-center">
                {value.stdUncert.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
interface DataProps{
  data:DataType|null
}
export default function StepSix({data}:DataProps) {
  // const [data, setData] = useState<DataType | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("/data.json") 
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setData(json);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching data:", err);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) return <p className="text-center mt-10">Loading data...</p>;
  if (!data)
    return <p className="text-center mt-10 text-red-600">No data available</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-8">{data.title}</h1>

      <Section
        title="1. Primary Metering Device"
        sectionData={data.primaryMeteringDevice}
      />
      <p className="font-semibold mt-2 mb-6">
        Combined Primary Device Uncertainty:{" "}
        <span className="text-gray-700">
          {data.combinedPrimaryDeviceUncert.toFixed(6)}
        </span>
      </p>

      <Section
        title="2. Secondary Metering Device"
        sectionData={data.secondaryMeteringDevice}
      />
      <p className="font-semibold mt-2 mb-6">
        Combined Secondary Device Uncertainty:{" "}
        <span className="text-gray-700">
          {data.combinedSecondaryDeviceUncert.toFixed(6)}
        </span>
      </p>

      <Section title="3. Data Collection" sectionData={data.dataCollection} />
      <p className="font-semibold mt-2 mb-6">
        Combined Data Collection Uncertainty:{" "}
        <span className="text-gray-700">
          {data.combinedDataCollectionUncert.toFixed(6)}
        </span>
      </p>

      <Section
        title="4. In-Situ Flow Comparison"
        sectionData={{ inSituFlowComparison: data.inSituFlowComparison }}
      />
      <p className="font-semibold mt-2 mb-6">
        Combined In-Situ Flow Uncertainty:{" "}
        <span className="text-gray-700">
          {data.combinedInSitueUncert.toFixed(3)}
        </span>
      </p>

      <div className="mt-10 border-t border-gray-400 pt-6">
        <h2 className="text-lg font-semibold mb-4">
          5. Overall Uncertainty Summary
        </h2>
        <table className="w-full border border-black text-sm">
          <tbody>
            <tr className="bg-gray-100 font-semibold">
              <td className="border border-black p-2">
                Overall Combined Uncertainty
              </td>
              <td className="border border-black p-2 text-center">
                {data.overallCombinedUncert.toFixed(6)}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2">Coverage Probability</td>
              <td className="border border-black p-2 text-center">
                {data.coverageProbability}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2">Coverage Factor</td>
              <td className="border border-black p-2 text-center">
                {data.coverageFactor.toFixed(3)}
              </td>
            </tr>
            <tr className="bg-gray-100 font-semibold">
              <td className="border border-black p-2">Expanded Uncertainty</td>
              <td className="border border-black p-2 text-center">
                {data.expandedUncert.toFixed(3)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

