import { UserPlus, FileEdit, FolderPlus, BarChart3, Edit3 } from "lucide-react"

export default function Steps() {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create an account and Get Started.",
    },
    {
      icon: FileEdit,
      title: "Create an Entry",
      description:
        "Add a project title, choose an activity type, and write detailed notes using the editor.",
    },
    {
      icon: FolderPlus,
      title: "Organize with Collections",
      description: "Save your entries in an existing collection or create a new one.",
    },
    {
      icon: BarChart3,
      title: "Publish & Track Progress",
      description: "Monitor your activity with our structured dashboard.",
    },
    {
      icon: Edit3,
      title: "Edit, Update & Stay on Track",
      description: "Modify entries anytime, delete if needed, and keep your workflow seamless.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-transparent border-t-2">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="md:text-6xl sm:text-4xl text-3xl gradient-color font-bold tracking-tight mb-2">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl text-lg mx-auto">
            Follow these simple steps to organize and track your projects effectively
          </p>
        </div>

        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -translate-y-1/2 z-0" />

          <div className="grid gap-8 lg:grid-cols-5">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-4 h-16 w-16 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-md">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="bg-card rounded-lg p-5 border border-border w-full shadow-sm">
                  <div className="mb-2 flex items-center justify-center">
                    <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

