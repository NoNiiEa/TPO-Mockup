export default function TrackStatusPage() {
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
                            <th className="p-2">Date</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Details</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">2025-06-25</td>
                            <td className="p-2">In Progress</td>
                            <td className="p-2">Processing...</td>
                            <td className="p-2">View</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <span>10 20 50</span>
                    <span>Page 1 of 1 (1 items)</span>
                </div>
            </div>
        </div>
    );
}