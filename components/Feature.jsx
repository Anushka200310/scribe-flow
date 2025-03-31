import { FileText, Activity, FolderKanban, BarChart3, Save } from "lucide-react"

import {  Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: FileText,
    title: "Effortless Entry Management",
    description:
      "Create project entries with a rich text editor, categorize them under collections, and update them anytime.",
  },
  {
    icon: Activity,
    title: "Activity Tracking",
    description: "Log your project activities, including planning, tracking, documentation, and decision-making.",
  },
  {
    icon: FolderKanban,
    title: "Collections for Better Organization",
    description: "Group your project entries into collections for seamless access and better workflow management.",
  },
  {
    icon: BarChart3,
    title: "Insightful Dashboard",
    description:
      "Gain valuable insights into your work with a detailed activity graph and analytics over the last 7, 15, or 30 days.",
  },
  {
    icon: Save,
    title: "Drafts & Auto-Save",
    description: "Save unfinished entries as drafts and pick up where you left off without losing your progress.",
  },
]

export function FeatureSection() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-transparent">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="md:text-6xl sm:text-4xl text-3xl font-bold tracking-tight mb-2 gradient-color">Why Choose Scribe Flow?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Streamline your project documentation and management with our powerful features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="h-full shadow-md hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

