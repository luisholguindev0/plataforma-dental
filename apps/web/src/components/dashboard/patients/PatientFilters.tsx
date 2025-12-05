"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";

export default function PatientFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = (value: string) => {
    setSearch(value);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.delete("page");
      router.push(`/dashboard/patients?${params.toString()}`);
    });
  };

  const handleStatusFilter = (status: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (status && status !== "all") {
        params.set("status", status);
      } else {
        params.delete("status");
      }
      params.delete("page");
      router.push(`/dashboard/patients?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none"
        />
        <Input
          type="text"
          placeholder="Buscar por nombre, teléfono o email..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2">
        <Filter size={20} className="text-gray-400" />
        <select
          value={searchParams.get("status") || "all"}
          onChange={(e) => handleStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="all">Todos los estados</option>
          <option value="qualified">Calificados</option>
          <option value="pending">Pendientes</option>
          <option value="not_qualified">No Calificados</option>
        </select>
      </div>
    </div>
  );
}
