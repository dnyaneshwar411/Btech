"use client"
import useDebounce from "@/hooks/useDebounce";
import FormControl from "./FormControl";
import { useEffect, useState } from "react";

export default function Search({
  onChange
}) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(function () {
    if (onChange) onChange(debouncedValue);
  }, [debouncedValue]);

  return <div className="relative">
    <FormControl
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="search..."
      className="[&_.input]:mt-0"
    />
  </div>
}