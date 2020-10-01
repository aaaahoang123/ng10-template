export interface PayloadAction<T, E = any> {
  payload?: T;
  extra?: E;
  error?: any;
}
