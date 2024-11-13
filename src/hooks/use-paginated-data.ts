import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { api } from "../services/api";

type Data = Record<string, any>;

// Interface for the paginated response from the backend
interface PaginatedResponse<T> {
  totalPages: number;
  page: number;
  size: number;
  totalElements: number;
  content: T[];
  hasPrevious: boolean;
  hasNext: boolean;
}

// Custom hook
const usePaginatedData = (apiUrl: string, pageSize: number = 10) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  const page: number = parseInt(searchParams.get("page") || "0", 10);
  const size: number = parseInt(searchParams.get("size") || String(pageSize), 10);

  // Cache for paginated data using useMemo
  const cache = useMemo(() => new Map<number, Data[]>(), []);

  useEffect(() => {
    const fetchData = async () => {
      // Check cache first
      if (cache.has(page)) {
        setData(cache.get(page) || []);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await api.get<PaginatedResponse<Data>>(apiUrl, {
          params: { page, size },
        });
        const result = response.data;

        setData(result.content);
        setTotalPages(result.totalPages);

        // Store data in cache
        cache.set(page, result.content);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, page, size, cache]);

  const updatePage = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), size: size.toString() });
  };

  const updateSize = (newSize: number) => {
    setSearchParams({ page: page.toString(), size: newSize.toString() });
  };

  useEffect(() => {
    if (!searchParams.get("page")) updatePage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clear cache function
  const clearCache = () => {
    cache.clear();
    setData([]);
  };

  return {
    data,
    loading,
    error,
    page,
    size,
    totalPages,
    setPage: updatePage,
    setSize: updateSize,
    clearCache,
  };
};

export default usePaginatedData;
