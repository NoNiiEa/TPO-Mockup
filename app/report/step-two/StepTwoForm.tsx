'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const statements = [
  '1. ยอมรับว่าการแจ้งความนี้มีวัตถุประสงค์เพื่อขอรับความช่วยเหลือหรือปรึกษา และมิได้หวังให้เป็นการดำเนินคดีทางกฎหมาย',
  '2. ยอมรับว่าการแจ้งความนี้อาจไม่สามารถดำเนินคดีหรือกู้คืนทรัพย์ได้ทุกกรณี ทำให้ได้รับความเสียหาย',
  '3. ยินยอมให้เปิดเผยและนำข้อมูลที่แจ้งไปใช้ในการสืบสวนสอบสวนคดีและดำเนินคดีที่เกี่ยวข้อง',
  '4. การแจ้งความผ่านระบบออนไลน์นี้ จะส่งไปให้เจ้าหน้าที่พนักงานสอบสวนตรวจสอบ',
  '5. กระบวนการพิจารณาจะใช้ระยะเวลาดำเนินการ และเจ้าหน้าที่จะติดต่อกลับภายใน 72 ชั่วโมง',
  '6. ข้อยอมที่แจ้งทั้งหมดจะถูกบันทึกไว้ในระบบ และใช้ประกอบการช่วยเหลือ',
];

const LOCAL_STORAGE_KEY = 'agreement_checked';

const AgreementForm = () => {
    const router = useRouter();
    const [checked, setChecked] = useState<boolean[]>(Array(statements.length).fill(false));

    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length === statements.length) {
                    setChecked(parsed);
                }
            } catch {}
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checked));
    }, [checked]);

    const isAllChecked = checked.every(Boolean);

    const handleChange = (index: number) => {
        const updated = [...checked];
        updated[index] = !updated[index];
        setChecked(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAllChecked) {
            alert('กรุณายอมรับข้อตกลงทั้งหมดก่อนดำเนินการต่อ');
            return;
        }
        router.push('/report/step-three');   
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 border border-gray-300 rounded-md p-10 text-black mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-6">ขั้นตอนที่ 2 ข้อยอมรับ</h2>

            <div className="space-y-4 mb-6">
                {statements.map((text, index) => (
                <label key={index} className="flex items-start space-x-2">
                    <input
                        type="checkbox"
                        checked={checked[index]}
                        onChange={() => handleChange(index)}
                        className="mt-1"
                    />
                    <span className="text-sm leading-6">{text}</span>
                </label>
                ))}
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="submit"
                    className={`px-6 py-2 rounded text-white ${
                        isAllChecked ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!isAllChecked}
                >
                    ยอมรับ
                </button>
            </div>
        </form>
    );
};

export default AgreementForm;
