"use client";
import { useReportForm } from "@/contexts/ReportFormContext";
import { useRouter } from "next/navigation";

const FiveForm = () => {
  const router = useRouter();
  const { reportData, updateReport } = useReportForm();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateReport({ [name]: value });
  };

  const handleTransferInputChange = (index: number, field: string, value: string) => {
    const defaultTransfer = {
      owner: index === 0 ? "ผู้เสียหาย" : "ผู้ร้าย",
      accountType: "",
      bankName: "",
      accessNumber: "",
      accountName: ""
    };
    const transfers = reportData.tranfers ?? [defaultTransfer, { ...defaultTransfer, owner: "ผู้ร้าย" }];
    const newTransfers = [...transfers];
    newTransfers[index] = { ...newTransfers[index], [field]: value };
    updateReport({ tranfers: newTransfers });
  };

  const handleOwnerChange = (value: "victim" | "suspect") => {
    const defaultTransfer = {
      owner: "",
      accountType: "",
      bankName: "",
      accessNumber: "",
      accountName: ""
    };
    const transfers = reportData.tranfers ?? [
      { ...defaultTransfer, owner: "ผู้เสียหาย" },
      { ...defaultTransfer, owner: "ผู้ร้าย" }
    ];
    if (value === "victim") {
      transfers[0].owner = "ผู้เสียหาย";
      transfers[1].owner = "ผู้ร้าย";
    } else {
      transfers[0].owner = "ผู้ร้าย";
      transfers[1].owner = "ผู้เสียหาย";
    }
    updateReport({ tranfers: transfers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/report/step-six");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 border border-gray-300 rounded-md p-10 text-black w-full"
    >
      <h2 className="text-xl font-semibold mb-6">ขั้นตอนที่ 5: ความเสียหาย</h2>

      {/* ประเภทของความเสียหาย */}
      <p className="text-red-600 font-medium mb-2">เลือกประเภทความเสียหาย</p>
      <div className="flex flex-wrap gap-4 mb-6">
        {["เงิน", "ทรัพย์สินอื่นๆ", "ชื่อเสียง", "เงินดิจิทัล"].map((type) => (
          <label key={type} className="flex items-center space-x-2">
            <input
              type="radio"
              name="damageType"
              value={type}
              onChange={handleInputChange}
              className="radio"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-4">รายละเอียดบัญชี</h3>

      <div className="mb-4">
        <label className="block mb-1 font-medium">เส้นทางการโอนเงิน (บัญชีต้นทาง)</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="fromOwner"
              value="victim"
              className="radio"
              checked={reportData.tranfers?.[0]?.owner === "ผู้เสียหาย"}
              onChange={() => handleOwnerChange("victim")}
            />
            ผู้เสียหาย
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="fromOwner"
              value="suspect"
              className="radio"
              checked={reportData.tranfers?.[0]?.owner === "ผู้ร้าย"}
              onChange={() => handleOwnerChange("suspect")}
            />
            ผู้ร้าย
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="accountType"
          placeholder="ประเภทบัญชี"
          value={reportData.tranfers?.[0]?.accountType ?? ""}
          onChange={e => handleTransferInputChange(0, 'accountType', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="bankName"
          placeholder="ธนาคาร"
          value={reportData.tranfers?.[0]?.bankName ?? ""}
          onChange={e => handleTransferInputChange(0, 'bankName', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="accountName"
          placeholder="ชื่อบัญชี"
          value={reportData.tranfers?.[0]?.accountName ?? ""}
          onChange={e => handleTransferInputChange(0, 'accountName', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="accessNumber"
          placeholder="เลขบัญชี"
          value={reportData.tranfers?.[0]?.accessNumber ?? ""}
          onChange={e => handleTransferInputChange(0, 'accessNumber', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 mt-10">
        <input
          type="text"
          name="accountType"
          placeholder="ประเภทบัญชี"
          value={reportData.tranfers?.[1]?.accountType ?? ""}
          onChange={e => handleTransferInputChange(1, 'accountType', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="bankName"
          placeholder="ธนาคาร"
          value={reportData.tranfers?.[1]?.bankName ?? ""}
          onChange={e => handleTransferInputChange(1, 'bankName', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="accountName"
          placeholder="ชื่อบัญชี"
          value={reportData.tranfers?.[1]?.accountName ?? ""}
          onChange={e => handleTransferInputChange(1, 'accountName', e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="accessNumber"
          placeholder="เลขบัญชี"
          value={reportData.tranfers?.[1]?.accessNumber ?? ""}
          onChange={e => handleTransferInputChange(1, 'accessNumber', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm">วันและเวลา</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={reportData.datetime ? reportData.datetime.toISOString().split('T')[0] + 'T' + reportData.datetime.toISOString().split('T')[1] : ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm">มูลค่า</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="amount"
              value={reportData.amount?.toString() ?? ""}
              onChange={handleInputChange}
              className="flex-1 p-2 border rounded"
            />
            <select
              name="unit"
              value={reportData.unit ?? "บาท"}
              onChange={handleInputChange}
              className="w-24 p-2 border rounded"
              required={true}
            >
              <option>บาท</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">รายละเอียดเพิ่มเติม</label>
        <textarea
          name="frudDetails"
          value={reportData.frudDetails ?? ""}
          onChange={handleInputChange}
          className="textarea w-full bg-white border rounded h-24"
          placeholder="รายละเอียดเพิ่มเติม เช่น วิธีการหลอกลวง"
        />
      </div>

      <div className="text-right mt-8">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
          ถัดไป
        </button>
      </div>
    </form>
  );
};

export default FiveForm;
