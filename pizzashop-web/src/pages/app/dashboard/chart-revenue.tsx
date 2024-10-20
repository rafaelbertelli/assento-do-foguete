import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import colors from "tailwindcss/colors";

const data = [
  { date: "10/12", revenue: 1200 },
  { date: "11/12", revenue: 1100 },
  { date: "12/12", revenue: 900 },
  { date: "13/12", revenue: 1700 },
  { date: "14/12", revenue: 2300 },
  { date: "15/12", revenue: 3300 },
  { date: "16/12", revenue: 1300 },
  { date: "17/12", revenue: 1100 },
];

export function ChartRevenuel() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart style={{ fontSize: 12 }} data={data}>
            <YAxis
              stroke="#888"
              width={80}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Tooltip />
            <Line
              type="linear"
              strokeWidth="2"
              dataKey="revenue"
              stroke={colors.violet[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
