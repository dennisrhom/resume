import type { Entry, VideoRef } from "./types";

/**
 * Projects, in résumé order. `group` decides where each one lives:
 * "home" shows under Things I did at home (/home/<slug>/),
 * "school" under Things I did at school (/school/<slug>/).
 *
 * To add a project: copy an entry, change the slug, and it gets a card and its own page.
 * To add photos: drop originals in media-src/<collection>/, run `npm run media`,
 * then reference them here as { id: "<collection>/<name>", alt: "..." }.
 */

// TODO(video): the firing video (BlastXPhantom_Shooting_Video.MP4) was not in the
// uploaded files. Run `npm run video -- path/to/BlastXPhantom_Shooting_Video.MP4`
// and then replace `null` with the object the script prints.
const phantomFiringVideo: VideoRef | null = null;

export const projects: Entry[] = [
  {
    slug: "blastx-phantom",
    group: "home",
    title: "BlastX Phantom",
    subtitle:
      "A full-size VALORANT skin that actually shoots foam darts. I modeled it from in-game screenshots and built it around the insides of a toy blaster.",
    dates: "June to July 2026",
    context: "Personal project",
    summary:
      "A 1:1 replica of the VALORANT BlastX Phantom that fires foam darts. It's 74 printed parts, modeled in SolidWorks from screenshots, with a toy blaster's flywheel mechanism repackaged inside.",
    highlights: [
      "Modeled the whole assembly 1:1 in SolidWorks from in-game images. It's a cosmetic item in VALORANT, so screenshots were all I had.",
      "Redesigned a toy blaster's firing mechanism so the flywheels and battery fit inside a custom, modular shell.",
      "Ran tolerance tests on internal and external parts before printing at full scale. That cut down on wasted filament and print time.",
    ],
    tags: ["SolidWorks", "FDM printing", "Reverse engineering", "Mechanism design"],
    cover: {
      id: "blastx-phantom/finished-grass",
      alt: "Finished BlastX Phantom replica lying on grass: green, purple, white, and orange toy-style rifle with a long orange suppressor",
    },
    facts: [
      { label: "Dates", value: "June to July 2026" },
      { label: "Type", value: "Personal project" },
      { label: "Tools", value: "SolidWorks, Bambu Lab P1P (FDM)" },
      { label: "Scale", value: "1:1 with the in-game model" },
    ],
    blocks: [
      {
        type: "stats",
        items: [
          { value: "74", label: "printed parts" },
          { value: "14", label: "internal or moving parts" },
          { value: "1:1", label: "scale to the in-game model" },
          { value: "2 mm", label: "minimum wall thickness" },
        ],
      },
      {
        type: "compare",
        kicker: "Reference vs. result",
        heading: "The one in the game, and the one I built",
        aspect: "16/9",
        left: {
          label: "In game",
          contain: true,
          id: "blastx-phantom/in-game-reference",
          alt: "The BlastX Phantom skin as shown in the VALORANT collection screen",
          caption: "In-game reference. VALORANT is a trademark of Riot Games. This is a fan-made replica.",
        },
        right: {
          label: "Built",
          id: "blastx-phantom/finished-bench",
          alt: "The finished printed and painted BlastX Phantom replica resting on a metal bench outdoors",
          caption: "The finished replica.",
        },
      },
      {
        type: "prose",
        kicker: "01 / Problem",
        heading: "Video game guns don't come with drawings",
        paragraphs: [
          "The BlastX Phantom is a rifle skin in VALORANT that's styled like a toy dart blaster. I wanted a real one, full size, with the same silhouette as the game. It also had to fire foam darts, because otherwise it's just a prop.",
          "A game asset has no drawings. All I had were in-game screenshots. The shape was made to look good on screen, so nobody was thinking about where motors, a battery, or a magazine would go.",
        ],
      },
      {
        type: "steps",
        kicker: "02 / Approach",
        heading: "Get the scale right, then make a real mechanism fit",
        items: [
          {
            title: "Reference and scale",
            body: "I modeled the full assembly to scale in SolidWorks from in-game screenshots. For anything that touches the donor internals, I used caliper measurements from an X-Shot blaster.",
          },
          {
            title: "Donor mechanism",
            body: "The flywheel motors and battery came out of the X-Shot blaster. I repackaged them into a custom shell that matches the in-game silhouette.",
          },
          {
            title: "Print-sized parts",
            body: "The model is split into 74 parts. Each one is sized to fit the Bambu Lab P1P build plate.",
          },
          {
            title: "Small test prints first",
            body: "Before printing anything big, I prototyped the internal geometry as small standalone prints. That caught fit problems early and wasted a lot less material.",
          },
        ],
      },
      {
        type: "compare",
        kicker: "Before and after",
        heading: "Same flywheels, new housing",
        intro:
          "The donor blaster's flywheels, motors, and wiring all moved into a printed frame shaped around the in-game model. The magazine release is my own design, and it's spring loaded.",
        aspect: "21/9",
        left: {
          label: "Donor blaster",
          id: "blastx-phantom/internals-donor",
          alt: "Opened X-Shot blaster showing two white flywheels, battery tray, trigger assembly, and wiring in a blue shell",
          caption: "Original X-Shot internals.",
        },
        right: {
          label: "Custom shell",
          id: "blastx-phantom/internals-fitted",
          alt: "The flywheels and wiring installed in the gray printed frame of the replica, with the magazine well and trigger linkage visible",
          caption: "The same components fitted into the printed frame.",
        },
      },
      {
        type: "specs",
        kicker: "03 / Design decisions",
        heading: "What the CAD had to get right",
        rows: [
          { label: "Wall thickness", value: "2 mm minimum. Anything weight-bearing or moving gets 4 mm or more." },
          {
            label: "Shell",
            value: "Two halves, joined with the screws from the original blaster. That way I can open it back up when something needs fixing.",
          },
          {
            label: "Firing mechanism",
            value: "Flywheel motors and battery from the donor blaster, repackaged to fit the in-game silhouette.",
          },
          { label: "Magazine release", value: "Custom, and spring loaded." },
          { label: "Part count", value: "74 printed parts. 14 of them are internal or moving." },
          { label: "Part sizing", value: "Every part fits on the Bambu Lab P1P build plate." },
        ],
      },
      {
        type: "gallery",
        kicker: "CAD",
        heading: "The SolidWorks assembly",
        columns: 3,
        images: [
          {
            id: "blastx-phantom/cad-assembled",
            alt: "SolidWorks render of the complete BlastX Phantom assembly in green, purple, white, and orange",
            caption: "Complete assembly.",
          },
          {
            id: "blastx-phantom/cad-exploded",
            alt: "Exploded SolidWorks view showing the shell halves, suppressor, magazine, stock, and internal parts separated",
            caption: "Exploded view.",
          },
          {
            id: "blastx-phantom/cad-split",
            alt: "SolidWorks view with one shell half pulled away to show the internal mechanism",
            caption: "Shell split to show the internals.",
          },
        ],
      },
      {
        type: "compare",
        kicker: "CAD vs. real",
        heading: "What I drew, and what came off the printer",
        aspect: "16/10",
        left: {
          label: "CAD",
          id: "blastx-phantom/cad-assembled",
          alt: "SolidWorks render of the complete assembly",
        },
        right: {
          label: "Real",
          id: "blastx-phantom/finished-grass",
          alt: "The finished replica lying on grass in the same orientation as the CAD render",
        },
      },
      {
        type: "split",
        kicker: "04 / Fabrication",
        heading: "Print, sand, prime, paint, weld",
        paragraphs: [
          "Every part was FDM printed on a Bambu Lab P1P. Then I sanded and primed everything and painted it in the four game colors.",
          "Pieces that belong to the same body section got plastic-welded together after paint. The two main shell halves stay separate and screw together.",
        ],
        image: {
          id: "blastx-phantom/painted-parts",
          alt: "Painted green, white, purple, and orange shell parts laid out to dry, with a bottle of glue",
          caption: "Painted parts before assembly.",
        },
      },
      {
        type: "list",
        kicker: "05 / Challenges and lessons",
        heading: "What went wrong",
        items: [
          "Warping: The larger parts warped during printing. That left small gaps at final assembly.",
          "Supports: Printing supports compromised my tolerances, so the mating surfaces needed extra work before they fit cleanly.",
          "Friction: The moving parts work, but they'd run smoother with more clearance.",
          "Next revision: I've already updated the design files for a future print.",
        ],
      },
      {
        type: "prose",
        kicker: "06 / Result",
        heading: "It's full size, and it fires",
        paragraphs: [
          "The finished blaster is full size and matches the in-game model. It fires foam darts with the repackaged flywheel mechanism. The shell opens with a screwdriver, so I can get to the internals and repair them.",
        ],
      },
      {
        type: "video",
        heading: "Firing test",
        video: phantomFiringVideo,
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            id: "blastx-phantom/finished-bench",
            alt: "Finished BlastX Phantom replica leaning on a metal bench in a garden",
          },
          {
            id: "blastx-phantom/finished-grass",
            alt: "Finished BlastX Phantom replica on grass, seen from the muzzle end",
          },
        ],
      },
    ],
  },

  {
    slug: "chicken-coop",
    group: "home",
    title: "Home Chicken Coop",
    subtitle: "Feed and water for more than 100 chickens, without doing all of it by hand.",
    dates: "March to June 2026",
    context: "Conroe, TX",
    summary:
      "A feed hopper that portions itself and a watering system that runs off one central reservoir, for a flock of 100+ chickens. Chores got shorter, and it comes apart quickly for cleaning.",
    highlights: [
      "Replaced manual refilling with a hopper valve that drops set feed portions. Daily feeding time went down by 50%.",
      "Built a watering system with a central reservoir for 100+ chickens. I made it modular so cleaning and repairs go quickly.",
    ],
    tags: ["Fabrication", "Mechanism design", "Power tools"],
    metric: { value: "50%", label: "less daily feeding time" },
    facts: [
      { label: "Dates", value: "March to June 2026" },
      { label: "Location", value: "Conroe, TX" },
      { label: "Flock", value: "100+ chickens" },
      { label: "Type", value: "Personal project" },
    ],
    blocks: [
      {
        type: "prose",
        kicker: "Problem",
        heading: "Feeding 100+ chickens by hand gets old",
        paragraphs: [
          "Refilling feeders by hand every day doesn't scale to a flock this size. I also wanted a watering setup that comes apart quickly, because one that doesn't is a pain to clean.",
        ],
      },
      {
        type: "specs",
        kicker: "What I built",
        heading: "Two systems",
        rows: [
          {
            label: "Feed",
            value:
              "A hopper valve that drops set feed portions. It replaced refilling by hand and cut daily feeding time by 50%.",
          },
          {
            label: "Water",
            value:
              "One central reservoir feeds the whole watering system, and it serves 100+ chickens. I built it in modules, so a section comes out quickly when it needs cleaning or a repair.",
          },
        ],
      },
      // TODO(photos): no photos of the coop were provided. Add them to
      // media-src/chicken-coop/, run `npm run media`, then add a
      // { type: "gallery", images: [...] } block here and a `cover` above.
      // TODO(details): hopper valve mechanism, materials, and reservoir size are not on the résumé.
    ],
  },

  {
    slug: "nasa-usdc-9",
    group: "school",
    title: "NASA USDC-9: Substrate Testing System",
    subtitle:
      "Watering plants in microgravity with no pump. I led the team that designed it for NASA Glenn's University Student Design Challenge.",
    dates: "August 2024 to April 2025",
    context: "UT Austin, for NASA Glenn Research Center",
    summary:
      "I led a 4-person team on a passive wicking system that moves fluid in and out of porous substrates in microgravity. It carries sensors so we can track where the water goes.",
    highlights: [
      "Led a 4-person team from requirements definition through design reviews, plus multiple presentations to NASA experts.",
      "Tested the wicking concept with 3 substrate materials. I documented how the fluid moved and ranked them by absorption rate.",
      "Kept updating the 3D CAD through multiple design stages as the sensor choices and testing constraints changed.",
    ],
    tags: ["Team lead", "Fluid management", "Microgravity", "CAD", "Arduino"],
    metric: { value: "1,218 Pa", label: "capillary pressure driving the wick network, no pump" },
    facts: [
      { label: "Dates", value: "August 2024 to April 2025" },
      { label: "Role", value: "Team lead, 4-person team" },
      { label: "Program", value: "2024-2025 GRC University Student Design Challenge (USDC-9)" },
      { label: "Phase", value: "Year 1 design" },
    ],
    blocks: [
      {
        type: "prose",
        kicker: "Objective",
        heading: "Watering plants without gravity",
        paragraphs: [
          "On Earth, gravity decides where water goes. In orbit you're left with capillary forces, surface tension, and wetting. So watering a plant up there is really a fluid management problem.",
          "The challenge was to design a test system that can deliver fluid into a porous substrate in microgravity and pull it back out. It also had to measure where the fluid goes and how much of it stays in the substrate.",
        ],
      },
      {
        type: "list",
        kicker: "My role",
        heading: "I was the team lead",
        items: [
          "I led a 4-person team from requirements definition through design reviews, plus multiple presentations to NASA experts.",
          "I tested the conceptual wicking design with 3 substrate materials, documented how the fluid moved, and ranked them by absorption rate.",
          "I kept updating the 3D CAD through multiple design stages as our sensor choices and testing constraints changed.",
        ],
      },
      {
        type: "specs",
        kicker: "System design",
        heading: "One rig for both injection and extraction",
        intro:
          "We wanted one setup that handles both fluid injection and extraction, takes interchangeable substrates, moves fluid passively, and carries its own sensors. It also had to fit in a standard NanoLab container.",
        rows: [
          { label: "Substrate container", value: "Polyethylene, 7.5 x 7.5 x 5 cm. It comes out, so substrates can be swapped." },
          { label: "Fluid reservoir", value: "Polyethylene, 7.5 x 7.5 x 3 cm, about 169 mL." },
          {
            label: "Fluid delivery",
            value: "8 parallel nylon wicking strings, 5 mm diameter and 8 cm long. They run from the reservoir through the substrate. There is no pump.",
          },
          { label: "Sensing", value: "ECH2O EC-5 moisture sensor, an oxygen sensor, and an Arducam camera with LED lighting." },
          { label: "Controller", value: "Arduino Uno with a 4xAA battery pack." },
          { label: "Substrates", value: "Arcillite (calcined clay), and Arcillite mixed with hydrophobic Magic Sand." },
        ],
      },
      {
        type: "prose",
        kicker: "Design choice",
        heading: "Why wicking strings",
        paragraphs: [
          "Active pumps and pressurized lines become a problem once you try to scale a system like this up in space. Hydrophilic nylon strings move water by capillary action, with nothing to power.",
          "The strings give the fluid a preferred path through the substrate, and it can still diffuse outward from there. In the mixed substrate, the hydrophobic grains can block flow and leave dry pockets. We expect the strings to keep a continuous wet path through the whole volume anyway.",
        ],
      },
      {
        type: "table",
        kicker: "Analysis",
        heading: "Capillary model",
        intro: "This was a first-order check that the strings can move water by themselves.",
        columns: ["Quantity", "Result", "Method"],
        rows: [
          ["Capillary pressure in a string", "about 1,218 Pa", "Young-Laplace equation"],
          ["Time for fluid to reach 25% of string length", "0.53 s", "Washburn equation"],
          ["Time to reach 50%", "2.10 s", "Washburn equation"],
          ["Time to wet the full 8 cm", "about 8.4 s", "Washburn equation"],
        ],
        note: "Inputs are assumed values for water at 22 °C on nylon: 0.072 N/m surface tension, 65° contact angle, 0.005 cm effective pore radius.",
      },
      {
        type: "steps",
        kicker: "Testing",
        heading: "Two drop tower procedures",
        intro:
          "Both procedures start with a one hour hold, because that's how long the drop tower makes you wait. The fluid is dyed so the camera can see the front.",
        items: [
          {
            title: "Experiment 1: fluid injection",
            body: "Fill the reservoir and put it below the substrate. Record moisture and oxygen readings, then drop. Fluid wicks from the reservoir into the substrate. Record again and go through the video.",
          },
          {
            title: "Experiment 2: fluid extraction",
            body: "Saturate the substrate and put the reservoir above it. Record readings, then drop. Fluid moves from the substrate back to the reservoir. Compare moisture before and after.",
          },
        ],
      },
      {
        type: "prose",
        kicker: "Results",
        heading: "Where Year 1 ended",
        paragraphs: [
          "Year 1 got us the full system design, the capillary analysis above, and the two test procedures. The analysis says capillary pressure in the strings is enough to drive fluid through the system with no active pumping.",
          "Our final report recommended three things for a second year. Test more substrate mixes to steer where the fluid goes. Add a denser sensor network to validate the model. Study how a substrate changes over repeated wet and dry cycles.",
        ],
      },
      // TODO(results): substrate ranking from the 3-material absorption tests is on the
      // résumé but not in the final report. Add a table block here, for example:
      // { type: "table", kicker: "Test results", heading: "Substrate absorption ranking",
      //   columns: ["Substrate", "Observation", "Rank"], rows: [[...], [...], [...]] },
      // TODO(fmea): add the FMEA as a table block:
      // { type: "table", kicker: "Risk", heading: "FMEA",
      //   columns: ["Failure mode", "Effect", "Severity", "Mitigation"], rows: [...] },
      // TODO(test cases): add each test case as a "steps" or "table" block.
      // TODO(images): CAD renders of the rig were not in the uploaded report. Add them
      // to media-src/usdc/ and reference them with a "gallery" block and a `cover`.
    ],
  },

  {
    slug: "propeller-thrust-optimization",
    group: "school",
    title: "Propeller-Thrust Optimization",
    subtitle:
      "A strain-gage thrust stand and a laser tachometer, built to find out which propeller pitch gets more thrust per watt.",
    dates: "January to May 2024",
    context: "ASE 375 Electromechanical Systems, UT Austin",
    summary:
      "We built a thrust stand out of a carbon fiber beam and strain gages, with a laser and photodiode for RPM. Then we compared two propeller pitches on thrust per watt.",
    highlights: [
      "Built a strain-gage and photodiode test rig that measures thrust and RPM for propellers of different twist.",
      "Captured the strain and photodiode signals through an NI DAQ into LabVIEW.",
      "Converted raw voltage to thrust and RPM with calibration constants we derived, so the results repeat.",
    ],
    tags: ["Test rig", "Strain gages", "LabVIEW", "Data acquisition"],
    cover: {
      id: "propeller/breadboard-circuit",
      alt: "Breadboard with the strain gage bridge, instrumentation amplifier, and photodiode circuit wired to DAQ terminals",
    },
    facts: [
      { label: "Dates", value: "January to May 2024" },
      { label: "Course", value: "ASE 375 Electromechanical Systems" },
      { label: "Team", value: "3 people" },
      { label: "Tools", value: "LabVIEW, NI-9215 DAQ, strain gages" },
    ],
    blocks: [
      {
        type: "prose",
        kicker: "Question",
        heading: "How does propeller twist affect efficiency?",
        paragraphs: [
          "Say you're picking a propeller for an RC aircraft. Two props with the same diameter and different pitch will pull different thrust and draw different power from the same motor. We wanted to measure which one gives you more thrust per watt.",
        ],
      },
      {
        type: "specs",
        kicker: "Test rig",
        heading: "What we built",
        rows: [
          {
            label: "Thrust stand",
            value: "A cantilevered carbon fiber beam with the motor mounted at the tip. Thrust bends the beam.",
          },
          {
            label: "Thrust sensing",
            value: "Two strain gages at the beam root, one on top and one on the bottom. They're wired as a Wheatstone half bridge with two 350 Ω dummy resistors.",
          },
          {
            label: "Signal conditioning",
            value: "AD623 instrumentation amplifier with a 2.7 kΩ gain resistor. That works out to a gain of about 38.",
          },
          {
            label: "RPM sensing",
            value: "A 650 nm laser pointer shines through the prop disk onto a silicon photodiode. The blades break the beam twice per revolution.",
          },
          { label: "Drive", value: "2300 Kv brushless motor, 20 A ESC, and a servo tester for the PWM signal. An 11.1 V supply stands in for a 3-cell LiPo." },
          { label: "Power", value: "Inline watt meter that reads voltage, current, and power." },
          { label: "Data acquisition", value: "NI-9215 DAQ into LabVIEW." },
          { label: "Propellers", value: "APC 6x6E and APC 6x5.5E. Same 6 inch diameter, different pitch." },
        ],
      },
      {
        type: "figure",
        image: {
          id: "propeller/breadboard-circuit",
          alt: "Breadboard with labeled photodiode and AD623 amplifier circuits wired into DAQ screw terminals",
          caption: "Strain gage bridge, amplifier, and photodiode circuit.",
        },
      },
      {
        type: "prose",
        kicker: "Problem we hit",
        heading: "At first the thrust signal was lost in the noise",
        paragraphs: [
          "In the early runs, we couldn't tell the strain gage output apart from the DAQ's digitization error. Adding the instrumentation amplifier raised the bridge output by a factor of about 38. After that the thrust signal was usable.",
          "Before bonding the gages, we sanded the beam with 80, 120, and 220 grit paper and cleaned it with isopropyl alcohol.",
        ],
      },
      {
        type: "steps",
        kicker: "Method",
        heading: "Calibrate, then run",
        items: [
          {
            title: "Calibrate the beam",
            body: "We hung brass slotted weights from the beam tip, going from 0 to 250 g and back down, and recorded bridge voltage at each step. The loading and unloading lines matched. The slope became our volts-to-force constant.",
          },
          {
            title: "Run each propeller",
            body: "Record 5 seconds at rest. Run the motor at a fixed 1425 µs PWM signal and record 5 seconds at speed. Then 5 more seconds at rest. Power came off the watt meter.",
          },
          {
            title: "Process the data",
            body: "We applied the calibration constant and smoothed the force trace with a Gaussian filter. RPM came from the time between photodiode pulses.",
          },
        ],
      },
      {
        type: "gallery",
        columns: 3,
        images: [
          {
            id: "propeller/strain-gage-calibration",
            alt: "Plot of bridge voltage against weight in newtons, with loading and unloading lines overlapping",
            caption: "Calibration. Loading and unloading overlap.",
            light: true,
          },
          {
            id: "propeller/force-vs-time-trial-1",
            alt: "Plot of thrust force against time for both propellers in trial 1",
            caption: "Thrust during trial 1. The 6x5.5 trace sits higher.",
            light: true,
          },
          {
            id: "propeller/photodiode-output",
            alt: "Photodiode voltage against time for each propeller, showing regular dips as blades cross the laser",
            caption: "Photodiode pulses we used to compute RPM.",
            light: true,
          },
        ],
      },
      {
        type: "table",
        kicker: "Results",
        heading: "The lower-pitch prop made more thrust per watt",
        columns: ["Trial", "Propeller", "Thrust (g)", "Power (W)", "Thrust per watt (g/W)", "Measured RPM"],
        rows: [
          ["1", "APC 6x6E", "129.2", "45.55", "2.84", "26,453"],
          ["1", "APC 6x5.5E", "143.6", "46.70", "3.08", "27,705"],
          ["2", "APC 6x6E", "129.0", "44.25", "2.91", "25,883"],
          ["2", "APC 6x5.5E", "146.1", "47.30", "3.30", "26,272"],
        ],
        note: "Propagated uncertainty on thrust per watt stayed under 2% for both propellers. Measured RPM was within 3% of what motor Kv and supply voltage predict.",
      },
      {
        type: "list",
        kicker: "Takeaways",
        heading: "What the data says, and what it doesn't",
        items: [
          "The 6x5.5 propeller made more thrust per watt in both trials. It was 3.08 against 2.84 g/W in the first, then 3.30 against 2.91 g/W in the second.",
          "The 6x6 drew slightly less power at this throttle setting, but it also made less thrust.",
          "Thrust for each propeller repeated closely from one trial to the next.",
          "Limit: Every run used a single throttle setting, so the ranking could change at other speeds. The next step would be a sweep across throttle with a wider range of pitches.",
        ],
      },
      // TODO(résumé mismatch): the résumé says "3 different propeller twists" and "12+ automated
      // LabVIEW trials across blade pitches of 5.0 to 6.5 degrees". The final report documents
      // 2 propellers (6x6E, 6x5.5E; pitch in inches) and 2 trials. This page follows the report.
      // If more runs exist, add them to the results table above.
    ],
  },
];
