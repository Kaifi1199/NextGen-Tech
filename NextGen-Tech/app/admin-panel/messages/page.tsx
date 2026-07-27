"use client";
import ResponsesTable from "../../components/Tables/ResponsesTable";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetch("/api/messages", { cache: "no-store" });
      const result = await response.json();
      setData(result);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="w-full max-w-full py-5">
      <h1 className="text-center mb-5 text-black text-2xl font-semibold">Messages</h1>
      <ResponsesTable data={data} loading={loading} />
    </div>
  );
}
