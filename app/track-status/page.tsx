// Define the Report interface based on your schema
interface Report {
    _id: string;
    CrimeType: string;
    BankCaseID: string;
    user: {
        prefix: string;
        firstName: string;
        lastName: string;
        idCard: string;
        email: string;
        phoneNumber: string;
        phoneCarrier: string;
        birthDate: { day: number; month: number; year: number };
        idCardAddress: { address: string; district: string; subDistrict: string; province: string; postalCode: string };
        currentAddress: { address: string; district: string; subDistrict: string; province: string; postalCode: string };
    };
    previousAgency: { province: string; agencyName: string; agencyType: string };
    avaliableAgency: { province: string; agencyName: string; agencyType: string };
    crimeTitle: string;
    crimeDescription: string;
    tranfers: { owner: string; accountType: string; bankName: string; accessNumber: string; accountName: string }[];
    datetime: string; // Adjusted to string since JSON might return it as ISO string
    unit: string;
    amount: number;
    frudDetails: string;
    status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
    createdAt?: string;
    updatedAt?: string;
}

async function getReports() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reports`, {
        cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json() as Promise<Report[]>; // Type assertion for the returned data
}

export default async function TrackStatusPage() {
    const reports = await getReports();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
            <h1 className="text-2xl font-bold text-blue-900 mb-4">Track Status</h1>
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <span>Submitted</span>
                        <span>Completed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>รอนัดหมาย</span>
                        <span>ได้รับหมาย</span>
                        <span>พบพนักงานสอบสวน</span>
                        <span>ระหว่างสืบสวนสอบสวน</span>
                        <span>อายัดบัญชี</span>
                        <span>ออกหมาย</span>
                        <span>รู้ตัวคนร้าย</span>
                        <span>จับกุมดำเนินคดี</span>
                        <span>สิ้นสุด</span>
                    </div>
                </div>

                {/* Status Table */}
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-blue-900 text-white">
                            <th className="p-2">จัดการ</th>
                            <th className="p-2">เพิ่มเลขอ้างอิงธนาคาร</th>
                            <th className="p-2">เลือกสถานีที่สะดวก</th>
                            <th className="p-2">รายงาน</th>
                            <th className="p-2">เลขรับแจ้งความออนไลน์</th>
                            <th className="p-2">รายละเอียดการเกิดเหตุโดยย่อ</th>
                            <th className="p-2">หน่วยงาน</th>
                            <th className="p-2">พนักงานสืบสวน</th>
                            <th className="p-2">วันที่แจ้งเหตุ</th>
                            <th className="p-2">สถานะคดี</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(reports ?? []).map((report) => (
                            <tr key={report._id} className="border-b">
                                <td className="p-2 text-black">Edit</td>
                                <td className="p-2 text-black">{report.tranfers?.length > 0 ? report.tranfers[0].accessNumber : 'N/A'}</td>
                                <td className="p-2 text-black">{report.avaliableAgency?.agencyName || 'N/A'}</td>
                                <td className="p-2 text-black">{report.crimeTitle}</td>
                                <td className="p-2 text-black">{report._id}</td>
                                <td className="p-2 text-black">{report.crimeDescription}</td>
                                <td className="p-2 text-black">{report.unit}</td>
                                <td className="p-2 text-black">N/A</td>
                                <td className="p-2 text-black">{report.datetime ? new Date(report.datetime).toLocaleDateString() : 'N/A'}</td>
                                <td className="p-2 text-black">
                                    {report.status === 'pending'
                                        ? 'รออนุมัติ'
                                        : report.status === 'in_progress'
                                        ? 'ระหว่างดำเนินการ'
                                        : report.status === 'resolved'
                                        ? 'เสร็จสิ้น'
                                        : 'ถูกปฏิเสธ'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <span>10 20 50</span>
                    <span>Page 1 of 1 ({reports.length} items)</span>
                </div>
            </div>
        </div>
    );
}