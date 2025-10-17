"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import dayjs from "dayjs";
import type { OperadorResumo } from "@/types/csvTypes";

interface Props {
  operadores: Record<string, OperadorResumo>;
}

/**
 * Gráficos de Eficiência e Tendência
 */
export function PerformanceCharts({ operadores }: Props) {
  // --- Eficiência ---
  const eficienciaData = Object.entries(operadores).map(([nome, o]) => ({
    nome,
    eficiencia: o.concluidos
      ? Number(((1 - o.rechamadas / o.concluidos) * 100).toFixed(1))
      : 0,
  }));

  // --- Tendência (conclusões por dia) ---
  const tendenciaDataMap: Record<string, number> = {};

  Object.values(operadores).forEach((op) => {
    if (op.ticketsConcluidos) {
      op.ticketsConcluidos.forEach((ticket: any) => {
        if (ticket.dataConclusao) {
          const dia = dayjs(ticket.dataConclusao).format("YYYY-MM-DD");
          tendenciaDataMap[dia] = (tendenciaDataMap[dia] || 0) + 1;
        }
      });
    }
  });

  const tendenciaData = Object.entries(tendenciaDataMap)
    .map(([data, concluidos]) => ({ data, concluidos }))
    .sort((a, b) => a.data.localeCompare(b.data));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-8"
    >
      {/* --- Gráfico de Eficiência --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Eficiência por Operador (% de Tickets sem Rechamada)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={eficienciaData.sort((a, b) => b.eficiencia - a.eficiencia)}
            margin={{ left: 40, right: 30, top: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              stroke="#94A3B8"
            />
            <YAxis
              dataKey="nome"
              type="category"
              stroke="#94A3B8"
              width={120}
            />
            <Tooltip formatter={(v) => `${v}%`} />
            <Bar
              dataKey="eficiencia"
              fill="#10B981"
              radius={[0, 6, 6, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* --- Gráfico de Tendência --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Tendência de Conclusões (por Dia)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={tendenciaData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="data" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="concluidos"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
