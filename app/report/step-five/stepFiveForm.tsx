"use client";
import { useState } from "react";
import { useReportForm } from "@/contexts/ReportFormContext";
import { useRouter } from "next/navigation";

const FiveForm = () => {
  const router = useRouter();
  const { updateReport } = useReportForm();

  const [fromOwner, setFromOwner] = useState<"victim" | "suspect">("victim");
  const [formData, setFormData] = useState({
    damageType: "",
    transfers: [
      {
        owner: "ผู้เสียหาย",
        accountType: "",
        bankName: "",
        accessNumber: "",
        accountName: "",
      },
      {
        owner: "ผู้ร้าย",
        accountType: "",
        bankName: "",
        accessNumber: "",
        accountName: "",
      },
    ],
    dateTime: "",
    unit: "บาท",
    amount: "",
    frudDetails: "",
  });

  const syncToContext = (updated: typeof formData) => {
    updateReport({
      tranfers: updated.transfers,
      datetime: updated.dateTime ? new Date(updated.dateTime) : undefined,
      unit: updated.unit,
      amount: parseFloat(updated.amount) || 0,
      frudDetails: updated.frudDetails,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      syncToContext(updated);
      return updated;
    });
  };

  const handleTransferChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedTransfers = [...prev.transfers];
      updatedTransfers[index] = { ...updatedTransfers[index], [name]: value };
      const updated = { ...prev, transfers: updatedTransfers };
      syncToContext(updated);
      return updated;
    });
  };

  const handleOwnerChange = (value: "victim" | "suspect") => {
    setFromOwner(value);
    setFormData((prev) => {
      const updated = {
        ...prev,
        transfers: [
          {
            ...prev.transfers[0],
            owner: value === "victim" ? "ผู้เสียหาย" : "ผู้ร้าย",
          },
          {
            ...prev.transfers[1],
            owner: value === "victim" ? "ผู้ร้าย" : "ผู้เสียหาย",
          },
        ],
      };
      syncToContext(updated);
      return updated;
    });
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
              checked={formData.damageType === type}
              onChange={handleInputChange}
              className="radio"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      {/* รายละเอียดบัญชี */}
      <h3 className="text-lg font-semibold mb-4">รายละเอียดบัญชี</h3>

      {/* From Account Owner */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">เส้นทางการโอนเงิน (บัญชีต้นทาง)</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="fromOwner"
              value="victim"
              className="radio"
              checked={fromOwner === "victim"}
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
              checked={fromOwner === "suspect"}
              onChange={() => handleOwnerChange("suspect")}
            />
            ผู้ร้าย
          </label>
        </div>
      </div>

      {/* From Account */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="accountType"
          placeholder="ประเภทบัญชี"
          value={formData.transfers[0].accountType}
          onChange={(e) => handleTransferChange(0, e)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="bankName"
          placeholder="ธนาคาร"
          value={formData.transfers[0].bankName}
          onChange={(e) => handleTransferChange(0, e)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="accountName"
          placeholder="ชื่อบัญชี"
          value={formData.transfers[0].accountName}
          onChange={(e) => handleTransferChange(0, e)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="accessNumber"
          placeholder="เลขบัญชี"
          value={formData.transfers[0].accessNumber}
          onChange={(e) => handleTransferChange(0, e)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* To Account */}
      <div className="grid grid-cols-2 gap-4 mb-4 mt-10">
        <input
          type="text"
          name="accountType"
          placeholder="ประเภทบัญชี"
          value={formData.transfers[1].accountType}
          onChange={(e) => handleTransferChange(1, e)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="bankName"
          placeholder="ธนาคาร"
          value={formData.transfers[1].bankName}
          onChange={(e) => handleTransferChange(1, e)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="accountName"
          placeholder="ชื่อบัญชี"
          value={formData.transfers[1].accountName}
          onChange={(e) => handleTransferChange(1, e)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="accessNumber"
          placeholder="เลขบัญชี"
          value={formData.transfers[1].accessNumber}
          onChange={(e) => handleTransferChange(1, e)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Value + Date */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm">วันและเวลา</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
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
              value={formData.amount}
              onChange={handleInputChange}
              className="flex-1 p-2 border rounded"
            />
            <select
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              className="w-24 p-2 border rounded"
            >
              <option>บาท</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fraud Details */}
      <div className="mt-4">
        <label className="block text-sm font-medium">รายละเอียดเพิ่มเติม</label>
        <textarea
          name="frudDetails"
          value={formData.frudDetails}
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
