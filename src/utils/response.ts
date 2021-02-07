interface IResult<T> {
  code: number;
  errMsg?: string;
  data: T;
}

export const getResponseData = (code: number, data: any, errMsg?: string): IResult<any> => {
  return {
    code,
    errMsg: errMsg || undefined,
    data
  }
}