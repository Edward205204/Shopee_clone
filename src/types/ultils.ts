export default interface ResponseAPI<Data> {
  message: string;
  data: Data;
}

export type NoUndefined<T> = {
  [P in keyof T]-?: NoUndefined<NonNullable<T[P]>>;
};
