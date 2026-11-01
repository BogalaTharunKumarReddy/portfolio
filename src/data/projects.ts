import type { Project } from "@/types";

/**
 * ⚠️  DRAFT CONTENT: verify before sending this to recruiters.
 * Project names are real; the descriptions, feature lists, stacks and case-study
 * text below are drafted from the project names and typical scope. Edit every
 * `TODO(verify)` field so it matches what you actually built. No metrics are
 * claimed on purpose: add real numbers (accuracy, users, load time) only if you have them.
 *
 * Add repository / live URLs under `links` and the matching buttons appear.
 */
export const projects: Project[] = [
  {
    slug: "student-hostel-management-system",
    image: "/projects/student-hostel-management-system.webp",
    title: "Student Hostel Management System",
    tagline: "One place to run hostel rooms, residents, fees and complaints.",
    summary:
      "A web application that replaces paper registers and spreadsheets for hostel administration, covering resident records, room allocation, fee tracking and complaint handling.",
    category: "Full Stack",
    icon: "building",
    accent: "blue",
    status: "Academic project",
    // TODO(verify): the stack you actually used
    stack: ["ReactJS", "MySQL"],
    features: [
      "Resident profiles with room and contact details",
      "Room allocation with live vacancy tracking",
      "Fee records and payment status per student",
      "Complaint and request logging with status updates",
      "Separate views for administrators and students",
    ],
    links: {
      // TODO(edit): github: 'https://github.com/BogalaTharunKumarReddy/<repo>',
    },
    caseStudy: {
      overview:
        "Hostel offices often juggle registers, spreadsheets and messages. This project brings residents, rooms, fees and complaints into a single system with clear screens for both staff and students.",
      problem:
        "Manual record-keeping makes it slow to find who lives where, which rooms are free and which fees are pending. Complaints get lost between messages, and students have no single place to check status.",
      role: "Designed the data model and screens and built the application end to end as an academic project: database, API and interface.",
      approach: [
        {
          title: "Model the domain",
          text: "Identified the core entities (students, rooms, allocations, fees and complaints) and designed relational tables with clear foreign keys.",
        },
        {
          title: "Build the API",
          text: "Exposed CRUD endpoints for each entity with validation, so the interface never has to trust raw input.",
        },
        {
          title: "Design role-based screens",
          text: "Created an admin dashboard for allocation and fees, and a simpler student view for profile and complaint tracking.",
        },
        {
          title: "Test the real workflows",
          text: "Walked through admission, room change, fee payment and complaint resolution to confirm the screens match how a hostel actually works.",
        },
      ],
      challenges: [
        {
          challenge: "Preventing double allocation of a room",
          solution:
            "Checked room capacity and current occupants on the server before saving an allocation, rather than relying on the form.",
        },
        {
          challenge: "Keeping admin and student screens simple",
          solution:
            "Split the interface by role so each user only sees the actions that are relevant to them.",
        },
      ],
      learnings: [
        "Good relational design makes the rest of the application easier to build.",
        "Validation belongs on the server even when the form also validates.",
        "Starting from real user workflows leads to simpler screens than starting from the database.",
      ],
      next: [
        "Notifications for fee due dates",
        "Exportable reports for the hostel office",
        "Automated tests for allocation rules",
      ],
    },
  },
  {
    slug: "campusconnect",
    image: "/projects/campusconnect.webp",
    title: "CampusConnect",
    tagline: "A campus community hub for announcements, events and students.",
    summary:
      "A platform that brings campus life together in one place: announcements, events and student interaction, designed to be quick to scan on a phone.",
    category: "Web",
    icon: "users",
    accent: "cyan",
    status: "Academic project",
    // TODO(verify): the stack you actually used
    stack: ["ReactJS", "JavaScript", "HTML", "CSS"],
    features: [
      "Campus announcements that are easy to scan",
      "Events listing with key details at a glance",
      "Student-focused, mobile-first interface",
      "Clean component-based UI built for reuse",
    ],
    links: {
      // TODO(edit): github: 'https://github.com/BogalaTharunKumarReddy/<repo>',
      // TODO(edit): live: 'https://your-campusconnect.vercel.app',
    },
    caseStudy: {
      overview:
        "Campus information is scattered across notice boards, chat groups and word of mouth. CampusConnect explores a single, friendly place where students can find what is happening and get involved.",
      problem:
        "Students miss events and announcements because the information lives in many places and is hard to search or filter on a phone.",
      role: "Planned the experience, designed the interface and built the frontend with reusable components.",
      approach: [
        {
          title: "Start from the student",
          text: "Listed what students look for first (what is on this week, what changed) and made those the primary screens.",
        },
        {
          title: "Build a component library",
          text: "Created reusable cards, lists and form controls so every screen stays visually consistent.",
        },
        {
          title: "Mobile-first layout",
          text: "Designed for small screens first, then enhanced for larger displays.",
        },
      ],
      challenges: [
        {
          challenge:
            "Showing a lot of information without overwhelming the reader",
          solution:
            "Used clear hierarchy, concise cards and filtering so the most relevant items surface first.",
        },
      ],
      learnings: [
        "Reusable components pay off quickly as the number of screens grows.",
        "Designing mobile-first forces useful prioritisation of content.",
      ],
      next: [
        "User accounts and personalised feeds",
        "Event reminders",
        "Moderation tools for announcements",
      ],
    },
  },
  {
    slug: "customer-churn-prediction-system",
    image: "/projects/customer-churn-prediction-system.webp",
    title: "Customer Churn Prediction System",
    tagline: "Predicting which customers are likely to leave, before they do.",
    summary:
      "A machine learning project that analyses historical customer data to estimate churn risk, helping a business focus retention efforts on the customers who need attention.",
    category: "Machine Learning",
    icon: "chart",
    accent: "teal",
    status: "Academic project",
    // TODO(verify): the libraries you actually used
    stack: ["Data Analysis"],
    features: [
      "Data cleaning and exploratory analysis of customer records",
      "Feature engineering to capture customer behaviour",
      "Training and comparing classification models",
      "Evaluation with precision, recall and F1, not accuracy alone",
    ],
    links: {
      // TODO(edit): github: 'https://github.com/BogalaTharunKumarReddy/<repo>',
    },
    caseStudy: {
      overview:
        "Keeping an existing customer is usually cheaper than winning a new one. This project builds a model that scores customers by churn risk so retention work can be targeted.",
      problem:
        "A business cannot personally follow up with every customer. Without a way to rank customers by risk, retention effort is spread thin or applied too late.",
      role: "Owned the full workflow: cleaning data, engineering features, training and comparing models and interpreting the results.",
      approach: [
        {
          title: "Understand and clean the data",
          text: "Inspected distributions, handled missing and inconsistent values and encoded categorical fields.",
        },
        {
          title: "Engineer useful features",
          text: "Derived features that describe customer behaviour (for example tenure and usage patterns) instead of feeding raw columns only.",
        },
        {
          title: "Train and compare models",
          text: "Tried several classification algorithms and compared them on the same train/test split.",
        },
        {
          title: "Evaluate for the business goal",
          text: "Looked at precision, recall and F1 because churn data is usually imbalanced and plain accuracy can mislead.",
        },
      ],
      challenges: [
        {
          challenge:
            "Imbalanced classes (far fewer churners than loyal customers)",
          solution:
            "Used class-aware evaluation and techniques such as class weighting so the model does not simply predict “no churn” for everyone.",
        },
        {
          challenge: "Avoiding data leakage",
          solution:
            "Split data before fitting transformers and kept preprocessing inside a pipeline.",
        },
      ],
      learnings: [
        "Feature quality usually matters more than switching algorithms.",
        "The right metric depends on the business question, not the default score.",
        "Reproducible pipelines make results easier to trust and to repeat.",
      ],
      next: [
        "Wrap the model in a small prediction interface",
        "Add explainability for individual predictions",
        "Track model performance over time",
      ],
    },
  },
  {
    slug: "sales-performance-analysis",
    image: "/projects/sales-performance-analysis.webp",
    title: "Sales Performance Analysis",
    tagline: "Which regions and months actually drive revenue?",
    summary:
      "An exploratory analysis of retail sales records that stores the data in MySQL, cleans it, and uses charts to show revenue trends by month and region.",
    category: "Data Analysis",
    icon: "chart",
    accent: "blue",
    status: "Data analysis project",
    // TODO(verify): keep only the tools you actually used
    stack: ["MySQL", "Python", "pandas", "Matplotlib"],
    features: [
      "Sales data stored and queried in MySQL",
      "Cleaning of missing and duplicate records",
      "Monthly and regional revenue trends",
      "Charts that answer clear business questions",
    ],
    links: {
      // TODO(edit): github: 'https://github.com/BogalaTharunKumarReddy/<repo>',
    },
    caseStudy: {
      overview:
        "Sales teams collect a lot of transactions but struggle to see the pattern in them. This project turns raw sales records into a few clear views of where and when revenue is made.",
      problem:
        "Raw transaction tables are hard to read. Without grouping by month and region, it is difficult to tell which areas are growing and which need attention.",
      role: "Planned the questions, wrote the SQL queries, cleaned the data and built the charts and written findings.",
      approach: [
        {
          title: "Ask the questions first",
          text: "Listed what the business wants to know (best months, strongest regions) before touching the data.",
        },
        {
          title: "Query and clean",
          text: "Used SQL to group and filter records, then handled duplicates and missing values in pandas.",
        },
        {
          title: "Visualise trends",
          text: "Plotted revenue by month and region so patterns are visible at a glance.",
        },
        {
          title: "Write the findings",
          text: "Summarised what the charts show in plain language for a non-technical reader.",
        },
      ],
      challenges: [
        {
          challenge: "Messy and duplicate rows",
          solution:
            "Checked row counts before and after each cleaning step so nothing was dropped by mistake.",
        },
        {
          challenge: "Choosing the right chart",
          solution:
            "Matched each question to a simple chart type instead of adding more charts.",
        },
      ],
      learnings: [
        "Good questions come before good charts.",
        "SQL grouping does most of the heavy lifting before any plotting.",
        "A chart is only useful if its takeaway can be stated in one sentence.",
      ],
      next: [
        "Add a forecast for the next quarter",
        "Build a small dashboard for the charts",
        "Compare against product categories",
      ],
    },
  },
  {
    slug: "student-performance-analysis",
    image: "/projects/student-performance-analysis.webp",
    title: "Student Performance Analysis",
    tagline: "How do study hours and attendance relate to marks?",
    summary:
      "An exploratory data analysis of student records that looks at how weekly study time and attendance relate to exam marks, with clear charts and written conclusions.",
    category: "Data Analysis",
    icon: "chart",
    accent: "cyan",
    status: "Data analysis project",
    // TODO(verify): keep only the tools you actually used
    stack: ["Python", "pandas", "Matplotlib", "Excel"],
    features: [
      "Cleaning and validating student records",
      "Summary statistics by group",
      "Charts comparing marks against study hours and attendance",
      "Findings written for a non-technical reader",
    ],
    links: {
      // TODO(edit): github: 'https://github.com/BogalaTharunKumarReddy/<repo>',
    },
    caseStudy: {
      overview:
        "Teachers and students often guess what helps results. This project uses data to look at which habits move with higher marks, without claiming that one causes the other.",
      problem:
        "Marks vary widely and it is not obvious which habits matter. Looking at the data by group makes the relationship visible.",
      role: "Cleaned the data, explored it, picked suitable charts and wrote up what the numbers do and do not show.",
      approach: [
        {
          title: "Inspect and clean",
          text: "Checked for missing marks, impossible values and inconsistent labels.",
        },
        {
          title: "Group and summarise",
          text: "Compared average marks across study-hour bands and attendance levels.",
        },
        {
          title: "Visualise",
          text: "Used grouped bar charts and scatter plots to show the relationships.",
        },
        {
          title: "Interpret carefully",
          text: "Wrote conclusions that describe a relationship, not a cause.",
        },
      ],
      challenges: [
        {
          challenge: "Correlation is not causation",
          solution:
            "Worded findings as patterns in this data set and listed other factors that could matter.",
        },
        {
          challenge: "Small groups",
          solution: "Checked group sizes before comparing averages.",
        },
      ],
      learnings: [
        "Checking group sizes avoids misleading averages.",
        "Honest wording matters as much as the chart.",
        "Simple summary tables often explain more than complex plots.",
      ],
      next: [
        "Add more subjects and semesters",
        "Test the relationship with a simple regression",
        "Publish an interactive version",
      ],
    },
  },
  {
    slug: "air-quality-trends-analysis",
    image: "/projects/air-quality-trends-analysis.webp",
    title: "Air Quality Trends Analysis",
    tagline: "Seasonal pollution patterns across city zones.",
    summary:
      "A time-series exploration of air quality readings that compares PM2.5 levels across zones and months to find seasonal peaks and the cleanest and most polluted areas.",
    category: "Data Analysis",
    icon: "chart",
    accent: "teal",
    status: "Data analysis project",
    // TODO(verify): keep only the tools you actually used
    stack: ["Python", "pandas", "Matplotlib"],
    features: [
      "Cleaning of sensor readings with gaps",
      "Monthly averages per zone",
      "Seasonal pattern charts",
      "Comparison across industrial, city and green zones",
    ],
    links: {
      // TODO(edit): github: 'https://github.com/BogalaTharunKumarReddy/<repo>',
    },
    caseStudy: {
      overview:
        "Air quality changes with season and location. This project organises raw readings into monthly averages per zone so the seasonal pattern and the gap between zones are easy to see.",
      problem:
        "Raw sensor readings are noisy and have gaps, so trends are hard to see without cleaning and aggregating them.",
      role: "Cleaned the readings, aggregated them by month and zone and built the comparison charts.",
      approach: [
        {
          title: "Clean the readings",
          text: "Removed impossible values and handled missing readings.",
        },
        {
          title: "Aggregate by month and zone",
          text: "Calculated monthly averages for each zone.",
        },
        {
          title: "Plot the seasons",
          text: "Drew line and bar charts to show winter peaks and monsoon lows.",
        },
        {
          title: "Compare zones",
          text: "Contrasted industrial, city and green-belt areas side by side.",
        },
      ],
      challenges: [
        {
          challenge: "Gaps in the readings",
          solution:
            "Used monthly averages and noted months with little data instead of filling blindly.",
        },
        {
          challenge: "Comparing zones fairly",
          solution: "Used the same scale and time window for every zone.",
        },
      ],
      learnings: [
        "Aggregating time-series data makes noisy readings readable.",
        "Seasonality is easy to miss without a monthly view.",
        "Consistent scales keep comparisons honest.",
      ],
      next: [
        "Add weather data to explain the peaks",
        "Include more pollutants",
        "Build a small dashboard",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;
