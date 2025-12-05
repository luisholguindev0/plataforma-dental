import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
} from "lucide-react";

interface FinancesPageProps {
  searchParams: Promise<{
    type?: string;
    patient?: string;
    period?: string;
  }>;
}

export default async function FinancesPage({ searchParams }: FinancesPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Calculate date range based on period
  const now = new Date();
  let startDate = new Date();
  const period = params.period || "month";

  if (period === "week") {
    startDate.setDate(now.getDate() - 7);
  } else if (period === "month") {
    startDate.setMonth(now.getMonth() - 1);
  } else if (period === "year") {
    startDate.setFullYear(now.getFullYear() - 1);
  }

  // Get transactions
  let query = supabase
    .from("transactions")
    .select("*, patient:patients(id, full_name, whatsapp_number)")
    .gte("transaction_date", startDate.toISOString().split("T")[0])
    .order("transaction_date", { ascending: false });

  if (params.type && params.type !== "all") {
    query = query.eq("type", params.type);
  }

  if (params.patient) {
    query = query.eq("patient_id", params.patient);
  }

  const { data: transactionsData } = await query;

  const transactions = (transactionsData || []) as Array<{
    id: string;
    type: "income" | "expense";
    amount: number;
    category: string | null;
    description: string | null;
    transaction_date: string;
    payment_method: string | null;
    patient: {
      id: string;
      full_name: string | null;
      whatsapp_number: string;
    } | null;
  }>;

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netBalance = totalIncome - totalExpense;

  // Get patients for filter
  const { data: patientsData } = await supabase
    .from("patients")
    .select("id, full_name, whatsapp_number")
    .order("full_name", { ascending: true });

  const patients = (patientsData || []) as Array<{
    id: string;
    full_name: string | null;
    whatsapp_number: string;
  }>;

  // Get previous period data for comparison
  const prevStartDate = new Date(startDate);
  if (period === "week") {
    prevStartDate.setDate(prevStartDate.getDate() - 7);
  } else if (period === "month") {
    prevStartDate.setMonth(prevStartDate.getMonth() - 1);
  } else {
    prevStartDate.setFullYear(prevStartDate.getFullYear() - 1);
  }

  const { data: prevTransactionsData } = await supabase
    .from("transactions")
    .select("amount, type")
    .gte("transaction_date", prevStartDate.toISOString().split("T")[0])
    .lt("transaction_date", startDate.toISOString().split("T")[0]);

  const prevTransactions = (prevTransactionsData || []) as Array<{
    type: "income" | "expense";
    amount: number;
  }>;

  const prevIncome = prevTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const incomeChange = prevIncome > 0 
    ? ((totalIncome - prevIncome) / prevIncome * 100).toFixed(1)
    : "0";

  const categories = [
    "Tratamiento",
    "Valoración",
    "Radiografía",
    "Materiales",
    "Nómina",
    "Servicios",
    "Marketing",
    "Otros",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--color-primary)]">
            Finanzas
          </h1>
          <p className="text-[var(--color-gray-600)]">
            Gestiona los ingresos y gastos del consultorio.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline inline-flex">
            <Download size={18} />
            Exportar
          </button>
          <Link href="/dashboard/finances/new" className="btn btn-primary inline-flex">
            <Plus size={20} />
            Nueva Transacción
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-500)]">Ingresos</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                ${totalIncome.toLocaleString("es-CO")}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm">
            {Number(incomeChange) >= 0 ? (
              <>
                <ArrowUpRight size={16} className="text-green-500" />
                <span className="text-green-500 font-medium">+{incomeChange}%</span>
              </>
            ) : (
              <>
                <ArrowDownRight size={16} className="text-red-500" />
                <span className="text-red-500 font-medium">{incomeChange}%</span>
              </>
            )}
            <span className="text-[var(--color-gray-400)]">vs periodo anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-500)]">Gastos</p>
              <p className="text-3xl font-bold text-red-600 mt-1">
                ${totalExpense.toLocaleString("es-CO")}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-red-100">
              <TrendingDown size={24} className="text-red-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-[var(--color-gray-400)]">
            {transactions?.filter((t) => t.type === "expense").length || 0} transacciones
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-gray-500)]">Balance Neto</p>
              <p
                className={`text-3xl font-bold mt-1 ${
                  netBalance >= 0 ? "text-[var(--color-primary)]" : "text-red-600"
                }`}
              >
                ${netBalance.toLocaleString("es-CO")}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[var(--color-primary)]/10">
              <DollarSign size={24} className="text-[var(--color-primary)]" />
            </div>
          </div>
          <div className="mt-4 text-sm text-[var(--color-gray-400)]">
            Período: {period === "week" ? "Última semana" : period === "month" ? "Último mes" : "Último año"}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          defaultValue={params.period || "month"}
          className="px-4 py-2.5 bg-white border border-[var(--color-gray-200)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          <option value="week">Última semana</option>
          <option value="month">Último mes</option>
          <option value="year">Último año</option>
        </select>

        <select
          defaultValue={params.type || "all"}
          className="px-4 py-2.5 bg-white border border-[var(--color-gray-200)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          <option value="all">Todos los tipos</option>
          <option value="income">Ingresos</option>
          <option value="expense">Gastos</option>
        </select>

        <select
          defaultValue={params.patient || ""}
          className="px-4 py-2.5 bg-white border border-[var(--color-gray-200)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          <option value="">Todos los pacientes</option>
          {patients?.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.full_name || patient.whatsapp_number}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-gray-50)] border-b border-[var(--color-gray-200)]">
                <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--color-gray-600)]">
                  Fecha
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--color-gray-600)]">
                  Descripción
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--color-gray-600)]">
                  Paciente
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-[var(--color-gray-600)]">
                  Categoría
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-[var(--color-gray-600)]">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-gray-100)]">
              {transactions && transactions.length > 0 ? (
                transactions.map((trx) => (
                  <tr
                    key={trx.id}
                    className="hover:bg-[var(--color-gray-50)] transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-[var(--color-gray-600)]">
                      {new Date(trx.transaction_date).toLocaleDateString("es-CO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[var(--color-gray-800)]">
                        {trx.description || "Sin descripción"}
                      </p>
                      {trx.payment_method && (
                        <p className="text-xs text-[var(--color-gray-500)]">
                          {trx.payment_method}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-gray-600)]">
                      {trx.patient ? (
                        <Link
                          href={`/dashboard/patients/${trx.patient.id}`}
                          className="hover:text-[var(--color-primary)]"
                        >
                          {trx.patient.full_name || trx.patient.whatsapp_number}
                        </Link>
                      ) : (
                        <span className="text-[var(--color-gray-400)]">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-[var(--color-gray-100)] rounded-lg text-xs text-[var(--color-gray-600)]">
                        {trx.category || "Sin categoría"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-semibold ${
                          trx.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {trx.type === "income" ? "+" : "-"}$
                        {Number(trx.amount).toLocaleString("es-CO")}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <DollarSign
                      size={48}
                      className="mx-auto text-[var(--color-gray-300)] mb-3"
                    />
                    <p className="text-[var(--color-gray-500)]">
                      No hay transacciones registradas
                    </p>
                    <Link
                      href="/dashboard/finances/new"
                      className="text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] font-medium text-sm mt-2 inline-block"
                    >
                      Registrar primera transacción →
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

