import { getDailyTip } from "@/actions/public";
import CtaSection from "@/components/cta";
import { FeatureSection } from "@/components/Feature";
import Steps from "@/components/Steps";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const tip = await getDailyTip();
  const words = [
    {
      text: "Scribe",
      className:
        "text-4xl sm:text-5xl md:text-7xl font-extrabold text-blue-500 dark:text-blue-500",
    },
    {
      text: "Flow",
      className:
        "text-4xl sm:text-5xl md:text-7xl font-extrabold text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="relative container mx-auto pb-14 pt-14 px-4">
      <div className="max-w-6xl mx-auto text-center  ">
        <h1 className="text-4xl sm:text-5xl md:text-7xl text-center gradient-color">
        Manage Projects Smarter <br />
          with{" "}
          <span className="text-blue-700 relative inline-block">
            <TypewriterEffectSmooth words={words} />
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-blue-800">
          Scribe Flow streamlines project management by enabling you to create
          structured entries, track activities, and manage decisions in one
          intuitive platform
        </p>

        <div className="flex items-center gap-2 justify-center mt-8 mb-10">
          <Link href={"/scribe/write-new"}>
            <Button className="rounded-full flex items-center gap-2 px-6 py-4 md:px-8 md:py-6">
              Start now
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-100 rounded-full px-6 py-4 md:px-8 md:py-6"
            >
              Learn more
            </Button>
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0  pointer-events-none z-10" />{" "}
          <div className="bg-white rounded-2xl mx-auto max-full p-4 shadow-lg">
            <div className="border-b border-blue-100 flex items-center mb-4 pb-4 justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Tip of the Day</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-200" />
                <div className="h-3 w-3 rounded-full bg-blue-300" />
                <div className="h-3 w-3 rounded-full bg-blue-400" />
              </div>
            </div>
            <div className="p-4 space-y-4">
              <h3 className="text-xl font-semibold text-blue-700">
                {tip ? tip : "My thoughts today"}
              </h3>
              <Skeleton className="rounded-lg w-3/4 bg-blue-100 h-6" />
              <Skeleton className="rounded-lg w-full bg-blue-100 h-6" />
              <Skeleton className="rounded-lg w-2/3 bg-blue-100 h-6" />
            </div>
          </div>
        </div>
      </div>

      <section id="features">
        <FeatureSection />
      </section>
      <Steps />
      <CtaSection />
    </div>
  );
}
