"use server"

import { tips } from "@/lib/Tips";
import { unstable_cache } from "next/cache";


export const getDailyTip = unstable_cache(
    async () => {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      return randomTip;
    },
    ["daily-tip"],
    { revalidate: 86400 } // 24 hours = 86400 seconds
  );
