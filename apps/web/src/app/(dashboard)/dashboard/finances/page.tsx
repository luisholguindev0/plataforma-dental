import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const startDate = new Date();
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

  const { data: transactionsData, error: transactionsError } = await query;
  if (transactionsError) {
    console.error("Error fetching transactions", transactionsError.message);
  }

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
  const { data: patientsData, error: patientsError } = await supabase
    .from("patients")
    .select("id, full_name, whatsapp_number")
    .order("full_name", { ascending: true });
  if (patientsError) {
    console.error("Error fetching patients (finances)", patientsError.message);
  }

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-primary-200 to-secondary-200 bg-clip-text text-transparent">
            Finanzas
          </h1>
          <p className="text-gray-400">
            Gestiona los ingresos y gastos del consultorio.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-800 text-gray-100 hover:border-primary-400">
            <Download size={18} />
            Exportar
          </Button>
          <Button asChild>
            <Link href="/dashboard/finances/new">
              <Plus size={20} />
              Nueva Transacción
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-[0_30px_70px_-50px_rgba(0,0,0,0.85)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Ingresos</p>
              <p className="text-3xl font-bold text-success-200 mt-1">
                ${totalIncome.toLocaleString("es-CO")}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-success-600/15">
              <TrendingUp size={24} className="text-success-200" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm">
            {Number(incomeChange) >= 0 ? (
              <>
                <ArrowUpRight size={16} className="text-success-300" />
                <span className="text-success-200 font-medium">+{incomeChange}%</span>
              </>
            ) : (
              <>
                <ArrowDownRight size={16} className="text-error-300" />
                <span className="text-error-200 font-medium">{incomeChange}%</span>
              </>
            )}
            <span className="text-gray-500">vs periodo anterior</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-[0_30px_70px_-50px_rgba(0,0,0,0.85)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Gastos</p>
              <p className="text-3xl font-bold text-error-200 mt-1">
                ${totalExpense.toLocaleString("es-CO")}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-error-600/15">
              <TrendingDown size={24} className="text-error-200" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {transactions?.filter((t) => t.type === "expense").length || 0} transacciones
          </div>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-[0_30px_70px_-50px_rgba(0,0,0,0.85)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">Balance Neto</p>
              <p
                className={`text-3xl font-bold mt-1 ${
                  netBalance >= 0 ? "text-primary-100" : "text-error-200"
                }`}
              >
                ${netBalance.toLocaleString("es-CO")}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary-500/15">
              <DollarSign size={24} className="text-primary-100" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Período: {period === "week" ? "Última semana" : period === "month" ? "Último mes" : "Último año"}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          defaultValue={params.period || "month"}
          className="px-4 py-2.5 rounded-xl border border-gray-800 bg-gray-900/70 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="week">Última semana</option>
          <option value="month">Último mes</option>
          <option value="year">Último año</option>
        </select>

        <select
          defaultValue={params.type || "all"}
          className="px-4 py-2.5 rounded-xl border border-gray-800 bg-gray-900/70 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="all">Todos los tipos</option>
          <option value="income">Ingresos</option>
          <option value="expense">Gastos</option>
        </select>

        <select
          defaultValue={params.patient || ""}
          className="px-4 py-2.5 rounded-xl border border-gray-800 bg-gray-900/70 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
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
      <div className="rounded-2xl border border-gray-800 bg-gray-900/70 overflow-hidden shadow-[0_30px_70px_-50px_rgba(0,0,0,0.85)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-950/50 border-b border-gray-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Fecha
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Descripción
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Paciente
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Categoría
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-400">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {transactions && transactions.length > 0 ? (
                transactions.map((trx) => (
                  <tr
                    key={trx.id}
                    className="hover:bg-gray-900 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(trx.transaction_date).toLocaleDateString("es-CO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">
                        {trx.description || "Sin descripción"}
                      </p>
                      {trx.payment_method && (
                        <p className="text-xs text-gray-500">
                          {trx.payment_method}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {trx.patient ? (
                        <Link
                          href={`/dashboard/patients/${trx.patient.id}`}
                          className="hover:text-primary-100"
                        >
                          {trx.patient.full_name || trx.patient.whatsapp_number}
                        </Link>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-lg bg-gray-800 text-xs text-gray-200">
                        {trx.category || "Sin categoría"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`font-semibold ${
                          trx.type === "income" ? "text-success-200" : "text-error-200"
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
                    <DollarSign size={48} className="mx-auto text-gray-700 mb-3" />
                    <p className="text-gray-400">No hay transacciones registradas</p>
                    <Link
                      href="/dashboard/finances/new"
                      className="text-primary-100 hover:text-white font-medium text-sm mt-2 inline-block"
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

