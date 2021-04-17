export interface Result<T> {
  trace: string;
  payload: {
    data: T;
  };
}
