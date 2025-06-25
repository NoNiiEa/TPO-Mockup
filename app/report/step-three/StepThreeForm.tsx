"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Address } from "@/types/report";
import { useReportForm } from "@/contexts/ReportFormContext";


const emptyAddress: Address = {
  address: '',
  district: '',
  subDistrict: '',
  province: '',
  postalCode: '',
};

const StepThreeForm = () => {
  const router = useRouter();
  const { reportData, updateReport } = useReportForm();

  const [formData, setFormData] = useState(
    reportData.user || {
      prefix: '',
      firstName: '',
      lastName: '',
      idCard: '',
      email: '',
      phoneNumber: '',
      phoneCarrier: '',
      birthDate: { day: 1, month: 1, year: 2000 },
      idCardAddress: { ...emptyAddress },
      currentAddress: { ...emptyAddress },
    }
  );

  const [sameAddress, setSameAddress] = useState(false);

  useEffect(() => {
    updateReport({
        ...reportData,
        user: {
            ...reportData.user,
            ...formData,
        },
    });
  }, [formData]);

  useEffect(() => {
    if (sameAddress) {
      setFormData((prev) => ({
        ...prev,
        currentAddress: { ...prev.idCardAddress },
      }));
    }
  }, [sameAddress, formData.idCardAddress]);

  const handleCurrentAddressChange = (field: keyof Address, value: string) => {
    if (sameAddress) setSameAddress(false);
    handleAddressChange('currentAddress', field, value);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (addressType: 'idCardAddress' | 'currentAddress', field: keyof Address, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [field]: value,
      },
    }));
  };

    const handleBirthChange = (field: 'day' | 'month' | 'year', value: number) => {
        setFormData((prev) => ({
            ...prev,
            birthDate: {
                ...prev.birthDate,
                [field]: value,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateReport({
            ...reportData,
            user: {
                ...reportData.user,
                ...formData,
            },
        });
        router.push('/report/step-four');
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 border border-gray-300 rounded-md p-10 text-black w-full "
    >
      <h2 className="text-xl font-semibold mb-6">ขั้นตอนที่ 3: ข้อมูลผู้เสียหาย</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full">
        <label className="select w-full">
          <span className="label">Prefix</span>
          <select
            className="input input-md w-full"
            onChange={(e) => handleChange('prefix', e.target.value)}
            value={formData.prefix}
          >
            <option value="">เลือก</option>
            <option>นาย</option>
            <option>นาง</option>
            <option>นางสาว</option>
          </select>
        </label>
        <label className="floating-label w-full">
          <span>IDcard</span>
          <input
            type="text"
            placeholder="1100000000000"
            className="input input-md w-full"
            onChange={(e) => handleChange('idCard', e.target.value)}
            value={formData.idCard}
          />
        </label>
        <label className="floating-label w-full">
          <span>Name</span>
          <input
            type="text"
            placeholder="Thaigern"
            className="input input-md w-full"
            onChange={(e) => handleChange('firstName', e.target.value)}
            value={formData.firstName}
          />
        </label>
        <label className="floating-label w-full">
          <span>Lastname</span>
          <input
            type="text"
            placeholder="Pinta"
            className="input input-md w-full"
            onChange={(e) => handleChange('lastName', e.target.value)}
            value={formData.lastName}
          />
        </label>
        <label className="floating-label w-full">
          <span>Your Email</span>
          <input
            type="email"
            placeholder="mail@site.com"
            className="input input-md w-full"
            onChange={(e) => handleChange('email', e.target.value)}
            value={formData.email}
          />
        </label>
        <label className="floating-label w-full">
          <span>Phonenumber</span>
          <input
            type="text"
            placeholder="0812345678"
            className="input input-md w-full"
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            value={formData.phoneNumber}
          />
        </label>
        <label className="floating-label w-full">
          <span>Birthdate</span>
          <input
            type="date"
            className="input input-md w-full"
            value={
              formData.birthDate.year && formData.birthDate.month && formData.birthDate.day
                ? `${formData.birthDate.year.toString().padStart(4, '0')}-${formData.birthDate.month
                    .toString()
                    .padStart(2, '0')}-${formData.birthDate.day.toString().padStart(2, '0')}`
                : ''
            }
            onChange={e => {
              const [year, month, day] = e.target.value.split('-').map(Number);
              handleBirthChange('year', year);
              handleBirthChange('month', month);
              handleBirthChange('day', day);
            }}
          />
        </label>
        <label className="select w-full">
          <span className="label">Phonecarrier</span>
          <select
            className="input input-md w-full"
            onChange={(e) => handleChange('phoneCarrier', e.target.value)}
            value={formData.phoneCarrier}
          >
            <option value="">เลือก</option>
            <option>AIS</option>
            <option>DTAC</option>
            <option>TRUE</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      <h3 className="font-medium mt-6 mb-2">ที่อยู่ตามบัตรประชาชน</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
        {Object.keys(formData.idCardAddress).map((key) => (
          <label key={`idCard-${key}`} className="floating-label w-full">
            <span>{key}</span>
            <input
              type="text"
              placeholder={key}
              value={formData.idCardAddress[key as keyof Address]}
              onChange={(e) => handleAddressChange('idCardAddress', key as keyof Address, e.target.value)}
              className="input input-md w-full"
            />
          </label>
        ))}
      </div>

      {/* Checkbox for same address */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="sameAddress"
          checked={sameAddress}
          onChange={() => setSameAddress((prev) => !prev)}
          className="mr-2"
        />
        <label htmlFor="sameAddress" className="text-sm">
          ที่อยู่ปัจจุบันเหมือนกับที่อยู่ตามบัตรประชาชน
        </label>
      </div>

      <h3 className="font-medium mt-6 mb-2">ที่อยู่ปัจจุบัน</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
        {Object.keys(formData.currentAddress).map((key) => (
          <label key={`current-${key}`} className="floating-label w-full">
            <span>{key}</span>
            <input
              type="text"
              placeholder={key}
              value={formData.currentAddress[key as keyof Address]}
              onChange={(e) => handleCurrentAddressChange(key as keyof Address, e.target.value)}
              className="input input-md w-full"
              disabled={sameAddress}
            />
          </label>
        ))}
      </div>

      <div className="text-right mt-8">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
          ถัดไป
        </button>
      </div>
    </form>
  );
};

export default StepThreeForm;