
export const ProjectActivityTypes = {
  GOAL_SETTING: {
    id: "goal_setting",
    label: "Goal Setting & Objectives",
    emoji: "🎯",
    score: 7,
    prompt: "What are the short-term and long-term goals? How will success be measured? What steps are needed to achieve these objectives?",
    imageUrl: "/goal_setting.webp"
  },
  TEAM_COLLABORATION: {
    id: "team_collaboration",
    label: "Team Collaboration & Recognition",
    emoji: "🤝",
    score: 5,
    prompt: "Who deserves recognition? What contributions have been valuable? How can we improve team work?",
    imageUrl: "/team_building.webp"
  },
  PROBLEM_SOLVING: {
    id: "problem_solving",
    label: "Problem Solving & Analysis",
    emoji: "❓",
    score: 6,
    prompt: "What is the problem? What are the possible solutions?",
    imageUrl: "/problem_solving.webp"
  },
  FEEDBACK: {
    id: "feedback",
    label: "Feedback and Reviews",
    emoji: "👂",
    score: 4,
    prompt: "What is the feedback? What can be improved? What is working well?",
    imageUrl: "/feedback.webp"
  },
  TECHNICAL_WORK: {
    id: "technical_work",
    label: "Technical Work & Implementation",
    emoji: "💻",
    score: 8,
    prompt: "What are the technical requirements? What are the implementation details? What are the potential challenges?",
    imageUrl: "/technical.webp"
  },
  PLANNING: {
    id: "planning",
    label: "Project Planning",
    emoji: "📈",
    score: 5,
    prompt: "What are the project goals? What are the tasks? What are the deadlines?",
    imageUrl: "/planning.webp"
  },
  EXECUTION_TRACKING: {
    id: "execution_tracking",
    label: "Project Execution & Tracking",
    emoji: "📊",
    score: 3,
    prompt: "What is the current status of the project? What tasks are in progress? Are we on schedule?",
    imageUrl: "/tracking.webp"
  },
  MEETINGS: {
    id: "meetings",
    label: "Meetings & Communication",
    emoji: "📅",
    score: 4,
    prompt: "What is the purpose of the meeting? What are the key discussion points? What follow-ups are required?",
    imageUrl: "/meetings.webp"
  },
  INNOVATION: {
    id: "innovation",
    label: "Innovation & Ideation",
    emoji: "💡",
    score: 6,
    prompt: "What innovative ideas can enhance the project? Are there creative solutions to overcome current challenges?",
    imageUrl: "/innovation.webp"
  },
  DOCUMENTATION: {
    id: "documentation",
    label: "Documentation & Knowledge Sharing",
    emoji: "📝",
    score: 4,
    prompt: "What key insights, processes, or decisions should be documented for future reference?",
    imageUrl: "/documentation.webp"
  },
  PROJECT_CLOSE_OUT: {
    id: "project_close_out",
    label: "Project Closed Out",
    emoji: "✔",
    score: 6,
    prompt: "Have all deliverables been completed? Has the project been formally closed? Are all documents archived?",
    imageUrl: "/project_close_out.webp"
  }
};


export const getTypesById = (typeId) => {
  return Object.values(ProjectActivityTypes).find((type) => type.id === typeId) || null;
};


export const getActivityTrend = (activityScore) => {
  if (activityScore >= 8) return "Your project activities are progressing with high engagement and efficiency!";
  if (activityScore >= 6) return "You're actively involved in project tasks and maintaining good momentum.";
  if (activityScore >= 4) return "Your activity is steady, but there's room for more engagement.";
  if (activityScore >= 2) return "Your project involvement is low; consider increasing participation to stay on track.";
  return "Project activity is minimal—prioritize key tasks to regain momentum.";
};

  