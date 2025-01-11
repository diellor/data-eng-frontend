import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQueryParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const getQueryParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  return { getQueryParam, setQueryParam };
};

export default useQueryParams;
