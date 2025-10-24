import { axiosApi } from "./axios-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const customInstance = <T>(config: any): Promise<T> => {
  return axiosApi(config).then(({ data }) => data);
};

export default customInstance;
