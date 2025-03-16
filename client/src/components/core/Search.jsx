"use client"
import useDebounce from "@/hooks/useDebounce";
import FormControl from "./FormControl";
import { useEffect, useState } from "react";

export default function Search({
  onChange,
  className
}) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(function () {
    if (onChange) onChange(debouncedValue);
  }, [debouncedValue]);

  return <div className={`max-w-[550px] w-full relative ${className}`}>
    <FormControl
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Search..."
      className="[&_.input]:mt-0"
    />
  </div>
}