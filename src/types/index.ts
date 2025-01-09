/* eslint-disable @typescript-eslint/no-explicit-any */
export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponse<T> = {
  data: {
    accessToken: any;
    data: any;
    result?: T;
    success: boolean;
    message: string;
  };
  error?: TError;
  isSuccess?: boolean
};

export type TSpendingLimit = {
  name: string;
  limit: number;
};

export interface ISummary {
  _id: string;
  name: string;
  email: string;
  expenses: IExpense[];
  profilePicture: string;
  spendingLimits: SpendingLimit[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePicture: string;
}


export interface IExpense {
  _id: string;
  author: IUser;
  category: string;
  amount: number;
  purpose: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SpendingLimit {
  _id: string;
  name: string;
  limit: number;
}

export interface ICategoryCard {
  name: string;
  limit: number;
  totalItems: number;
  totalSpentAmount: number;
}