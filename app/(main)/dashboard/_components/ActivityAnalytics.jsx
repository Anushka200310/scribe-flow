"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAnalytics } from "@/actions/analytics";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import AnalyticsLoader from "./AnalyticsLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActivityTrend, getTypesById } from "@/lib/projectActivityTypes";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, parseISO } from "date-fns";

const daysOptions = [
  {
    value: "7d",
    label: "Last 7 days",
  },
  {
    value: "15d",
    label: "Last 15 days",
  },
  {
    value: "30d",
    label: "Last 30 days",
  },
];

const ActivityAnalytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const {
    data: analytics,
    loading,
    fetchData: fetchAnalytics,
  } = useFetch(getAnalytics);

  const { isLoaded } = useUser();

  // console.log(analytics)

  useEffect(() => {
    fetchAnalytics(timeRange);
  }, [timeRange]);

  if (loading || !analytics?.data || !isLoaded) {
    return <AnalyticsLoader />;
  }

  const { timeline, stats } = analytics.data;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium">
            {format(parseISO(label), "MMM d, yyyy")}
          </p>
          <p className="text-orange-600">Average Activity: {payload[0].value}</p>
          <p className="text-blue-600">Entries: {payload[1].value}</p>
        </div>
      );
    }
  };
  

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold gradient-color text-5xl mb-4">Dashboard</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {daysOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-10 space-y-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalEntries}</p>
              <p className="text-xs text-muted-foreground">
                {stats.dailyAverage} entries per day
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.averageScore} / 10</p>
              <p className="text-xs text-muted-foreground">
                Overall activity score
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Activity Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                {getTypesById(stats.mostFrequentActivity)?.emoji}{" "}
                {getActivityTrend(stats.averageScore)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeline}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(date)=> format(parseISO(date), "MMM d")} />
                  <YAxis yAxisId="left" domain={[0, 10]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, "auto"]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="averageScore"
                    stroke="#f97316"
                    activeDot={{ r: 8 }}
                    name="average activity"
                    yAxisId="left"
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="entryCount" stroke="#3b82f6" yAxisId="right" name="Number of Entries" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ActivityAnalytics;
