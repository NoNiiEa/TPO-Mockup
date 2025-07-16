export interface ReportData {
  CrimeType: string;
  BankCaseID: string;
  user: {
    prefix: string;
    firstName: string;
    lastName: string;
    idCard: string;
    email: string;
    phoneNumber: string;
    phoneCarrier: string;
    birthDate: {
      day: number;
      month: number;
      year: number;
    };
    idCardAddress: Address;
    currentAddress: Address;
  };
  previousAgency: Agency;
  avaliableAgency: Agency;
  crimeTitle: string;
  crimeDescription: string;
  tranfers: Transfer[];
  datetime: Date;
  unit: string;
  amount: number;
  frudDetails: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
}

export interface Address {
  address: string;
  district: string;
  subDistrict: string;
  province: string;
  postalCode: string;
}

export interface Agency {
  province: string;
  agencyName: string;
  agencyType: string;
}

export interface Transfer {
  owner: string;
  accountType: string;
  bankName: string;
  accessNumber: string;
  accountName: string;
}
