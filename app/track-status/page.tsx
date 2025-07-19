import React from 'react';

async function getReports() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/report`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function TrackStatusPage() {
  const reports = await getReports();

  const steps = [
    'รอนัดหมาย',
    'ได้รับหมาย',
    'พบพนักงานสอบสวน',
    'ระหว่างสืบสวนสอบสวน',
    'อายัดบัญชี',
    'ออกหมาย',
    'รู้ตัวคนร้าย',
    'จับกุมดำเนินคดี',
    'สิ้นสุด',
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-xl font-semibold mb-6">เรื่องที่แจ้ง</h1>

      {/* Stepper */}
      <div className="flex justify-between items-center mb-6 overflow-x-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`rounded-full p-2 border-4 ${index === 0 ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-300 text-white border-gray-300'}`}
            >
              <div className="w-8 h-8 flex items-center justify-center font-bold">
                {index === 0 ? '📅' : '✔️'}
              </div>
            </div>
            <p className="text-sm text-center mt-2">{step}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded shadow">
        <table className="w-full border-collapse text-sm text-left">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-3 whitespace-nowrap">จัดการ</th>
              <th className="p-3 whitespace-nowrap">เพิ่มเลขอ้างอิงธนาคาร</th>
              <th className="p-3 whitespace-nowrap">เลือกสถานีที่สะดวก</th>
              <th className="p-3 whitespace-nowrap">รายงาน</th>
              <th className="p-3 whitespace-nowrap">เลขรับแจ้งความออนไลน์</th>
              <th className="p-3 whitespace-nowrap">รายละเอียดของการเกิดเหตุโดยย่อ</th>
              <th className="p-3 whitespace-nowrap">หน่วยงาน</th>
              <th className="p-3 whitespace-nowrap">พนักงานสืบสวน</th>
              <th className="p-3 whitespace-nowrap">วันที่แจ้งเหตุ</th>
              <th className="p-3 whitespace-nowrap">สถานะคดี</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-500">
                  ไม่มีข้อมูล
                </td>
              </tr>
            ) : (
              reports.map((report: any) => (
                <tr key={report._id} className="border-t">
                  <td className="p-3 text-black">Edit</td>
                  <td className="p-3 text-black">
                    {report.tranfers?.[0]?.accessNumber || 'N/A'}
                  </td>
                  <td className="p-3 text-black">{report.avaliableAgency?.agencyName || 'N/A'}</td>
                  <td className="p-3 text-black">{report.crimeTitle}</td>
                  <td className="p-3 text-black">{report._id}</td>
                  <td className="p-3 text-black">{report.crimeDescription}</td>
                  <td className="p-3 text-black">{report.unit}</td>
                  <td className="p-3 text-black">N/A</td>
                  <td className="p-3 text-black">
                    {report.datetime ? new Date(report.datetime).toLocaleDateString('th-TH') : 'N/A'}
                  </td>
                  <td className="p-3 text-black">
                    {report.status === 'pending'
                      ? 'รออนุมัติ'
                      : report.status === 'in_progress'
                      ? 'ระหว่างดำเนินการ'
                      : report.status === 'resolved'
                      ? 'เสร็จสิ้น'
                      : 'ถูกปฏิเสธ'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 border-t text-sm">
          <div className="flex gap-4 items-center">
            {[10, 20, 50].map((size) => (
              <button key={size} className="px-2 py-1 border rounded bg-gray-100">
                {size}
              </button>
            ))}
          </div>
          <span>
            Page 1 of 1 ({reports.length} item{reports.length !== 1 && 's'})
          </span>
        </div>
      </div>
    </div>
  );
}
