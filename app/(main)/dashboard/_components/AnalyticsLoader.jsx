import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AnalyticsLoader = () => {
  return (
    <div className="space-y-2 mb-4">
      <Skeleton className="h-12 w-60 mb-4" />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="h-8 w-16 mb-1">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <div className="animate-pulse space-y-4">
              <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg opacity-75" />
              <div>
                <Skeleton className="w-full h-[250px] rounded-lg" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsLoader;
