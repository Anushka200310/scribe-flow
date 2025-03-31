"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getAnalytics(timeRange = "7d") {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  const startDate = new Date();
  switch (timeRange) {
    case "7d":
      startDate.setDate(startDate.getDate() - 7);
      break;
    case "15d":
      startDate.setDate(startDate.getDate() - 15);
      break;
    case "30d":
    default:
      startDate.setDate(startDate.getDate() - 30);
      break;
  }

  const entries = await db.entry.findMany({
    where: {
      userId: user.id,
      createdAt: {
        gte: startDate,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const activityTypeData = entries.reduce((acc, entry) => {
    const date = entry.createdAt.toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = {
        totalScore: 0,
        count: 0,
        entries: [],
      };
    }

    acc[date].totalScore += entry.activityTypeScore;
    acc[date].count += 1;
    acc[date].entries.push(entry);

    return acc;
  }, {});

  const analyticsData = Object
    .entries(activityTypeData)
    .map(([date, data]) => ({
      date,
      averageScore: Number((data.totalScore / data.count).toFixed(1)),
      entryCount: data.count,
    }));

  const overallStats = {
    totalEntries: entries.length,
    averageScore: Number(
      (
        entries.reduce((acc, entry) => acc + entry.activityTypeScore, 0) /
        entries.length
      ).toFixed(1)
    ),

    mostFrequentActivity: Object.entries(
      entries.reduce((acc, entry) => {
        acc[entry.activityType] = (acc[entry.activityType] || 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0]?.[0],

    dailyAverage: Number(
      (
        entries.length / (timeRange === "7d" ? 7 : timeRange === "15d" ? 15 : 30)

      ).toFixed(1)
    )
  };

  return {
    success: true,
    data: {
      timeline: analyticsData,
      stats: overallStats,
    },
  }
}
