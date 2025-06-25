'use client';
import { useRouter } from 'next/navigation';
import { useReportForm } from '@/contexts/ReportFormContext';
import { useState, useEffect } from 'react';

export default function StepOneForm() {
    const router = useRouter();
    const {reportData, updateReport} = useReportForm();
    const [DamageType, setDamageType] = useState('');

    useEffect(() => {
        if (reportData.CrimeType) {
            setDamageType(reportData.CrimeType);
        }
    }, [reportData]);

    const HandleOnSubit = () => {
        updateReport({ CrimeType: DamageType });
        router.push('/report/step-two');
    }
    return (
        <form
            onSubmit={HandleOnSubit}
            className="bg-gray-100 border border-gray-300 rounded-md p-10 text-black mx-auto mt-10"
        >
            <p className="mb-6 text-lg">กรุณาเลือกประเภทความเสียหายที่เกี่ยวข้อง</p>

            <div className="flex justify-center gap-8 mb-6">
                {['เงิน', 'ทรัพย์สินอื่น ๆ', 'อันตราย', 'Cryptocurrency'].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="damageType"
                            value={item}
                            checked={DamageType === item}
                            onChange={() => setDamageType(item)}
                            required
                        />
                        <span>{item}</span>
                    </label>
                ))}
            </div>

            <div className="text-right">
                <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded"
                >
                    ถัดไป
                </button>
            </div>
        </form>
    );
};