export interface Result<T> {
  trace: string;
  payload: {
    data: T | T[];
    total?: number;
  };
}
