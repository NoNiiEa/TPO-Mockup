"use client";
import { useReportForm } from "@/contexts/ReportFormContext";
import { useRouter } from "next/navigation";
import { HandleSubmitReport } from "../action";

const StepSevenReview = () => {
  const { reportData, resetReport } = useReportForm();
  const router = useRouter()

  const HandleSubmit = async () => {
    const response = await HandleSubmitReport(reportData);
    if (response) {
      alert("ส่งข้อมูลสำเร็จ")
      resetReport();
      localStorage.removeItem('agreement_checked');
    } else {
      alert("ส่งข้อมูลไม่สำเร็จ");
    }
  }

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-md p-10 text-black w-full">
      <h2 className="text-2xl font-semibold mb-6">ขั้นตอนที่ 7: ยืนยันความถูกต้อง</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full">
        {/* ข้อมูลผู้แจ้ง */}
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">ข้อมูลผู้แจ้ง</h3>
          <p>ชื่อ: {reportData.user?.prefix} {reportData.user?.firstName} {reportData.user?.lastName}</p>
          <p>เลขบัตรประชาชน: {reportData.user?.idCard}</p>
          <p>อีเมล: {reportData.user?.email}</p>
          <p>เบอร์โทร: {reportData.user?.phoneNumber} ({reportData.user?.phoneCarrier})</p>
          <p>วันเกิด: {reportData.user?.birthDate?.day}/{reportData.user?.birthDate?.month}/{reportData.user?.birthDate?.year}</p>
        </section>

        {/* หน่วยงานที่เคยแจ้ง */}
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">หน่วยงานที่เคยแจ้ง</h3>
          <p>ประเภท: {reportData.previousAgency?.agencyType}</p>
          <p>จังหวัด: {reportData.previousAgency?.province}</p>
          <p>ชื่อหน่วยงาน: {reportData.previousAgency?.agencyName}</p>
        </section>

        {/* หน่วยงานที่ต้องการแจ้ง */}
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">หน่วยงานที่ต้องการแจ้ง</h3>
          <p>ประเภท: {reportData.avaliableAgency?.agencyType}</p>
          <p>จังหวัด: {reportData.avaliableAgency?.province}</p>
          <p>ชื่อหน่วยงาน: {reportData.avaliableAgency?.agencyName}</p>
        </section>

        {/* รายละเอียดคดี */}
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">รายละเอียดคดี</h3>
          <p>เรื่องที่แจ้ง: {reportData.crimeTitle}</p>
          <p>รายละเอียด: {reportData.crimeDescription}</p>
        </section>

        {/* ความเสียหาย */}
        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">ความเสียหาย</h3>
          <p>มูลค่า: {reportData.amount} {reportData.unit}</p>
          <p>รายละเอียดเพิ่มเติม: {reportData.frudDetails}</p>
        </section>
      </div>

      {/* รายละเอียดบัญชีที่เกี่ยวข้อง */}
      <section className="mb-6">
        <h3 className="text-xl font-bold mb-2">บัญชีที่เกี่ยวข้อง</h3>
        {Array.isArray(reportData.tranfers) && reportData.tranfers.length > 0 ? (
          <div className="space-y-2">
            {reportData.tranfers.map((acc, idx) => (
              <div key={idx} className="border rounded p-2 bg-white">
                <p>เจ้าของบัญชี: {acc.owner}</p>
                <p>ประเภทบัญชี: {acc.accountType}</p>
                <p>ธนาคาร: {acc.bankName}</p>
                <p>เลขบัญชี: {acc.accessNumber}</p>
                <p>ชื่อบัญชี: {acc.accountName}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>ไม่มีข้อมูลบัญชี</p>
        )}
      </section>

      <div className="text-right mt-8">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded" onClick={HandleSubmit}>
          ส่งข้อมูล
        </button>
      </div>
    </div>
  );
};

export default StepSevenReview;