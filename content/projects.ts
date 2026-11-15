import type { Entry, VideoRef } from "./types";

/**
 * Projects, in résumé order. Each one gets its own article at /<slug>/ and a
 * short summary on the main article under Projects. `category` decides whether
 * it is listed under "Personal projects" or "Academic projects".
 *
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
    title: "BlastX Phantom",
    category: "personal",
    summary:
      "A full-size replica of the BlastX Phantom rifle skin from *VALORANT* that fires foam darts. I modeled it 1:1 in SolidWorks from in-game screenshots, then built it from 74 printed parts around the flywheel mechanism of an X-Shot toy blaster.",
    lead: [
      "The **BlastX Phantom** is a full-size, working replica I designed and built of the BlastX Phantom, a rifle skin in the video game *VALORANT* that is styled like a toy dart blaster. It matches the in-game model at 1:1 scale and fires foam darts using the flywheel mechanism from an X-Shot toy blaster.",
      "I modeled the assembly in SolidWorks from in-game screenshots and printed it as 74 parts on a Bambu Lab P1P. I built it in June and July 2026.",
    ],
    infobox: {
      image: {
        id: "blastx-phantom/finished-grass",
        alt: "Finished BlastX Phantom replica lying on grass: green, purple, white, and orange toy-style rifle with a long orange suppressor",
        caption: "The finished replica",
      },
      rows: [
        { label: "Type", value: "Personal project" },
        { label: "Dates", value: "June – July 2026" },
        { label: "Based on", value: "BlastX Phantom (*VALORANT*)" },
        { label: "Scale", value: "1:1 with the in-game model" },
        { label: "Printed parts", value: "74 (14 internal or moving)" },
        { label: "Min. wall", value: "2 mm" },
        { label: "Software", value: "SolidWorks" },
        { label: "Printer", value: "Bambu Lab P1P (FDM)" },
      ],
    },
    sections: [
      {
        heading: "Background",
        blocks: [
          {
            type: "multi",
            caption: "Left: the in-game skin. Right: the finished replica. *VALORANT* is a trademark of Riot Games; this is a fan-made replica.",
            images: [
              {
                id: "blastx-phantom/in-game-reference",
                alt: "The BlastX Phantom skin as shown in the VALORANT collection screen",
              },
              {
                id: "blastx-phantom/finished-bench",
                alt: "The finished printed and painted BlastX Phantom replica resting on a metal bench outdoors",
              },
            ],
          },
          {
            type: "prose",
            paragraphs: [
              "The BlastX Phantom is a cosmetic rifle skin in *VALORANT*, styled like a toy dart blaster. I wanted a full-size version that matched the in-game silhouette and could fire foam darts.",
              "The only reference available was in-game screenshots. The model was designed to look right on screen, with no space set aside for motors, a battery, or a magazine.",
            ],
          },
        ],
      },
      {
        heading: "Design",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "I modeled the full assembly to scale in SolidWorks from in-game screenshots. Parts that interface with the donor internals were dimensioned from caliper measurements of an X-Shot blaster. The model is split into 74 parts, each sized to fit the Bambu Lab P1P build plate.",
              "Before printing full-size parts, I printed the internal geometry as small standalone test pieces to check fit and tolerances. This caught fit problems early and reduced wasted filament and print time.",
            ],
          },
        ],
        subsections: [
          {
            heading: "Firing mechanism",
            blocks: [
              {
                type: "multi",
                caption: "Left: the original X-Shot internals. Right: the same components fitted into the printed frame.",
                images: [
                  {
                    id: "blastx-phantom/internals-donor",
                    alt: "Opened X-Shot blaster showing two white flywheels, battery tray, trigger assembly, and wiring in a blue shell",
                  },
                  {
                    id: "blastx-phantom/internals-fitted",
                    alt: "The flywheels and wiring installed in the gray printed frame of the replica, with the magazine well and trigger linkage visible",
                  },
                ],
              },
              {
                type: "prose",
                paragraphs: [
                  "The flywheel motors, battery, and wiring from the X-Shot blaster were moved into a printed frame shaped around the in-game model. The magazine release is a custom spring-loaded design.",
                ],
              },
            ],
          },
          {
            heading: "Design parameters",
            blocks: [
              {
                type: "list",
                items: [
                  "**Wall thickness:** 2 mm minimum; 4 mm or more for weight-bearing and moving parts.",
                  "**Shell:** two halves joined with the screws from the original blaster, so the shell can be reopened for repairs.",
                  "**Firing mechanism:** flywheel motors and battery from the donor blaster, repackaged to fit the in-game silhouette.",
                  "**Magazine release:** custom, spring loaded.",
                  "**Part count:** 74 printed parts, 14 of them internal or moving.",
                  "**Part sizing:** every part fits on the Bambu Lab P1P build plate.",
                ],
              },
            ],
          },
          {
            heading: "CAD model",
            blocks: [
              {
                type: "gallery",
                images: [
                  {
                    id: "blastx-phantom/cad-assembled",
                    alt: "SolidWorks render of the complete BlastX Phantom assembly in green, purple, white, and orange",
                    caption: "Complete assembly",
                  },
                  {
                    id: "blastx-phantom/cad-exploded",
                    alt: "Exploded SolidWorks view showing the shell halves, suppressor, magazine, stock, and internal parts separated",
                    caption: "Exploded view",
                  },
                  {
                    id: "blastx-phantom/cad-split",
                    alt: "SolidWorks view with one shell half pulled away to show the internal mechanism",
                    caption: "Shell split to show the internals",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Fabrication",
        blocks: [
          {
            type: "thumb",
            image: {
              id: "blastx-phantom/painted-parts",
              alt: "Painted green, white, purple, and orange shell parts laid out to dry, with a bottle of glue",
              caption: "Painted parts before assembly",
            },
          },
          {
            type: "prose",
            paragraphs: [
              "Every part was FDM printed on a Bambu Lab P1P, then sanded, primed, and painted in the four in-game colors.",
              "Parts belonging to the same body section were plastic-welded together after painting. The two main shell halves stay separate and screw together.",
            ],
          },
        ],
      },
      {
        heading: "Problems",
        blocks: [
          {
            type: "list",
            items: [
              "**Warping:** larger parts warped during printing, leaving small gaps at final assembly.",
              "**Supports:** print supports compromised tolerances, so mating surfaces needed extra finishing to fit cleanly.",
              "**Friction:** the moving parts work but would run more smoothly with more clearance.",
              "**Next revision:** the design files have been updated for a future print.",
            ],
          },
        ],
      },
      {
        heading: "Result",
        blocks: [
          {
            type: "multi",
            caption: "Left: the SolidWorks assembly. Right: the finished replica in the same orientation.",
            images: [
              { id: "blastx-phantom/cad-assembled", alt: "SolidWorks render of the complete assembly" },
              {
                id: "blastx-phantom/finished-grass",
                alt: "The finished replica lying on grass in the same orientation as the CAD render",
              },
            ],
          },
          {
            type: "prose",
            paragraphs: [
              "The finished blaster is full size, matches the in-game model, and fires foam darts with the repackaged flywheel mechanism. The shell opens with a screwdriver for access to the internals.",
            ],
          },
          { type: "video", video: phantomFiringVideo },
        ],
      },
    ],
  },

  {
    // No article of its own: shown only as a summary under Personal projects.
    slug: "chicken-coop",
    title: "Home Chicken Coop",
    category: "personal",
    page: false,
    summary:
      "A feed hopper with a portioning valve and a watering system fed from one central reservoir, built at home in Conroe, Texas, between March and June 2026 for a flock of more than 100 chickens. The hopper cut daily feeding time by 50%, and the watering system is modular so sections come out for cleaning and repair.",
    // TODO(photos): no photos of the coop were provided. Add them to media-src/chicken-coop/,
    // run `npm run media`, then add a thumbnail for "chicken-coop" in content/main-article.ts.
  },

  {
    slug: "nasa-usdc-9",
    title: "NASA USDC-9: Substrate Testing System",
    category: "academic",
    summary:
      "I led a four-person UT Austin team in NASA Glenn Research Center's 2024–2025 University Student Design Challenge (USDC-9). We designed a passive wicking system that moves fluid into and out of porous plant substrates in microgravity, with sensors to track where the fluid goes.",
    lead: [
      "The **USDC-9 substrate testing system** is a microgravity fluid-delivery test rig designed by a four-person UT Austin team that I led, for NASA Glenn Research Center's 2024–2025 University Student Design Challenge (USDC-9).",
      "The system uses nylon wicking strings instead of a pump to move fluid into and out of a porous plant substrate, and carries moisture, oxygen, and camera sensors to track where the fluid goes. I tested the wicking concept with 3 substrate materials and ranked them by absorption rate.",
    ],
    infobox: {
      rows: [
        { label: "Program", value: "2024–2025 GRC University Student Design Challenge (USDC-9)" },
        { label: "Sponsor", value: "NASA Glenn Research Center" },
        { label: "Institution", value: "The University of Texas at Austin" },
        { label: "Dates", value: "August 2024 – April 2025" },
        { label: "Role", value: "Team lead (4-person team)" },
        { label: "Phase", value: "Year 1 design" },
      ],
    },
    sections: [
      {
        heading: "Background",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "On Earth, gravity determines where water goes in soil. In orbit, fluid movement is governed by capillary forces, surface tension, and wetting, which makes watering plants a fluid management problem.",
              "The challenge was to design a test system that delivers fluid into a porous substrate in microgravity, extracts it again, and measures where the fluid goes and how much stays in the substrate.",
            ],
          },
        ],
      },
      {
        heading: "Role",
        blocks: [
          {
            type: "list",
            items: [
              "Led the four-person team from requirements definition through design reviews, including multiple presentations to NASA experts.",
              "Tested the conceptual wicking design with 3 substrate materials, documented fluid movement, and ranked them by absorption rate.",
              "Updated the 3D CAD through multiple design stages as sensor choices and testing constraints changed.",
            ],
          },
        ],
      },
      {
        heading: "Design",
        blocks: [
          {
            type: "list",
            intro:
              "One rig handles both fluid injection and extraction, takes interchangeable substrates, moves fluid passively, and carries its own sensors. It fits in a standard NanoLab container.",
            items: [
              "**Substrate container:** polyethylene, 7.5 × 7.5 × 5 cm, removable so substrates can be swapped.",
              "**Fluid reservoir:** polyethylene, 7.5 × 7.5 × 3 cm, about 169 mL.",
              "**Fluid delivery:** 8 parallel nylon wicking strings, 5 mm in diameter and 8 cm long, running from the reservoir through the substrate. There is no pump.",
              "**Sensing:** ECH2O EC-5 moisture sensor, an oxygen sensor, and an Arducam camera with LED lighting.",
              "**Controller:** Arduino Uno with a 4×AA battery pack.",
              "**Substrates:** Arcillite (calcined clay), and Arcillite mixed with hydrophobic Magic Sand.",
            ],
          },
        ],
        subsections: [
          {
            heading: "Wicking strings",
            blocks: [
              {
                type: "prose",
                paragraphs: [
                  "Active pumps and pressurized lines are difficult to scale up in space. Hydrophilic nylon strings move water by capillary action with no power.",
                  "The strings give the fluid a preferred path through the substrate, from which it can diffuse outward. In the mixed substrate, hydrophobic grains can block flow and leave dry pockets; the strings are expected to keep a continuous wet path through the volume.",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Analysis",
        blocks: [
          {
            type: "table",
            intro: "A first-order capillary model checked that the strings can move water on their own.",
            columns: ["Quantity", "Result", "Method"],
            rows: [
              ["Capillary pressure in a string", "≈ 1,218 Pa", "Young–Laplace equation"],
              ["Time for fluid to reach 25% of string length", "0.53 s", "Washburn equation"],
              ["Time to reach 50%", "2.10 s", "Washburn equation"],
              ["Time to wet the full 8 cm", "≈ 8.4 s", "Washburn equation"],
            ],
            note: "Inputs are assumed values for water at 22 °C on nylon: 0.072 N/m surface tension, 65° contact angle, 0.005 cm effective pore radius.",
          },
        ],
      },
      {
        heading: "Testing",
        blocks: [
          {
            type: "list",
            ordered: true,
            intro:
              "Two drop tower procedures were planned. Both start with a one-hour hold required by the drop tower, and the fluid is dyed so the camera can track the wetting front.",
            items: [
              "**Fluid injection:** fill the reservoir and place it below the substrate. Record moisture and oxygen readings, then drop. Fluid wicks from the reservoir into the substrate. Record again and review the video.",
              "**Fluid extraction:** saturate the substrate and place the reservoir above it. Record readings, then drop. Fluid moves from the substrate back to the reservoir. Compare moisture before and after.",
            ],
          },
        ],
      },
      {
        heading: "Results",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Year 1 produced the full system design, the capillary analysis, and the two test procedures. The analysis indicates that capillary pressure in the strings is enough to drive fluid through the system without active pumping.",
              "The final report recommended three areas for a second year: testing more substrate mixes to steer fluid placement, adding a denser sensor network to validate the model, and studying how a substrate changes over repeated wet and dry cycles.",
            ],
          },
        ],
      },
      // TODO(results): substrate ranking from the 3-material absorption tests is on the
      // résumé but not in the final report. Add a table block, for example:
      // { type: "table", columns: ["Substrate", "Observation", "Rank"], rows: [[...], [...], [...]] },
      // TODO(fmea): add the FMEA as a table block:
      // { type: "table", columns: ["Failure mode", "Effect", "Severity", "Mitigation"], rows: [...] },
      // TODO(test cases): add each test case as a "list" or "table" block.
      // TODO(images): CAD renders of the rig were not in the uploaded report. Add them
      // to media-src/usdc/ and reference them with a "thumb" or "gallery" block and an infobox `image`.
    ],
  },

  {
    slug: "propeller-thrust-optimization",
    title: "Propeller-Thrust Optimization",
    category: "academic",
    summary:
      "A strain-gage thrust stand with a laser-and-photodiode tachometer, built for ASE 375 at UT Austin to measure how propeller twist affects thrust per watt. We tested 3 propeller twists across blade pitches of 5.0° to 6.5° in more than 12 automated LabVIEW trials.",
    lead: [
      "**Propeller-Thrust Optimization** was a three-person test-rig project in ASE 375 Electromechanical Systems at UT Austin, from January to May 2024. We built a strain-gage thrust stand and a laser-and-photodiode tachometer to measure how propeller twist affects thrust per watt.",
      "We tested 3 propeller twists across blade pitches of 5.0° to 6.5° in more than 12 automated LabVIEW trials, converting raw voltages to thrust and RPM with calibration constants we derived.",
    ],
    infobox: {
      image: {
        id: "propeller/breadboard-circuit",
        alt: "Breadboard with the strain gage bridge, instrumentation amplifier, and photodiode circuit wired to DAQ terminals",
        caption: "Strain gage bridge, amplifier, and photodiode circuit",
      },
      rows: [
        { label: "Course", value: "ASE 375 Electromechanical Systems, UT Austin" },
        { label: "Dates", value: "January – May 2024" },
        { label: "Team", value: "3 people" },
        { label: "Propellers", value: "3 twists, 5.0°–6.5° blade pitch" },
        { label: "Trials", value: "12+ automated LabVIEW trials" },
        { label: "Tools", value: "LabVIEW, NI-9215 DAQ, strain gages" },
      ],
    },
    sections: [
      {
        heading: "Background",
        blocks: [
          {
            type: "prose",
            paragraphs: [
              "Propellers with the same diameter but different twist produce different thrust and draw different power from the same motor. The project measured which gives more thrust per watt, as a basis for propeller selection on small RC aircraft.",
            ],
          },
        ],
      },
      {
        heading: "Test rig",
        blocks: [
          {
            type: "list",
            items: [
              "**Thrust stand:** a cantilevered carbon fiber beam with the motor mounted at the tip; thrust bends the beam.",
              "**Thrust sensing:** two strain gages at the beam root, one on top and one on the bottom, wired as a Wheatstone half bridge with two 350 Ω dummy resistors.",
              "**Signal conditioning:** AD623 instrumentation amplifier with a 2.7 kΩ gain resistor, for a gain of about 38.",
              "**RPM sensing:** a 650 nm laser shines through the propeller disk onto a silicon photodiode. The blades break the beam twice per revolution.",
              "**Drive:** 2300 Kv brushless motor, 20 A ESC, and a servo tester for the PWM signal. An 11.1 V supply stands in for a 3-cell LiPo.",
              "**Power:** inline watt meter reading voltage, current, and power.",
              "**Data acquisition:** NI-9215 DAQ into LabVIEW.",
            ],
          },
        ],
        subsections: [
          {
            heading: "Signal conditioning",
            blocks: [
              {
                type: "prose",
                paragraphs: [
                  "In early runs the strain gage output could not be distinguished from the DAQ's digitization error. Adding the instrumentation amplifier raised the bridge output by a factor of about 38, which made the thrust signal usable.",
                  "Before bonding the gages, we sanded the beam with 80, 120, and 220 grit paper and cleaned it with isopropyl alcohol.",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Method",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Calibration:** brass slotted weights were hung from the beam tip from 0 to 250 g and back, recording bridge voltage at each step. The loading and unloading lines matched, and the slope became the volts-to-force constant.",
              "**Runs:** 5 seconds at rest, 5 seconds at a fixed 1425 µs PWM signal, then 5 more seconds at rest. Power was read from the watt meter.",
              "**Processing:** the calibration constant was applied and the force trace smoothed with a Gaussian filter. RPM came from the time between photodiode pulses.",
            ],
          },
          {
            type: "gallery",
            images: [
              {
                id: "propeller/strain-gage-calibration",
                alt: "Plot of bridge voltage against weight in newtons, with loading and unloading lines overlapping",
                caption: "Calibration; loading and unloading overlap",
                light: true,
              },
              {
                id: "propeller/force-vs-time-trial-1",
                alt: "Plot of thrust force against time for both propellers in trial 1",
                caption: "Thrust during a trial",
                light: true,
              },
              {
                id: "propeller/photodiode-output",
                alt: "Photodiode voltage against time for each propeller, showing regular dips as blades cross the laser",
                caption: "Photodiode pulses used to compute RPM",
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
            type: "table",
            intro: "Results from two of the trials:",
            columns: ["Trial", "Propeller", "Thrust (g)", "Power (W)", "Thrust per watt (g/W)", "Measured RPM"],
            rows: [
              ["1", "APC 6x6E", "129.2", "45.55", "2.84", "26,453"],
              ["1", "APC 6x5.5E", "143.6", "46.70", "3.08", "27,705"],
              ["2", "APC 6x6E", "129.0", "44.25", "2.91", "25,883"],
              ["2", "APC 6x5.5E", "146.1", "47.30", "3.30", "26,272"],
            ],
            note: "Propagated uncertainty on thrust per watt stayed under 2%. Measured RPM was within 3% of the value predicted from motor Kv and supply voltage.",
          },
          {
            type: "list",
            items: [
              "The lower-pitch propeller produced more thrust per watt in both trials shown: 3.08 vs. 2.84 g/W, then 3.30 vs. 2.91 g/W.",
              "The higher-pitch propeller drew slightly less power at this throttle setting but also produced less thrust.",
              "Thrust for each propeller repeated closely between trials.",
              "**Limitation:** every run used a single throttle setting, so the ranking could change at other speeds. A throttle sweep across a wider range of pitches would be the next step.",
            ],
          },
        ],
      },
      // TODO(résumé vs. report): the infobox and lead use the résumé numbers (3 twists, 12+ trials,
      // 5.0–6.5° pitch). The results table above is from the final report, which documents
      // 2 propellers (APC 6x6E, 6x5.5E; pitch in inches) and 2 trials. Add the other runs if you have them.
    ],
  },
];
