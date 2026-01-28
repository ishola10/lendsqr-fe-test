export interface User {
  id: string;
  orgName?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string | number;
  createdAt?: string;
  lastActiveDate?: string;
  status?: string;
  profile?: {
    fullName: string;
    phoneNumber?: string;
    email?: string;
    bvn?: string;
    gender: string;
    maritalStatus: string;
    children: string | number;
    residence: string;
    avatar?: string;
  };
  education?: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: number[];
    loanRepayment: number | string;
  };
  socials?: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor?: {
    fullName: string;
    phoneNumber: string | number;
    email: string;
    relationship: string;
  };
  account?: {
    bank: string;
    accountNumber: string | number;
    balance: number;
    currency?: string;
  };
  organization?: string;
  username?: string;
  dateJoined?: string;
}
