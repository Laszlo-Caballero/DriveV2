import { useEffect, useState } from "react";

interface QueryProps<T> {
  dependencies?: unknown[];
  queryFn: () => Promise<T>;
}

export function useQuery<T>({ queryFn, dependencies }: QueryProps<T>) {
  const [fetch, setFetch] = useState<{
    isLoading: boolean;
    data?: T;
    isError: boolean;
    error: string;
  }>({ isError: false, isLoading: true, error: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await queryFn();
        setFetch({ isLoading: false, data, isError: false, error: "" });
      } catch (error: unknown) {
        setFetch({ isLoading: false, isError: true, error: String(error) });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(dependencies || [])]);

  return {
    ...fetch,
  };
}
