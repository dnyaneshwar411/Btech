"use client";
import Search from "@/components/core/Search";
import Table from "@/components/core/table/Table";
import { useState } from "react";

export default function Page() {
  const [query, setQuery] = useState("");

  return <div>
    <Search onChange={(value) => setQuery(value)} />
    <Table />
    <ul className="list-disc">
      <li>create a job</li>
      <li>list of jobs</li>
      <li>on board a client</li>
      <li>search bar</li>
    </ul>
  </div>
}