export interface Course {
  code: string;
  name: string;
  grade: string;
}

export interface CourseGroup {
  label: string;
  courses: Course[];
}

export const courseGroups: CourseGroup[] = [
  {
    label: "Aerospace & Propulsion",
    courses: [
      { code: "ASE 376K", name: "Propulsion",                       grade: "B+" },
      { code: "ASE 367K", name: "Flight Dynamics",                  grade: "A−" },
      { code: "ASE 372K", name: "Attitude Dynamics",                grade: "A−" },
      { code: "ASE 366K", name: "Spacecraft Dynamics",              grade: "A"  },
      { code: "ASE 362K", name: "Compressible Flow",                grade: "B+" },
      { code: "ASE 320",  name: "Low-Speed Aerodynamics",           grade: "A−" },
      { code: "ASE 379L", name: "Rocket Science",                   grade: "B+" },
    ],
  },
  {
    label: "Systems, Design & Controls",
    courses: [
      { code: "ASE 374K", name: "Space Systems Engineering Design", grade: "A"  },
      { code: "ASE 374L", name: "Spacecraft / Mission Design",      grade: "B"  },
      { code: "ASE 370C", name: "Feedback Control Systems",         grade: "A−" },
      { code: "ASE 330M", name: "Linear System Analysis",           grade: "A−" },
      { code: "ASE 375",  name: "Electromechanical Systems",        grade: "B"  },
    ],
  },
  {
    label: "Computation & Methods",
    courses: [
      { code: "COE 347",  name: "Intro to Computational Fluid Dynamics", grade: "B"  },
      { code: "PHY 329",  name: "Intro to Computational Physics",        grade: "A"  },
      { code: "COE 311K", name: "Engineering Computation",               grade: "B"  },
      { code: "COE 301",  name: "Intro to Computer Programming",         grade: "B−" },
    ],
  },
  {
    label: "Mechanics & Materials",
    courses: [
      { code: "ASE 339",  name: "Advanced Strength of Materials",  grade: "B+" },
      { code: "ASE 324L", name: "Aerospace Materials Laboratory",  grade: "A"  },
      { code: "EM 319",   name: "Mechanics of Solids",             grade: "C"  },
      { code: "EM 306",   name: "Statics",                         grade: "B"  },
      { code: "EM 311M",  name: "Dynamics",                        grade: "A"  },
    ],
  },
  {
    label: "Other Notable",
    courses: [
      { code: "UGS 303",  name: "Humans and AI",                   grade: "A"  },
      { code: "ES 333T",  name: "Engineering Communication",       grade: "A"  },
    ],
  },
];

export const stats = [
  { label: "OVERALL GPA",       value: "3.56" },
  { label: "UPPER DIVISION GPA", value: "3.55" },
  { label: "CREDITS COMPLETED",  value: "123"  },
  { label: "GRADUATED",          value: "MAY 2025" },
];

export const skills = [
  {
    label: "SOFTWARE",
    items: "MATLAB · Simulink · SolidWorks · Python · C++ · LabVIEW · OpenFOAM · ParaVIEW · Linux · Git",
  },
  {
    label: "HARDWARE",
    items: "3D Printers · Machine Shop · DAQ Systems · Wind Tunnel · Microcontrollers · Power Tools",
  },
  {
    label: "DOMAINS",
    items: "Systems Engineering · Controls · Thermodynamics · CFD · Orbital Mechanics · Propulsion",
  },
];
