import type { Entry } from "./types";

/**
 * Coursework projects. Same shape as projects; all of them are listed under
 * "Academic projects" on the main article and referenced from Education.
 */
export const coursework: Entry[] = [
  {
    slug: "cfd-openfoam",
    title: "Computational Fluid Dynamics",
    category: "academic",
    summary:
      "Three OpenFOAM studies for COE 347 at UT Austin: vortex shedding behind a cylinder, Mach 3 flow over a step with mesh refinement and parallel scaling, and a final project on shock interaction over Mach 3 double ramps, checked against oblique shock theory.",
    lead: [
      "**Computational Fluid Dynamics** covers two assignments and a final project I completed in OpenFOAM and ParaView for COE 347 Introduction to Computational Fluid Dynamics at UT Austin in spring 2025.",
      "The assignments were a cylinder wake at two Reynolds numbers and a Mach 3 step with mesh refinement and parallel scaling. The final project, by a team of four, studied shock interaction on Mach 3 double ramps of 15°, 25°, and 35°.",
    ],
    infobox: {
      image: {
        id: "cfd/double-ramp-mach-25deg",
        alt: "Mach number contour of supersonic flow over a 25 degree double ramp showing two oblique shocks and their reflection",
        caption: "Mach number over the 25° double ramp",
      },
      rows: [
        { label: "Course", value: "COE 347 Introduction to Computational Fluid Dynamics, UT Austin" },
        { label: "Term", value: "Spring 2025" },
        { label: "Tools", value: "OpenFOAM, ParaView, MATLAB" },
        { label: "Final project", value: "Team of 4" },
      ],
    },
    sections: [
      {
        heading: "Double-ramp shock interaction",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "The final project studied two-dimensional, inviscid, supersonic flow through a channel with two ramps on the lower wall: how the total ramp angle changes the oblique shocks, how they interact, and where the attached-shock model stops working.",
              "Three geometries with total deflection angles of 15°, 25°, and 35° were run at the same Mach 3 inflow using OpenFOAM's rhoCentralFoam solver on the Euler equations. Post-shock Mach number and pressure were compared against oblique shock theory.",
            ],
          },
          {
            type: "gallery",
            images: [
              {
                id: "cfd/double-ramp-mach-15deg",
                alt: "Mach contour for the 15 degree ramp: thin, weak oblique shocks rising from each ramp corner",
                caption: "15°: weak, attached oblique shocks",
              },
              {
                id: "cfd/double-ramp-mach-25deg",
                alt: "Mach contour for the 25 degree ramp: stronger shocks that reflect off the upper wall",
                caption: "25°: stronger shocks reflecting off the upper wall",
              },
              {
                id: "cfd/double-ramp-mach-35deg",
                alt: "Mach contour for the 35 degree ramp: a curved shock standing off the first ramp with a complex interaction region behind it",
                caption: "35°: the shock stands off the ramp",
              },
            ],
          },
          {
            type: "table",
            caption: "CFD vs. oblique shock theory after the first shock",
            columns: ["Ramp angle", "Mach (theory)", "Mach (CFD)", "Error", "Pressure ratio (theory)", "Pressure ratio (CFD)", "Error"],
            rows: [
              ["15°", "2.255", "2.245", "0.44%", "2.822", "2.824", "0.07%"],
              ["25°", "1.717", "1.785", "3.96%", "4.925", "4.741", "3.73%"],
              ["35°", "detached", "0.875", "n/a", "detached", "8.218", "n/a"],
            ],
            note: "At 35° and Mach 3 the deflection exceeds the maximum for an attached oblique shock. Theory has no solution, and the simulation shows a detached bow shock with subsonic flow behind it.",
          },
        ],
        subsections: [
          {
            heading: "Findings",
            blocks: [
              {
                type: "thumb",
                image: {
                  id: "cfd/double-ramp-detached-mach",
                  alt: "Mach contour of the 35 degree case late in the run: a near-normal bow shock ahead of the ramp with low-speed flow behind it",
                  caption: "The 35° case later in the run, with the bow shock detached",
                },
              },
              {
                type: "prose",
                paragraphs: [
                  "At 15° the simulation matched theory to within 1% on Mach number and pressure. At 25° the shocks reflect off the upper wall and interact with the second ramp, and the pressure error after the second shock grew to 9.5%.",
                  "At 35° the shock detaches into a bow shock, with a large pressure rise and a steep drop in Mach number, a regime to avoid in inlet and compression-surface design.",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Mach 3 step",
        blocks: [
          {
            type: "thumb",
            image: {
              id: "cfd/forward-step-mach",
              alt: "Mach contour of supersonic flow over a forward-facing step showing a bow shock and reflected shocks along the channel",
              caption: "Mach number over the step at the end of the run",
            },
          },
          {
            type: "prose",
            paragraphs: [
              "Mach 3 flow over a step in a channel was solved with rhoCentralFoam, then the mesh was refined three times, doubling the resolution in both directions at each level. The mesh grew from 4,032 to 258,048 cells and run time from 14 to 4,096 seconds.",
              "Parallel performance was measured on a 1,032,192-cell mesh. Speedup tracked processor count up to 8 processors (7.98×) and reached 27.2× at 56 processors, a parallel efficiency of 0.49.",
            ],
          },
          {
            type: "table",
            caption: "Parallel scaling, 1,032,192 cells",
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
        ],
      },
      {
        heading: "Flow around a cylinder",
        blocks: [
          {
            type: "thumb",
            image: {
              id: "cfd/cylinder-vortex-street",
              alt: "Velocity contour behind a cylinder showing an alternating, wavy wake",
              caption: "Vortex shedding at Re = 110",
            },
          },
          {
            type: "prose",
            paragraphs: [
              "Incompressible flow past a circular cylinder was simulated on a mesh of about 8,500 cells. At Re = 20 the wake is steady, with an attached recirculation region. At Re = 110 it sheds a von Kármán vortex street.",
              "The shedding frequency, from an FFT of the wake velocity, gave a Strouhal number of 0.195, against 0.16–0.17 in published data. The steady recirculation length was L/D = 1.17, against roughly 0.9–1.1 in the literature. Both are about 15–20% off published values on a coarse mesh.",
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "dragonfly-wind-tunnel",
    title: "Dragonfly Wind Tunnel Test",
    category: "academic",
    summary:
      "A wind tunnel test of a 3D-printed scale model of the human-powered aircraft *Dragonfly* from *Rendezvous with Rama*, for ASE 120K at UT Austin. We measured lift and drag at three Reynolds numbers and five angles of attack and used smoke and tufts to visualize separation.",
    lead: [
      "The **Dragonfly wind tunnel test** was a four-person final lab in ASE 120K Low-Speed Aerodynamics Laboratory at UT Austin in spring 2023. We tested a 1:22.66 scale, 3D-printed model of *Dragonfly*, the human-powered aircraft in Arthur C. Clarke's *Rendezvous with Rama*, to determine whether it makes enough lift.",
      "Lift and drag coefficients were measured at Reynolds numbers of 297,200, 503,200, and 719,000, with tufts and a smoke wand used to visualize separation in clean and tripped flow. Drag exceeded lift at every condition tested, with the gap closing as Reynolds number increased.",
    ],
    infobox: {
      image: {
        id: "dragonfly/smoke-body-tripped",
        alt: "Black scale model of the Dragonfly aircraft in a wind tunnel with white tufts and a smoke stream passing over the body",
        caption: "The model with tufts and smoke in tripped flow",
      },
      rows: [
        { label: "Course", value: "ASE 120K Low-Speed Aerodynamics Laboratory, UT Austin" },
        { label: "Term", value: "Spring 2023" },
        { label: "Team", value: "4 people" },
        { label: "Model", value: "1:22.66 scale, 3D printed" },
        { label: "Reynolds numbers", value: "297,200; 503,200; 719,000" },
      ],
    },
    sections: [
      {
        heading: "Background",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "In *Rendezvous with Rama*, *Dragonfly* is a human-powered aircraft with long, tapering wings, flown inside a giant rotating spacecraft. The open-ended final lab provided a design for it and asked whether it makes enough lift.",
              "The shape combines a blunt central body with thin, swept wings and a long tail, so the test had to cover both pressure drag on the body and separation on the wings.",
            ],
          },
        ],
      },
      {
        heading: "Test setup",
        blocks: [
          {
            type: "list",
            items: [
              "**Model:** 1:22.66 scale, 3D printed with soluble supports, then sanded and painted to reduce surface roughness.",
              "**Mount:** a pistol-grip balance under the tail, measuring normal and axial force and setting the angle of attack.",
              "**Speeds:** 10.25, 17.31, and 24.62 m/s, giving Reynolds numbers of 297,200, 503,200, and 719,000.",
              "**Angles of attack:** 0°, 5°, 10°, 15°, and 20°.",
              "**Flow visualization:** tufts on the wings, tail, and body, plus a smoke wand, in clean flow and with a trip wire to force turbulence.",
              "**Materials budget:** $13 for poster board, thread, and tape.",
            ],
          },
        ],
        subsections: [
          {
            heading: "Reynolds number limit",
            blocks: [
              {
                type: "prose",
                paragraphs: [
                  "Full-scale flight on Rama was estimated at a Reynolds number of about 6.9 million. Matching it with this model would require more than 250 m/s, while the tunnel tops out at 29.87 m/s, so the model was tested at three Earth-like Reynolds numbers to establish a trend.",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Flow visualization",
        blocks: [
          {
            type: "gallery",
            images: [
              {
                id: "dragonfly/smoke-body-low-re",
                alt: "Smoke stream passing under the blunt central body of the model with a red line marking the separated wake",
                caption: "Clean flow at the lowest Reynolds number; separation near 70°",
              },
              {
                id: "dragonfly/smoke-body-tripped",
                alt: "Smoke stream over the central body with tripped flow and a red line marking a later separation point",
                caption: "Tripped flow; separation moves back to about 115°",
              },
              {
                id: "dragonfly/smoke-tail",
                alt: "Smoke stream following the long tail boom of the model, marked with red and green lines",
                caption: "Flow stays attached along the tail",
              },
            ],
          },
        ],
      },
      {
        heading: "Force measurements",
        blocks: [
          {
            type: "gallery",
            intro:
              "Normal and axial forces from the balance were resolved into lift and drag, then normalized by dynamic pressure and frontal area.",
            images: [
              {
                id: "dragonfly/cl-cd-re-297k",
                alt: "Chart of lift and drag coefficient against angle of attack at Reynolds number 297,200. Drag rises steadily while lift stays near or below zero.",
                caption: "Re = 297,200",
                light: true,
              },
              {
                id: "dragonfly/cl-cd-re-503k",
                alt: "Chart of lift and drag coefficient against angle of attack at Reynolds number 503,200. Lift rises toward drag until 15 degrees.",
                caption: "Re = 503,200",
                light: true,
              },
              {
                id: "dragonfly/cl-cd-re-719k",
                alt: "Chart of lift and drag coefficient against angle of attack at Reynolds number 719,000. Lift peaks near 15 degrees then falls.",
                caption: "Re = 719,000",
                light: true,
              },
            ],
          },
        ],
      },
      {
        heading: "Results",
        blocks: [
          {
            type: "list",
            items: [
              "Drag coefficient exceeded lift coefficient at every Reynolds number and angle of attack tested. As designed, *Dragonfly* does not fly at Earth-like conditions.",
              "Drag fell as Reynolds number rose. At the lowest speed, drag coefficients at some angles were more than double those at the two higher speeds.",
              "At the two higher Reynolds numbers, lift dropped sharply past 15° angle of attack, indicating wing separation.",
              "On the blunt body, separation was at about 70° in clean, slow flow, moving to 90° or more at higher speed and to about 115° with tripped flow.",
              "On the wing, flow separated at 5° and did not reattach until 3°, a small hysteresis loop.",
            ],
          },
          {
            type: "prose",
            paragraphs: [
              "Lift and drag converged as Reynolds number increased. If the trend holds at the much higher Reynolds number estimated for Rama, the design could fly there. We recommended adding vortex generators to the body to force a turbulent boundary layer, and retesting with a larger model or a faster tunnel.",
            ],
          },
        ],
      },
      {
        heading: "Other labs",
        blocks: [
          {
            type: "list",
            intro: "Earlier labs in ASE 120K:",
            items: [
              "Flow analysis of a NACA 0012 airfoil, with lift and drag from surface and wake pressure measurements across angles of attack.",
              "The effect of increasing Reynolds number on flow over a sphere, a blunt body dominated by pressure drag.",
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "walle-lunar-mission",
    title: "W.A.L.L.E. Lunar Mission Design",
    category: "academic",
    summary:
      "An individual mission proposal for ASE 166M at UT Austin: a 14-day lunar lander that compares plant growth under artificial light and sunlight in lunar gravity. I sized every subsystem, with an 8,399 kg launch mass against a 13,100 kg Falcon 9 capacity.",
    lead: [
      "**W.A.L.L.E.** (Worthwhile Adaptive Lunar Lifeform Experiment) is a lunar lander mission I proposed for ASE 166M Spacecraft Systems Laboratory at UT Austin in fall 2024. The lander spends 14 days at the Sea of Tranquility growing plants in two chambers, one under artificial light and one under sunlight.",
      "I sized the launch vehicle, mass budget, propulsion, power, communications, thermal control, and structure. The boosted mass of 8,399 kg fits a reusable Falcon 9's 13,100 kg capacity to low Earth orbit.",
    ],
    infobox: {
      image: {
        id: "walle/mission-patch",
        alt: "Hand-drawn mission patch: a brown boot with a green seedling growing out of it in front of a gray moon, with the word WALLE below",
        caption: "Mission patch",
      },
      rows: [
        { label: "Course", value: "ASE 166M Spacecraft Systems Laboratory, UT Austin" },
        { label: "Term", value: "Fall 2024" },
        { label: "Type", value: "Individual proposal" },
        { label: "Destination", value: "Sea of Tranquility, Moon" },
        { label: "Surface mission", value: "14 days" },
        { label: "Launch vehicle", value: "Falcon 9 (reusable)" },
        { label: "Boosted mass", value: "8,399 kg" },
        { label: "Heritage", value: "Chandrayaan-3, IM-1, VEGGIE, APH" },
      ],
    },
    sections: [
      {
        heading: "Objectives",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Long stays on the Moon and Mars will need crops. NASA's VEGGIE and Advanced Plant Habitat experiments have grown plants in microgravity on the ISS; W.A.L.L.E. tests growth in lunar gravity.",
              "The lander carries two growth chambers: an enclosed chamber with artificial light, like the ISS systems, and a chamber with UV-shielded windows that uses sunlight. The goals are to evaluate growth in lunar gravity, compare artificial and natural lighting, and validate growth chambers for future lunar habitats.",
            ],
          },
        ],
      },
      {
        heading: "Concept of operations",
        blocks: [
          {
            type: "thumb",
            image: {
              id: "walle/conops-sketch",
              alt: "Hand-drawn concept of operations: launch into a 200 km Earth orbit, a trans-lunar injection arc labeled kick stage, and a 100 km lunar orbit before descent",
              caption: "Concept of operations sketch from the proposal",
              light: true,
            },
          },
          {
            type: "prose",
            paragraphs: [
              "The lander launches from Kennedy Space Center on a Falcon 9 into a 200 km parking orbit, 5 to 7 days before lunar sunrise at the landing site. A kick stage performs trans-lunar injection. The lander enters a 100 km lunar orbit, then descends to a soft landing in the Sea of Tranquility.",
              "Landing at the start of a lunar day gives 14 days of sunlight for power and the natural-light chamber. The mission ends at lunar night.",
            ],
          },
        ],
      },
      {
        heading: "Mass budget",
        blocks: [
          {
            type: "table",
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
            note: "Built top-down from heritage mass fractions, then checked bottom-up by subsystem.",
          },
        ],
      },
      {
        heading: "Subsystems",
        blocks: [
          {
            type: "list",
            items: [
              "**Propulsion:** 3 Agile Space A2200 bipropellant engines (2,200 N each, 318 s specific impulse) and 12 A110 attitude thrusters (110 N each), burning M20 and MON-3, with helium pressurant in Ti-6Al-4V tanks.",
              "**Power:** 600 W design point, set by the landing phase (458.6 W plus 30% margin). Body-fixed triple-junction solar arrays on all four sides, 2.27 m² per side.",
              "**Batteries:** 3 EaglePicher SAR10215 lithium-ion batteries, about 1,340 Wh total, sized for a 15-minute descent burn at peak power.",
              "**Communications:** X-band through NASA's Deep Space Network 34 m antennas, with a 1.5 m parabolic high-gain antenna and a low/medium-gain backup.",
              "**Thermal:** fully passive. Brilliant aluminum paint (absorptivity 0.3, emissivity 0.31) holds equilibrium between 313 and 317 K in both hot and cold cases.",
              "**Structure:** Al-6061 primary structure on a 1194 mm adapter interface. First lateral mode 18.8 Hz and first axial mode 80.7 Hz, against Falcon 9 minimums of 10 Hz and 25 Hz.",
            ],
          },
        ],
      },
      {
        heading: "Design trades",
        blocks: [
          {
            type: "thumb",
            image: {
              id: "walle/energy-balance-aluminum-paint",
              alt: "Two plots of heat in and heat out against spacecraft temperature for brilliant aluminum paint, hot case and cold case. The lines cross between 300 and 320 kelvin.",
              caption: "Energy balance for the selected coating; equilibrium is where heat in equals heat out",
              light: true,
            },
          },
          {
            type: "list",
            items: [
              "**X-band over S-band:** higher data rate for the same power, with a smaller antenna.",
              "**Solar and batteries, no RTG:** the lander is in sunlight for the whole surface mission.",
              "**Arrays on all four sides:** costs 31.2 kg in total but generates power regardless of orientation after landing.",
              "**Brilliant aluminum paint over Z-93 white paint:** Z-93 reached equilibrium below the allowed temperature range; the aluminum paint stayed within it in both cases, so no heaters or louvers were needed.",
              "**Falcon 9, reusable configuration:** the expendable configuration (22,800 kg to LEO) is the fallback if mass grows.",
            ],
          },
        ],
      },
      // TODO(numbers): the delta-v budget, propellant split, link budget, and margin percentage
      // are left out on purpose. Those figures disagree with each other inside the report.
      // Add them back here once they are reconciled.
    ],
  },

  {
    slug: "electromechanical-systems",
    title: "Electromechanical Systems Labs",
    category: "academic",
    summary:
      "Nine instrumentation labs in ASE 375 at UT Austin covering temperature, displacement, pressure, strain, and acceleration measurement, plus shake tests, drop tests, and digital image correlation. The course's final project was the Propeller-Thrust Optimization rig.",
    lead: [
      "The **Electromechanical Systems Labs** are nine instrumentation labs I completed with a three-person team in ASE 375 Electromechanical Systems at UT Austin in spring 2024. They covered temperature, displacement, pressure, strain, and acceleration measurement, along with shake testing, drop testing, and digital image correlation.",
    ],
    infobox: {
      rows: [
        { label: "Course", value: "ASE 375 Electromechanical Systems, UT Austin" },
        { label: "Term", value: "Spring 2024" },
        { label: "Team", value: "3 people" },
        { label: "Labs", value: "9, plus a final project" },
        { label: "Tools", value: "LabVIEW, NI DAQ, Instron UTM" },
      ],
    },
    sections: [
      {
        heading: "Labs",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Developing Measurement Intuition:** measured a room's floor area and an aluminum part's density, with bias error, precision error, and 95% confidence intervals.",
              "**Temperature Sensor Measurements:** logged a thermocouple, a thermistor, and an IC sensor through a DAQ into LabVIEW at room temperature, near freezing, and near boiling.",
              "**Measuring Displacement:** used a linear potentiometer on a small wing model to find twist angle, shear center, and bending and torsional stiffness.",
              "**Measuring Pressure Vessels:** read pressure with transducers and strain gauges, then built a Wheatstone quarter bridge to track strain on a soda can as it vented.",
              "**Strain-gage Measurements and Fourier Analysis:** compared half-bridge strain at the root of a cantilever beam with Euler–Bernoulli theory, then found its natural frequency with an FFT.",
              "**Measuring Dynamic Response with Accelerometers:** rap tests on a built-up wing using piezoelectric and MEMS accelerometers.",
              "**Shake Testing:** drove a wing model with an electromagnetic shaker and built its frequency response function from load cell and accelerometer data.",
              "**Landing Gear Drop Test:** dropped a small landing gear from several heights and recorded stroke and acceleration, with a laser and photodiode triggering the recording.",
              "**Digital Image Correlation:** pulled aluminum and polycarbonate strips with center holes to failure and compared the measured strain field with theoretical stress concentration.",
            ],
          },
        ],
      },
      {
        heading: "Final project",
        blocks: [
          { type: "hatnote", text: "Main article: [[/propeller-thrust-optimization/|Propeller-Thrust Optimization]]" },
          {
            type: "prose",
            paragraphs: [
              "The course ended with an open-ended project. Ours was a strain-gage thrust stand with a laser tachometer, used to compare propeller twists on thrust per watt.",
            ],
          },
        ],
      },
    ],
  },
];
