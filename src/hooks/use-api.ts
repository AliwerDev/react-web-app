import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { api } from "../services/api";

interface UseApiResponse<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
}

const useApi = <T>(url: string, enable = true): UseApiResponse<T> => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (!enable) return;
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response: AxiosResponse<T> = await api.get(url);
        console.log(response.data);

        setData(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [enable, url]);

  return { data, isLoading, isError };
};

export default useApi;
