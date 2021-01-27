
export enum APIMethof {
  GET = 'GET',
  CREATE = 'POST',
  UPDATE = 'PUT',
  DELETE = 'DELETE'
}

export interface IAPIData {
  path: string | null | undefined;
  method: string | undefined;
  description: string | undefined;
}