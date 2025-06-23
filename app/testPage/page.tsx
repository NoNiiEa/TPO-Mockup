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

export default function TestPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-black mb-4">Test Page</h1>
            <p className="text-black mb-6">This is a test page to send data to data base.</p>
            <button
                onClick={HandleClick}
                className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
            >
                Click me!
            </button>
        </div>
    );
}