'use client'
import React, { useEffect, useState } from "react";
import { useReportForm } from "@/contexts/ReportFormContext";
import { useRouter } from "next/navigation";

const SixForm = () => {
    const { reportData, updateReport } = useReportForm()
    const [detailData, setDetaildata] = useState(reportData.frudDetails ? reportData.frudDetails : "");
    const router = useRouter();

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetaildata(e.target.value)
        updateReport({
            ...reportData,
            frudDetails: detailData
        });
    };

    const HandleSubmit = () => {
        router.push('/report/step-seven');
    }

    return (
        <form
        className="bg-gray-100 border border-gray-300 rounded-md p-10 text-black w-full"
        onSubmit={HandleSubmit}
        >
            <h2 className="text-xl font-semibold mb-6">ขั้นตอนที่ 6: ช่องทางติดต่อคนร้าย</h2>

            <div className="mb-6">
                <label className="block font-medium mb-2">รายละเอียดเกี่ยวกับคนร้าย *</label>
                <textarea
                    name="frudDetails"
                    className="textarea w-full bg-white border rounded h-24"
                    placeholder="รายละเอียดเพิ่มเติม เช่น วิธีการหลอกลวง"
                    onChange={(e) => handleOnChange(e)}
                    value={detailData}
                />
            </div>

            <div>
                <label className="block font-medium mb-2">ประเภทช่องทางการติดต่อ (เลือกได้มากกว่า 1 อย่าง)</label>
                <div className="flex gap-4 mt-4">
                    {["เบอร์โทรศัพท์", "SMS", "Social Media / Website", "อื่น ๆ"].map((method) => (
                    <label key={method} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                    />
                    <span>{method}</span>
                     </label>
                    ))}
                </div>
            </div>

            <div className="text-right mt-8">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                    ถัดไป
                </button>
            </div>

        </form>
    );
};

export default SixForm