"use client";
import { getJobs } from "@/lib/mock";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formatter";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const jobTypes = [
  { id: 1, name: "Listed", value: "listed" },
  { id: 2, name: "Admin Approval", value: "admin-approval" },
  { id: 3, name: "Production", value: "in-production" },
  { id: 4, name: "Quality Control", value: "in-quality" },
  { id: 5, name: "Invoice Ready", value: "in-invoice" }
];

export default function Page() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(function () {
    (async function () {
      try {
        const { success, data, message } = await getJobs(query);
        if (!success) throw new Error(message);
        setJobs(data);
      } catch (error) {
        toast.error(error.message || "Internal Server Error!");
      }
    })();
  }, [query]);

  return <div className="container mx-auto p-8">

    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Jobs</h1>
      <div className="flex gap-4">
        <Input placeholder="Search..." className="md:min-w-[350px]" />
        <Button variant="outline">Filter</Button>
      </div>
    </div>
    <div>
      <Tabs defaultValue="listed" className="space-y-4 mt-4">
        <div className="overflow-x-auto scrollbar-hide">
          <TabsList className="px-4 py-1 rounded-none">
            {jobTypes.map((type) => <TabsTrigger
              key={type.id}
              value={type.value}
              className="mx-2 rounded-none"
            >
              {type.name}
            </TabsTrigger>)}
          </TabsList>
        </div>
        {jobTypes.map((type) => <TabsContentJobs
          key={type.id}
          value={type.value}
          className="mx-2"
          jobs={jobs}
        />)}
      </Tabs>
    </div>
  </div>
}

function TabsContentJobs({
  value,
  jobs
}) {
  const filteredJobs = jobs.filter(job => job.stage === value)
  return <TabsContent value={value} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredJobs.map((job) => <Job
        key={job.job_id}
        job={job}
      />)}
    </div>
  </TabsContent>
}

function Job({
  job
}) {
  const expenses = job.company_expense.reduce((acc, expense) => expense.amount + acc, 0);
  return <Card key={job.id} className="bg-[#FAFAFA] hover:bg-gray-50 hover:shadow-lg transition-shadow rounded-none">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg">{job.requested_by.name}</CardTitle>
        <Badge variant="outline" className="font-mono text-xs">
          {job.job_id}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-muted-foreground">Company Expense</div>
          <div className="text-sm font-medium text-right">{formatCurrency(expenses)}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-muted-foreground">Sale Amount</div>
          <div className="text-sm font-medium text-right">{formatCurrency(job.sale_amount)}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-muted-foreground">Profit</div>
          <div className="text-sm font-medium text-right text-green-600">
            {formatCurrency(job.sale_amount - expenses)}
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="pt-2 text-xs text-muted-foreground">
      Created {formatDistanceToNow(job.createdAt, { addSuffix: true })}
    </CardFooter>
  </Card>
}