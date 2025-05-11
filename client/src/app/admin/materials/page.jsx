"use client";
import { fetchData } from "@/api/server";
import ContentError from "@/components/core/ContentError";
import ContentLoader from "@/components/core/ContentLoader";
import AddMaterialModal from "@/components/pages/materials/AddMaterialModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { truncate } from "@/lib/formatter";
import Link from "next/link";
import useSWR from "swr";

export default function Page() {
  const { isLoading, error, data } = useSWR("materials", () => fetchData("materials"))
  if (isLoading) return <ContentLoader />
  if (error || !data.success) return <ContentError title={error || data.error} />
  const materials = data.data
  return <div className="container mx-auto p-8">
    <div>
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold">Materials</h1>
        <div className="ml-auto flex gap-4">
          <Input placeholder="Search..." className="md:min-w-[350px]" />
          <Button variant="outline">Filter</Button>
        </div>
        <AddMaterialModal />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => <Material
          key={material.material_id}
          className="mx-2"
          material={material}
        />)}
      </div>
    </div>
  </div>
}

function Material({
  material
}) {
  return <Link href={`/admin/materials/${material._id}`}>
    <Card className="bg-[#FAFAFA] hover:bg-gray-50 hover:shadow-lg transition-shadow rounded-none">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{material.name}</CardTitle>
          <Badge variant="outline" className="font-mono text-xs">
            {material.material_id}
          </Badge>
        </div>

        <Badge
          variant={material.availability ? "success" : "destructive"}
          className="mt-1"
        >
          {material.availability ? "Available" : "Unavailable"}
        </Badge>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {truncate(material.description)}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-muted-foreground">Quantity</div>
          <div className="text-sm font-medium text-right">
            {material.quantity_available}
          </div>

          <div className="text-sm text-muted-foreground">Storage Locations</div>
          <div className="text-sm font-medium text-right">
            {material.storage.length}
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
}