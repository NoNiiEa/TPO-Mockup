'use client';

async function HandleClick() {
    const report = {
    CrimeType: 'Online Scam',
    BankCaseID: 'CASE123456',
    user: {
      prefix: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      idCard: '1234567890123',
      email: 'john@example.com',
      phoneNumber: '0812345678',
      phoneCarrier: 'AIS',
      birthDate: { day: 1, month: 1, year: 1990 },
      idCardAddress: {
        address: '123 Main St',
        district: 'Bangkok Noi',
        subDistrict: 'Arun Amarin',
        province: 'Bangkok',
        postalCode: '10700',
      },
      currentAddress: {
        address: '456 Another St',
        district: 'Dusit',
        subDistrict: 'Dusit',
        province: 'Bangkok',
        postalCode: '10300',
      },
    },
    previousAgency: {
      province: 'Bangkok',
      agencyName: 'Central Police Station',
      agencyType: 'Police',
    },
    avaliableAgency: {
      province: 'Bangkok',
      agencyName: 'Cyber Crime Division',
      agencyType: 'Cyber Police',
    },
    crimeTitle: 'Fraudulent Transfer',
    crimeDescription: 'Scammer tricked user to send money.',
    tranfers: {
      owner: 'Jane Doe',
      accountType: 'Savings',
      bankName: 'Krungthai',
      accessNumber: '123-456-7890',
      accountName: 'Jane Doe',
    },
    datetime: new Date().toISOString(),
    unit: 'Cyber Unit',
    amount: 5000,
    frudDetails: 'The scam was well-planned and deceptive.',
    status: 'pending',
  };

  const response = await fetch('/api/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Report saved successfully:', data);
  } else {
    console.error('Failed to save report:', response.statusText);
  }
}

const TestButton = () => {
  return (
    <button
      onClick={HandleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Submit Test Report
    </button>
  );
}

export default TestButton;