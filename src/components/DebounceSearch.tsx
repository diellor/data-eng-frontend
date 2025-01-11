import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";

interface DebounceSearchProps {
  placeholder?: string;
  onChange: (value: string) => void;
  delay?: number;
}

const DebounceSearch: React.FC<DebounceSearchProps> = ({
  placeholder = "Search...",
  onChange,
  delay = 500,
}) => {
  const [inputValue, setInputValue] = useState("");

  const debounce = useCallback(
    (callback: (value: string) => void, delay: number) => {
      let timer: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          callback(value);
        }, delay);
      };
    },
    []
  );

  const debouncedChange = useCallback(debounce(onChange, delay), [
    onChange,
    delay,
  ]);

  useEffect(() => {
    debouncedChange(inputValue);
  }, [inputValue, debouncedChange]);

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default DebounceSearch;
