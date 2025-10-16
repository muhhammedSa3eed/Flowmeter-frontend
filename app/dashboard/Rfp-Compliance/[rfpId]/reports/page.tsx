import React, { Suspense } from 'react';
import { report } from '@/types';
import Loading from '@/app/loading';
import { SquareMenu } from 'lucide-react';
// import RfpReports from '@/components/RfpReports';
import { cookies } from 'next/headers';
import ReportsDataTable from './reportsData-table';
import { columns } from './columns';


async function getReportsByRfpId(rfpId: number): Promise<report[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  // const token = (await cookies()).get('token')?.value ?? '';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rfp/${rfpId}/reports`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }
  );
  if (!response.ok) {
    console.error('RFP fetch failed:', response.status, response.statusText);
    throw new Error('Failed to fetch Rfp');
  }

  const rfp = await response.json();
  console.log('RFP Data :', rfp);

  // Normalize response: accept array or wrapped shapes like { reports: [...] } or { data: [...] }
  if (Array.isArray(rfp)) return rfp as report[];
  if (rfp?.reports && Array.isArray(rfp.reports))
    return rfp.reports as report[];
  if (rfp?.data && Array.isArray(rfp.data)) return rfp.data as report[];

  // fallback to empty array to avoid passing an object into the table
  return [];
}

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ rfpId: number }>;
}) {
  const rfpId = (await params).rfpId;

  const reportData = await getReportsByRfpId(rfpId);
  console.log({ reportData });
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min mt-5 p-4 md:p-10">
          <div className="flex items-center justify-center gap-2 text-custom-green2 mb-3">
            <SquareMenu className="w-6 h-6" />
            <span className="text-xl font-bold">Flow Meters Reports</span>
          </div>

          <ReportsDataTable data={reportData} columns={columns} />
          {/* <RfpReports RFpData={RFpData} /> */}
        </div>
      </div>
    </Suspense>
  );
}
