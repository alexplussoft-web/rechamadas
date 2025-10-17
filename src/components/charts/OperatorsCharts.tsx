"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { OperadorResumo } from "@/types/csvTypes";

interface Props {
  operadores: Record<string, OperadorResumo>;
}

export function OperatorsCharts({ operadores }: Props) {
  const data = Object.entries(operadores).map(([nome, o]) => ({
    nome,
    concluidos: o.concluidos,
    rechamadas: o.rechamadas,
  }));

  const totalConcluidos = data.reduce((a, b) => a + b.concluidos, 0);
  const totalRechamadas = data.reduce((a, b) => a + b.rechamadas, 0);

  const pieData = [
    { name: "Concluídos", value: totalConcluidos },
    { name: "Rechamadas", value: totalRechamadas },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8"
    >
      {/* Gráfico de Barras */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Rechamadas por Operador
        </h2>
        <ResponsiveContainer width="100%" height={300} className="text-sm">
          <BarChart data={data} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="nome"
              stroke="#94A3B8"
              angle={-15}
              textAnchor="end"
              interval={0}
            />
            <YAxis stroke="#94A3B8" />
            <Tooltip />
            <Legend verticalAlign="top" align="center" layout="horizontal" />
            <Bar
              dataKey="concluidos"
              fill="#10B981"
              name="Concluídos"
              barSize={20}
            />
            <Bar
              dataKey="rechamadas"
              fill="#EF4444"
              name="Rechamadas"
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Pizza */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Proporção Geral
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(1)}%`
              }
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
