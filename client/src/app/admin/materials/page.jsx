"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { truncate } from "@/lib/formatter";
import { getMaterials } from "@/lib/mock";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [query, setQuery] = useState("");
  const [materials, setMaterials] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(function () {
    (async function () {
      try {
        const { success, data, message } = await getMaterials(query, page, 10);
        if (!success) throw new Error(message);
        setMaterials(data);
      } catch (error) {
        toast.error(error.message || "Internal Server Error!");
      }
    })();
  }, [query, page]);

  return <div className="container mx-auto p-8">
    <div>
      <h2 className="text-3xl font-bold tracking-tight">Materials</h2>
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
  return <Card className="bg-[#FAFAFA] hover:bg-gray-50 hover:shadow-lg transition-shadow rounded-none">
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
}