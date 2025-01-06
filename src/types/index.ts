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
};
