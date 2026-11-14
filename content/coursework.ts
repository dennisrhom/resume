import type { Entry } from "./types";

/**
 * Coursework write-ups. Same shape as projects. These all sit under
 * Things I did at school (/school/<slug>/).
 */
export const coursework: Entry[] = [
  {
    slug: "cfd-openfoam",
    group: "school",
    title: "Computational Fluid Dynamics",
    subtitle:
      "Three OpenFOAM studies. It starts with vortex shedding behind a cylinder and ends with a shock coming off a Mach 3 double ramp.",
    dates: "Spring 2025",
    context: "COE 347 Introduction to Computational Fluid Dynamics, UT Austin",
    summary:
      "Two assignments and a final project in OpenFOAM and ParaView. The assignments were a cylinder wake at two Reynolds numbers and a Mach 3 step with mesh refinement and parallel scaling. The final project was double-ramp shock interaction.",
    highlights: [
      "Final project: Mach 3 flow over 15°, 25°, and 35° double ramps, checked against oblique shock theory",
      "Mesh refinement from 4,032 to 258,048 cells, then parallel scaling on a 1,032,192-cell mesh",
      "Strouhal number and recirculation length for a cylinder wake, compared with published data",
    ],
    tags: ["OpenFOAM", "ParaView", "Compressible flow", "Mesh refinement"],
    cover: {
      id: "cfd/double-ramp-mach-25deg",
      alt: "Mach number contour of supersonic flow over a 25 degree double ramp showing two oblique shocks and their reflection",
    },
    facts: [
      { label: "Term", value: "Spring 2025" },
      { label: "Course", value: "COE 347, UT Austin" },
      { label: "Tools", value: "OpenFOAM, ParaView, MATLAB" },
      { label: "Final project", value: "Team of 4" },
    ],
    blocks: [
      {
        type: "prose",
        kicker: "Final project",
        heading: "Shock interaction on a Mach 3 double ramp",
        paragraphs: [
          "For the final project we looked at two-dimensional, inviscid, supersonic flow through a channel with two ramps on the lower wall. We wanted to know how the total ramp angle changes the oblique shocks and how they interact. We also wanted to find where the attached-shock picture stops working.",
          "We ran three geometries with total deflection angles of 15°, 25°, and 35°, all at the same Mach 3 inflow. The solver was OpenFOAM's rhoCentralFoam on the Euler equations. Then we compared post-shock Mach number and pressure against oblique shock theory.",
        ],
      },
      {
        type: "gallery",
        columns: 3,
        images: [
          {
            id: "cfd/double-ramp-mach-15deg",
            alt: "Mach contour for the 15 degree ramp: thin, weak oblique shocks rising from each ramp corner",
            caption: "15°. Weak, attached oblique shocks.",
          },
          {
            id: "cfd/double-ramp-mach-25deg",
            alt: "Mach contour for the 25 degree ramp: stronger shocks that reflect off the upper wall",
            caption: "25°. Stronger shocks that reflect off the upper wall.",
          },
          {
            id: "cfd/double-ramp-mach-35deg",
            alt: "Mach contour for the 35 degree ramp: a curved shock standing off the first ramp with a complex interaction region behind it",
            caption: "35°. The shock stands off the ramp.",
          },
        ],
      },
      {
        type: "table",
        kicker: "Results",
        heading: "CFD against oblique shock theory, after the first shock",
        columns: ["Ramp angle", "Mach (theory)", "Mach (CFD)", "Error", "Pressure ratio (theory)", "Pressure ratio (CFD)", "Error"],
        rows: [
          ["15°", "2.255", "2.245", "0.44%", "2.822", "2.824", "0.07%"],
          ["25°", "1.717", "1.785", "3.96%", "4.925", "4.741", "3.73%"],
          ["35°", "detached", "0.875", "n/a", "detached", "8.218", "n/a"],
        ],
        note: "At 35° and Mach 3 the deflection is past the maximum for an attached oblique shock. Theory has no solution there, and the simulation shows a detached bow shock with subsonic flow behind it.",
      },
      {
        type: "split",
        kicker: "Finding",
        heading: "Past the detachment limit, it's a different flow",
        paragraphs: [
          "At 15° the simulation matched theory to within 1% on Mach number and pressure. At 25° the shocks reflect off the upper wall and interact with the second ramp. The pressure error after the second shock grew to 9.5%.",
          "At 35° the shock detaches into a bow shock, with a large pressure rise and a steep drop in Mach number. If you're designing an inlet or a compression surface, that's the regime you want to stay out of.",
        ],
        image: {
          id: "cfd/double-ramp-detached-mach",
          alt: "Mach contour of the 35 degree case late in the run: a near-normal bow shock ahead of the ramp with low-speed flow behind it",
          caption: "The 35° case later in the run, with the bow shock detached.",
        },
      },
      {
        type: "split",
        kicker: "Assignment 3",
        heading: "Mach 3 step: mesh refinement and parallel scaling",
        flip: true,
        paragraphs: [
          "We solved Mach 3 flow over a step in a channel with rhoCentralFoam, then refined the mesh three times. Each level doubled the resolution in both directions. That took it from 4,032 cells to 258,048, and run time went from 14 seconds to 4,096 seconds.",
          "Then we measured parallel performance on a 1,032,192-cell mesh. Speedup tracked the processor count up to 8 processors (7.98x). At 56 processors it reached 27.2x, which is a parallel efficiency of 0.49. So on a mesh this size, most of those extra cores were wasted.",
        ],
        image: {
          id: "cfd/forward-step-mach",
          alt: "Mach contour of supersonic flow over a forward-facing step showing a bow shock and reflected shocks along the channel",
          caption: "Mach number over the step at the end of the run.",
        },
      },
      {
        type: "table",
        heading: "Parallel scaling, 1,032,192 cells",
        columns: ["Processors", "Speedup", "Efficiency"],
        rows: [
          ["1", "1.00", "1.00"],
          ["2", "2.15", "1.08"],
          ["4", "4.20", "1.05"],
          ["8", "7.98", "1.00"],
          ["16", "13.69", "0.86"],
          ["32", "21.44", "0.67"],
          ["56", "27.17", "0.49"],
        ],
      },
      {
        type: "split",
        kicker: "Assignment 2",
        heading: "Flow around a cylinder at Re = 20 and Re = 110",
        paragraphs: [
          "This one was incompressible flow past a circular cylinder on a mesh of about 8,500 cells. At Re = 20 the wake is steady, with a recirculation region that stays attached. At Re = 110 it sheds a von Kármán vortex street.",
          "I got the shedding frequency from an FFT of the wake velocity. The Strouhal number came out to 0.195, against 0.16 to 0.17 in published data. The steady recirculation length was L/D = 1.17, against roughly 0.9 to 1.1 in the literature. Both are roughly 15 to 20% off published values, on a coarse mesh.",
        ],
        image: {
          id: "cfd/cylinder-vortex-street",
          alt: "Velocity contour behind a cylinder showing an alternating, wavy wake",
          caption: "Vortex shedding at Re = 110.",
        },
      },
    ],
  },

  {
    slug: "dragonfly-wind-tunnel",
    group: "school",
    title: "Dragonfly Wind Tunnel Test",
    subtitle:
      "Would the human-powered aircraft from Rendezvous with Rama actually fly? We put a 3D printed scale model in a wind tunnel to find out.",
    dates: "Spring 2023",
    context: "ASE 120K Low-Speed Aerodynamics Laboratory, UT Austin",
    summary:
      "A wind tunnel test of a scale model of the Dragonfly aircraft from Rendezvous with Rama. We measured lift and drag coefficients at three Reynolds numbers and five angles of attack, and ran smoke and tuft flow visualization.",
    highlights: [
      "Measured lift and drag coefficients at Reynolds numbers of 297,200, 503,200, and 719,000",
      "Used tufts and a smoke wand to see separation, in clean flow and in tripped flow",
      "Drag came out above lift at every condition we tested. The gap closed as Reynolds number went up.",
    ],
    tags: ["Wind tunnel", "Flow visualization", "Lift and drag", "3D printing"],
    cover: {
      id: "dragonfly/smoke-body-tripped",
      alt: "Black scale model of the Dragonfly aircraft in a wind tunnel with white tufts and a smoke stream passing over the body",
    },
    facts: [
      { label: "Term", value: "Spring 2023" },
      { label: "Course", value: "ASE 120K, UT Austin" },
      { label: "Team", value: "4 people" },
      { label: "Model", value: "1:22.66 scale, 3D printed" },
    ],
    blocks: [
      {
        type: "prose",
        kicker: "Question",
        heading: "Can a science fiction aircraft fly on Earth?",
        paragraphs: [
          "In Arthur C. Clarke's Rendezvous with Rama, Dragonfly is a human-powered aircraft with long, tapering wings. It gets flown inside a giant rotating spacecraft. For our open-ended final lab we were handed a design for it and one question: does it make enough lift?",
          "The shape is a blunt central body with thin, swept wings and a long tail. So the test had to cover pressure drag from the body as well as separation on the wings.",
        ],
      },
      {
        type: "specs",
        kicker: "Test setup",
        heading: "How we tested it",
        rows: [
          { label: "Model", value: "1:22.66 scale and 3D printed with soluble supports. It was sanded and painted to cut down surface roughness." },
          { label: "Mount", value: "A pistol-grip balance under the tail. It measures normal and axial force and sets the angle of attack." },
          { label: "Speeds", value: "10.25, 17.31, and 24.62 m/s. Those give Reynolds numbers of 297,200, 503,200, and 719,000." },
          { label: "Angles of attack", value: "0°, 5°, 10°, 15°, and 20°." },
          { label: "Flow visualization", value: "Tufts on the wings, tail, and body, plus a smoke wand. We ran it clean, then with a trip wire to force turbulence." },
          { label: "Materials budget", value: "$13. That covered poster board, thread, and tape." },
        ],
      },
      {
        type: "prose",
        kicker: "Constraint",
        heading: "The tunnel couldn't get to Rama",
        paragraphs: [
          "Our estimate for full-scale flight on Rama was a Reynolds number of about 6.9 million. Matching that with this model would take more than 250 m/s. The tunnel tops out at 29.87 m/s. So we tested at three Earth-like Reynolds numbers and looked at the trend.",
        ],
      },
      {
        type: "gallery",
        kicker: "Flow visualization",
        heading: "Where the flow lets go",
        columns: 3,
        images: [
          {
            id: "dragonfly/smoke-body-low-re",
            alt: "Smoke stream passing under the blunt central body of the model with a red line marking the separated wake",
            caption: "Central body in clean flow at the lowest Reynolds number. Separation is near 70° from the nose.",
          },
          {
            id: "dragonfly/smoke-body-tripped",
            alt: "Smoke stream over the central body with tripped flow and a red line marking a later separation point",
            caption: "Tripped flow at a higher Reynolds number. Separation moves back to about 115° and the wake narrows.",
          },
          {
            id: "dragonfly/smoke-tail",
            alt: "Smoke stream following the long tail boom of the model, marked with red and green lines",
            caption: "Flow stays attached along the tail.",
          },
        ],
      },
      {
        type: "gallery",
        kicker: "Force measurements",
        heading: "Lift and drag coefficients",
        intro:
          "We resolved the normal and axial forces from the balance into lift and drag, then normalized by dynamic pressure and frontal area.",
        columns: 3,
        images: [
          {
            id: "dragonfly/cl-cd-re-297k",
            alt: "Chart of lift and drag coefficient against angle of attack at Reynolds number 297,200. Drag rises steadily while lift stays near or below zero.",
            caption: "Re = 297,200. Lift and drag diverge.",
            light: true,
          },
          {
            id: "dragonfly/cl-cd-re-503k",
            alt: "Chart of lift and drag coefficient against angle of attack at Reynolds number 503,200. Lift rises toward drag until 15 degrees.",
            caption: "Re = 503,200. Lift climbs until about 15°.",
            light: true,
          },
          {
            id: "dragonfly/cl-cd-re-719k",
            alt: "Chart of lift and drag coefficient against angle of attack at Reynolds number 719,000. Lift peaks near 15 degrees then falls.",
            caption: "Re = 719,000. Same shape, lower drag.",
            light: true,
          },
        ],
      },
      {
        type: "list",
        kicker: "Results",
        heading: "What we found",
        items: [
          "Drag coefficient was larger than lift coefficient at every Reynolds number and angle of attack we tested. As designed, Dragonfly doesn't fly at Earth-like conditions.",
          "Drag fell as Reynolds number rose. At the lowest speed, drag coefficients at some angles were more than double what we saw at the two higher speeds.",
          "At the two higher Reynolds numbers, lift dropped off sharply past 15° angle of attack. That points to separation on the wings.",
          "On the blunt body, separation was at about 70° in clean, slow flow. It moved to 90° or more at higher speed and to about 115° with tripped flow. A later separation point means a smaller wake and less pressure drag.",
          "On the wing, flow separated at 5° and didn't reattach until 3°. That's a small hysteresis loop.",
        ],
      },
      {
        type: "prose",
        kicker: "Conclusion",
        heading: "Not on Earth. Maybe on Rama.",
        paragraphs: [
          "The trend is the interesting part. Lift and drag move toward each other as Reynolds number goes up. If that holds at the much higher Reynolds number we estimated for Rama, the design could work there. We recommended two follow-ups: add vortex generators to the body to force a turbulent boundary layer, and retest with a larger model or a faster tunnel.",
        ],
      },
      {
        type: "list",
        kicker: "Earlier labs in the same course",
        heading: "ASE 120K labs",
        items: [
          "Lab 1: Flow analysis of a NACA 0012 airfoil. We got lift and drag from surface and wake pressure measurements across angles of attack.",
          "Lab 2: What increasing Reynolds number does to flow over a sphere, a blunt body dominated by pressure drag.",
        ],
      },
    ],
  },

  {
    slug: "walle-lunar-mission",
    group: "school",
    title: "W.A.L.L.E. Lunar Mission Design",
    subtitle:
      "Worthwhile Adaptive Lunar Lifeform Experiment. It's a 14-day lunar lander that grows plants under artificial light and under sunlight.",
    dates: "Fall 2024",
    context: "ASE 166M Spacecraft Systems Laboratory, UT Austin",
    summary:
      "A full mission proposal for a lunar lander that tests plant growth in lunar gravity. I sized the launch vehicle, mass budget, propulsion, power, communications, thermal control, and structure.",
    highlights: [
      "Sized every subsystem for a 14-day plant growth mission at the Sea of Tranquility",
      "Rolled up an 8,399 kg launch mass against a 13,100 kg Falcon 9 capacity",
      "Went with a fully passive thermal design after comparing surface coatings in hot and cold cases",
    ],
    tags: ["Systems engineering", "Mission design", "Mass budget", "MATLAB"],
    cover: {
      id: "walle/mission-patch",
      alt: "Hand-drawn mission patch: a brown boot with a green seedling growing out of it in front of a gray moon, with the word WALLE below",
    },
    facts: [
      { label: "Term", value: "Fall 2024" },
      { label: "Course", value: "ASE 166M, UT Austin" },
      { label: "Type", value: "Individual proposal" },
      { label: "Heritage", value: "Chandrayaan-3, IM-1, VEGGIE, APH" },
    ],
    blocks: [
      {
        type: "prose",
        kicker: "Mission objective",
        heading: "Grow plants on the Moon, and compare two kinds of light",
        paragraphs: [
          "Long stays on the Moon and Mars are going to need crops. NASA's VEGGIE and Advanced Plant Habitat experiments have already grown plants in microgravity on the ISS. W.A.L.L.E. is the next step, which is testing growth in lunar gravity.",
          "The lander carries two growth chambers. One is enclosed and uses artificial light, like the ISS systems. The other has UV-shielded windows and uses sunlight. The goals are to evaluate growth in lunar gravity, compare artificial and natural lighting, and validate growth chambers for future lunar habitats.",
        ],
      },
      {
        type: "split",
        kicker: "Architecture",
        heading: "Concept of operations",
        paragraphs: [
          "It launches from Kennedy Space Center on a Falcon 9 into a 200 km parking orbit, 5 to 7 days before lunar sunrise at the landing site. A kick stage does the trans-lunar injection burn. The lander enters a 100 km lunar orbit and then descends to a soft landing in the Sea of Tranquility.",
          "Landing at the start of a lunar day gives 14 days of sunlight. That covers power and the natural-light chamber. The mission ends at lunar night.",
        ],
        image: {
          id: "walle/conops-sketch",
          alt: "Hand-drawn concept of operations: launch into a 200 km Earth orbit, a trans-lunar injection arc labeled kick stage, and a 100 km lunar orbit before descent",
          caption: "My ConOps sketch from the proposal.",
          light: true,
        },
      },
      {
        type: "table",
        kicker: "Mass budget",
        heading: "Top-level roll-up",
        columns: ["Item", "Mass (kg)"],
        rows: [
          ["Payload, allocated", "130.0"],
          ["Spacecraft bus, allocated", "1,109.5"],
          ["Spacecraft dry mass", "1,239.5"],
          ["Loaded mass, with propellant", "3,168.6"],
          ["Kick stage", "5,160.6"],
          ["Launch vehicle adapter (PAS 37S)", "70.0"],
          ["Boosted mass", "8,399.2"],
          ["Falcon 9 capacity to LEO, reusable", "13,100.0"],
        ],
        note: "I built it top-down from heritage mass fractions, then checked it bottom-up one subsystem at a time.",
      },
      {
        type: "specs",
        kicker: "Subsystems",
        heading: "What flies",
        rows: [
          {
            label: "Propulsion",
            value: "3 Agile Space A2200 bipropellant engines (2,200 N each, 318 s specific impulse) and 12 A110 attitude thrusters (110 N each). They burn M20 and MON-3. Helium pressurant sits in Ti-6Al-4V tanks.",
          },
          {
            label: "Power",
            value: "600 W design point. The landing phase sets it (458.6 W plus 30% margin). Body-fixed triple-junction solar arrays go on all four sides, 2.27 m² per side.",
          },
          {
            label: "Batteries",
            value: "3 EaglePicher SAR10215 lithium-ion batteries, about 1,340 Wh total. They're sized for a 15 minute descent burn at peak power.",
          },
          {
            label: "Communications",
            value: "X-band through NASA's Deep Space Network 34 m antennas. There's a 1.5 m parabolic high-gain antenna and a low/medium-gain backup.",
          },
          {
            label: "Thermal",
            value: "Fully passive. Brilliant aluminum paint (absorptivity 0.3, emissivity 0.31) holds equilibrium between 313 and 317 K in both the hot and cold cases.",
          },
          {
            label: "Structure",
            value: "Al-6061 primary structure on a 1194 mm adapter interface. First lateral mode is 18.8 Hz and first axial mode is 80.7 Hz. Falcon 9 guidance asks for more than 10 Hz and 25 Hz.",
          },
        ],
      },
      {
        type: "list",
        kicker: "Key trades",
        heading: "What I picked, and why",
        items: [
          "X-band over S-band: You get a higher data rate for the same power, and the antenna is smaller.",
          "Solar plus primary batteries, no RTG: The lander is in sunlight for the whole surface mission.",
          "Arrays on all four sides instead of one: It costs more mass (31.2 kg total). In exchange the lander makes power no matter how it's oriented after landing.",
          "Brilliant aluminum paint over Z-93 white paint: Z-93 reached equilibrium below the allowed temperature range. The aluminum paint stayed inside it in both cases, so I didn't need heaters or louvers.",
          "Falcon 9 in reusable configuration: If the mass grows, the expendable configuration (22,800 kg to LEO) is the fallback.",
        ],
      },
      {
        type: "figure",
        image: {
          id: "walle/energy-balance-aluminum-paint",
          alt: "Two plots of heat in and heat out against spacecraft temperature for brilliant aluminum paint, hot case and cold case. The lines cross between 300 and 320 kelvin.",
          caption: "Energy balance for the coating I chose. Equilibrium is where heat in equals heat out.",
          light: true,
        },
      },
      // TODO(numbers): the delta-v budget, propellant split, link budget, and margin percentage
      // are left out on purpose. Those figures disagree with each other inside the report.
      // Add them back here once they are reconciled.
    ],
  },

  {
    slug: "electromechanical-systems",
    group: "school",
    title: "Electromechanical Systems Labs",
    subtitle: "Nine instrumentation labs. Sensors, bridge circuits, data acquisition, and breaking things on purpose.",
    dates: "Spring 2024",
    context: "ASE 375 Electromechanical Systems, UT Austin",
    summary:
      "A semester of measuring things by hand: temperature, displacement, pressure, strain, and acceleration, plus shake tests, drop tests, and digital image correlation. The final project turned into the Propeller-Thrust Optimization rig.",
    highlights: [
      "Built Wheatstone bridge circuits and logged them through NI DAQ hardware and LabVIEW",
      "Ran rap, shake, and drop tests on wing and landing gear models",
      "Measured stress concentration with digital image correlation on a universal testing machine",
    ],
    tags: ["Instrumentation", "LabVIEW", "Strain gages", "Structural testing"],
    metric: { value: "9", label: "instrumentation labs plus a final project" },
    facts: [
      { label: "Term", value: "Spring 2024" },
      { label: "Course", value: "ASE 375, UT Austin" },
      { label: "Team", value: "3 people" },
      { label: "Tools", value: "LabVIEW, NI DAQ, Instron UTM" },
    ],
    blocks: [
      {
        type: "callout",
        title: "Final project: Propeller-Thrust Optimization",
        body: "The course ended with an open project. Ours was a strain-gage thrust stand with a laser tachometer, and it has its own page.",
        href: "/school/propeller-thrust-optimization/",
        linkLabel: "Read the project",
      },
      {
        type: "list",
        kicker: "Labs",
        heading: "One line each",
        ordered: true,
        items: [
          "Developing Measurement Intuition. We measured a room's floor area and an aluminum part's density, with bias error, precision error, and 95% confidence intervals.",
          "Temperature Sensor Measurements. We logged a thermocouple, a thermistor, and an IC sensor through a DAQ into LabVIEW. Readings were at room temperature, near freezing, and near boiling.",
          "Measuring Displacement. A linear potentiometer on a small wing model gave us twist angle, shear center, and both bending and torsional stiffness.",
          "Measuring Pressure Vessels. We read pressure with transducers and strain gauges. Then we built a Wheatstone quarter bridge to track strain on a soda can as it vented.",
          "Strain-gage Measurements and Fourier Analysis. We compared half-bridge strain at the root of a cantilever beam with Euler-Bernoulli theory, then found its natural frequency with an FFT.",
          "Measuring Dynamic Response with Accelerometers. Rap tests on a built-up wing, using piezoelectric and MEMS accelerometers.",
          "Shake Testing. We drove a wing model with an electromagnetic shaker and built its frequency response function from load cell and accelerometer data.",
          "Landing Gear Drop Test. We dropped a small landing gear from several heights and recorded stroke and acceleration. A laser and photodiode triggered the recording.",
          "Digital Image Correlation. We pulled aluminum and polycarbonate strips with center holes until they failed, then compared the measured strain field with theoretical stress concentration.",
        ],
      },
    ],
  },
];
