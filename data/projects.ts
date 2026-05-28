export interface Project {
  id: string;
  name: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  tags: string[];
  size: "large" | "medium";
}

export const projects: Project[] = [
  {
    id: "chicken-coop",
    name: "Home Chicken Coop Optimizations",
    period: "May 2025 – May 2026",
    location: "Conroe, TX",
    description:
      "Modular feed/water infrastructure for 100+ livestock — designed to last, easy to clean, built to last.",
    bullets: [
      "Built a modular feeding and watering system enabling easy disassembly for cleaning, extending overall longevity.",
      "Engineered a centralized water distribution system for 100+ livestock using off-the-shelf components with simple refilling.",
      "Designed and 3D-printed a precision feed-dispenser in SolidWorks, reducing physical labor for quail feeding by up to 50%.",
    ],
    tags: ["SOLIDWORKS", "3D-PRINT", "MECHANICAL", "DIY"],
    size: "large",
  },
  {
    id: "nasa-usdc",
    name: "NASA USDC-9",
    period: "Aug 2024 – Apr 2025",
    location: "Austin, TX",
    description:
      "Cross-functional team coordinating with NASA SMEs to test microgravity fluid wicking through substrate materials.",
    bullets: [
      "Coordinated cross-functional team, managing requirements and leading presentations to NASA Subject Matter Experts.",
      "Tested conceptual wicking design through 3 substrate materials, documenting fluid movement and absorption rates.",
      "Iteratively designed 3+ 3D CAD models with ISS-heritage sensors to test microgravity fluid interaction through substrate.",
    ],
    tags: ["CAD", "FLUIDS", "MICROGRAVITY", "TEAMLEAD"],
    size: "large",
  },
  {
    id: "propeller",
    name: "Propeller-Thrust Optimization",
    period: "Jan 2024 – May 2024",
    location: "Austin, TX",
    description:
      "Strain gages + photodiode sensors, LabVIEW DAQ, 12+ trials to characterize thrust efficiency across pitch configurations.",
    bullets: [
      "Engineered experiments utilizing strain gages and photodiode sensors to analyze efficiency across 3 propeller twists.",
      "Collected and processed raw voltage data with calculated calibration constants to determine thrust and RPM.",
      "Conducted 12+ trials using LabVIEW to compare performance across 3 propellers with pitch configurations from 5°–6.5°.",
    ],
    tags: ["LABVIEW", "DAQ", "WIND-TUNNEL", "DATA"],
    size: "medium",
  },
];
