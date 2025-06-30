'use client';
import { useDebugValue, useEffect, useState } from "react";
import { useReportForm } from '@/contexts/ReportFormContext';
import { useRouter } from 'next/navigation';

const StepFourForm = () => {
    const router = useRouter();

    const { reportData, updateReport } = useReportForm();

    const [havePreviousAgency, setHavePreviousAgency] = useState<boolean>(
        false
    );

    useEffect(() => {
      if (havePreviousAgency === false) {
        setPrevProvince("");
        setPrevAgencyName("");
        setPrevAgencyType("");
        updateReport({
          previousAgency: {
            province: "",
            agencyName: "",
            agencyType: ""
          }
        });
      }
    }, [havePreviousAgency]);

    const [prevProvince, setPrevProvince] = useState(reportData?.previousAgency?.province ?? "");
    const [prevAgencyName, setPrevAgencyName] = useState(reportData?.previousAgency?.agencyName ?? "");
    const [prevAgencyType, setPrevAgencyType] = useState(reportData?.previousAgency?.agencyType ?? "");

    const [availProvince, setAvailProvince] = useState(reportData?.avaliableAgency?.province ?? "");
    const [availAgencyName, setAvailAgencyName] = useState(reportData?.avaliableAgency?.agencyName ?? "");
    const [availAgencyType, setAvailAgencyType] = useState(reportData?.avaliableAgency?.agencyType ?? "");

    const [crimeTitle, setCrimeTitle] = useState(reportData?.crimeTitle ?? "");
    const [crimeDescription, setCrimeDescription] = useState(reportData?.crimeDescription ?? "");

    const updateField = (field: string, value: any) => {
        let newData: any = {};
        switch (field) {
            case "havePreviousAgency":
                newData.havePreviousAgency = value;
                break;
            case "prevProvince":
                newData.previousAgency = { province: value, agencyName: prevAgencyName, agencyType: prevAgencyType };
                break;
            case "prevAgencyName":
                newData.previousAgency = { province: prevProvince, agencyName: value, agencyType: prevAgencyType };
                break;
            case "prevAgencyType":
                newData.previousAgency = { province: prevProvince, agencyName: prevAgencyName, agencyType: value };
                break;
            case "availProvince":
                newData.avaliableAgency = { province: value, agencyName: availAgencyName, agencyType: availAgencyType };
                break;
            case "availAgencyName":
                newData.avaliableAgency = { province: availProvince, agencyName: value, agencyType: availAgencyType };
                break;
            case "availAgencyType":
                newData.avaliableAgency = { province: availProvince, agencyName: availAgencyName, agencyType: value };
                break;
            case "crimeTitle":
                newData.crimeTitle = value;
                break;
            case "crimeDescription":
                newData.crimeDescription = value;
                break;
            default:
                break;
            }
            updateReport(newData);
        };

    const handleSubmit = () => {
        router.push('/report/step-five');
    };

  return (
    <form className="bg-gray-100 border border-gray-300 rounded-md p-10 text-black w-full" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-6">ขั้นตอนที่ 4: เรื่องที่แจ้ง</h2>
      <p className="mb-6 text-lg text-blue-800">
        ท่านเคยไปพบพนักงานสอบสวนในคดีนี้มาแล้วหรือไม่ เลือกหน่วยงาน
      </p>
      <div className="flex gap-8">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="previousAgency"
            value="yes"
            className="radio"
            onChange={() => {
              setHavePreviousAgency(true);
              updateField("havePreviousAgency", true);
            }}
            checked={havePreviousAgency === true}
            required={true}
          />
          <span className="text-lg">เคย</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="previousAgency"
            value="no"
            className="radio"
            onChange={() => {
              setHavePreviousAgency(false);
              updateField("havePreviousAgency", false);
              setPrevProvince("None");
              setPrevAgencyName("None");
              setPrevAgencyType("None");
              updateReport({
                previousAgency: {
                  province: "None",
                  agencyName: "None",
                  agencyType: "None"
                }
              });
            }}
            checked={havePreviousAgency === false}
            required={true}
          />
          <span className="text-lg">ไม่เคย</span>
        </label>
      </div>

      {havePreviousAgency && (
        <div className="mt-6 ml-8 flex flex-col gap-4">
          <label className="block">
            <span className="text-sm">ประเภทหน่วยงาน</span>
            <select
              className="w-full p-2 border rounded"
              value={prevAgencyType}
              onChange={e => {
                setPrevAgencyType(e.target.value);
                updateField("prevAgencyType", e.target.value);
              }}
              required={true}
            >
              <option value="">เลือกประเภท</option>
              <option value="police-station">สถานีตำรวจ</option>
              <option value="tech-investigation">กองบัญชาการตำรวจสืบสวนสอบสวนอาชญากรรมทางเทคโนโลยี</option>
              <option value="central-investigation">กองบัญชาการตำรวจสอบสวนกลาง (ลาดพร้าว)</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm">จังหวัด</span>
            <input
              type="text"
              className={`w-full p-2 border rounded ${prevAgencyType === "central-investigation" ? "bg-gray-200 text-gray-500" : ""}`}
              placeholder="จังหวัด"
              value={prevProvince}
              onChange={e => {
                setPrevProvince(e.target.value);
                updateField("prevProvince", e.target.value);
              }}
              disabled={prevAgencyType === "central-investigation" ? true : false}
              required={true}
            />
          </label>
          <label className="block">
            <span className="text-sm">ชื่อหน่วยงาน</span>
            <input
              type="text"
              className={`w-full p-2 border rounded ${prevAgencyType === "central-investigation" || prevAgencyType == "tech-investigation"? "bg-gray-200 text-gray-500" : ""}`}
              placeholder="ชื่อสถานี"
              value={prevAgencyName}
              onChange={e => {
                setPrevAgencyName(e.target.value);
                updateField("prevAgencyName", e.target.value);
              }}
              disabled={prevAgencyType === "tech-investigation" || prevAgencyType === "central-investigation" ? true : false}
              required={true}
            />
          </label>
        </div>
      )}

      <p className="mb-6 mt-6 text-lg text-blue-800">
        ท่านสะดวกไปพบพนักงานสอบสวนหรือไม่ เลือกหน่วยงาน
      </p>
      <div className="mt-6 flex flex-col gap-4">
        <label className="block">
          <span className="text-sm">ประเภทหน่วยงาน</span>
          <select
            className="w-full p-2 border rounded"
            value={availAgencyType}
            onChange={e => {
              setAvailAgencyType(e.target.value);
              updateField("availAgencyType", e.target.value);
            }}
            required={true}
          >
            <option value="">เลือกประเภท</option>
            <option value="police-station">สถานีตำรวจ</option>
            <option value="tech-investigation">กองบัญชาการตำรวจสืบสวนสอบสวนอาชญากรรมทางเทคโนโลยี</option>
            <option value="central-investigation">กองบัญชาการตำรวจสอบสวนกลาง (ลาดพร้าว)</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm">จังหวัด</span>
          <input
            type="text"
            className={`w-full p-2 border rounded ${availAgencyType === "central-investigation" ? "bg-gray-200 text-gray-500" : ""}`}
            placeholder="จังหวัด"
            value={availProvince}
            onChange={e => {
              setAvailProvince(e.target.value);
              updateField("availProvince", e.target.value);
            }}
            disabled={availAgencyType === "central-investigation"}
            required={true}
          />
        </label>
        <label className="block">
          <span className="text-sm">ชื่อหน่วยงาน</span>
          <input
            type="text"
            className={`w-full p-2 border rounded ${(availAgencyType === "central-investigation" || availAgencyType === "tech-investigation") ? "bg-gray-200 text-gray-500" : ""}`}
            placeholder="ชื่อสถานี"
            value={availAgencyName}
            onChange={e => {
              setAvailAgencyName(e.target.value);
              updateField("availAgencyName", e.target.value);
            }}
            disabled={availAgencyType === "tech-investigation" || availAgencyType === "central-investigation"}
            required={true}
          />
        </label>
      </div>

      <div className="mt-8">
        <div>
          <p className=" text-red-600">
            เรื่องที่ท่านแจ้งจะถูกส่งไปยังหน่วยงานที่เลือกโดยอัตโนมัติ
          </p>
          <div className="mt-2">
            <label className="block text-sm font-medium">
              ประเภทของเรื่องที่แจ้ง<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full p-2 border rounded"
              value={crimeTitle}
              onChange={e => {
                setCrimeTitle(e.target.value);
                updateReport({ crimeTitle: e.target.value });
              }}
              placeholder="ประเภทของเรื่องที่แจ้ง"
              required={true}
            />
          </div>
        </div>

        <div className="mt-4">
          <fieldset className="fieldset">
            <label className="block text-sm font-medium">
              รายละเอียด<span className="text-red-500">*</span>
            </label>
            <textarea
              className="textarea h-24 bg-gray-100 border-black"
              placeholder="รายละเอียด"
              value={crimeDescription}
              onChange={e => {
                setCrimeDescription(e.target.value);
                updateReport({ crimeDescription: e.target.value });
              }}
              required={true}
            />
          </fieldset>
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

export default StepFourForm;
