import type { CaseStudy } from "../types";

/**
 * CASE STUDY 01 — Subaru of New England · Vehicle Allocation
 * Proves: "I can design complex products."
 *
 * Truthfulness rules for this file:
 *  - Scope numbers (65 retailers, 6 districts, 3 roles, ~12 steps, ~500 vehicles)
 *    are context, never outcomes.
 *  - Numbers visible inside screenshots are sample/interface data.
 *  - No research counts, quotes, or post-launch metrics are claimed.
 *  - Anything in [BRACKETS] still needs Jiani's input.
 */
const IMG = "/work/subaru";

export const subaru: CaseStudy = {
  slug: "subaru-vehicle-allocation",
  index: "01",
  kind: "Product design",
  layout: "product",
  title: "Subaru of New England",
  subtitle: "Untangling a complex vehicle allocation process",
  proves:
    "Complex systems, multiple roles and real business rules, resolved into a product people can operate.",
  thesis:
    "Transforming a complex vehicle allocation process into a connected experience across Sales Operations, six districts, and 65 retailers.",
  company: "Subaru of New England",
  role: "Lead Designer",
  timeframe: "[NEED INPUT: years]",
  team: "[NEED INPUT: who you worked with]",
  disciplines: ["Complex systems", "Enterprise product", "Workflow design"],
  stack: [],
  hero: {
    eyebrow: "Subaru of New England · Vehicle Allocation",
    image: {
      src: `${IMG}/allocation-redesign.jpg`,
      alt: "Redesigned Allocation screen: allocation number and date, a summary of vehicle statuses, and a searchable table of allocated vehicles.",
      caption: "The redesigned Allocation view. Figures shown are sample interface data.",
    },
    facts: [
      { k: "Role", v: "Lead Designer" },
      { k: "Product", v: "Retailer Operations Platform" },
      { k: "Scope", v: "Vehicle Allocation" },
      { k: "Network", v: "65 Retailers · 6 Districts" },
    ],
    metricsLabel: "Scope",
    metricsNote:
      "These describe the scale of the problem, not results. The redesigned direction brought a fragmented allocation workflow into a more coherent, role-aware product experience.",
  },
  card: {
    subtitleLines: ["Untangling a complex", "vehicle allocation process."],
    facts: [
      { k: "Years", v: "2022–2024" },
      { k: "Role", v: "Lead Designer" },
      { k: "Scope", v: "Vehicle allocation, retailer operations platform" },
      { k: "Focus", v: "Complex systems, workflow design" },
    ],
    tags: ["Complex systems", "Enterprise product", "Workflow design"],
    image: {
      src: `${IMG}/allocation-redesign.jpg`,
      alt: "Redesigned Allocation screen from the retailer operations platform.",
    },
  },
  headlineMetrics: [
    { value: "65", label: "Retailers" },
    { value: "6", label: "Districts" },
    { value: "3", label: "Primary roles" },
    { value: "1", label: "Shared allocation experience" },
  ],
  summary:
    "Vehicle allocation at Subaru of New England: a monthly process that moves vehicles from the distributor through six districts to 65 retailers. The work focused on transforming a complex vehicle allocation process into a connected experience across Sales Operations, six districts, and 65 retailers, rather than just modernizing an old interface.",
  keywords: [
    "subaru",
    "allocation",
    "vehicle",
    "retailer",
    "district",
    "workflow",
    "complex systems",
    "enterprise",
    "information architecture",
    "role-based",
    "legacy",
    "density",
  ],
  chapters: [
    {
      id: "context",
      label: "Context",
      headline: "Every month, vehicles had to move through a network of people, systems and decisions.",
      blocks: [
        {
          type: "prose",
          body: [
            "Subaru of New England distributes vehicles to Subaru retailers across the region. Each month it receives vehicle supply and decides which retailer gets which vehicles. That decision, and everything needed to carry it out, is called allocation.",
          ],
        },
        {
          type: "chain",
          direction: "row",
          steps: [
            { label: "Vehicle supply" },
            { label: "Subaru of New England", note: "Sales Operations" },
            { label: "6 districts", note: "District Sales Managers" },
            { label: "65 retailers" },
          ],
        },
        {
          type: "columns",
          title: "Three groups take part",
          items: [
            { title: "Sales Operations", body: "Prepares and runs the allocation at Subaru of New England." },
            { title: "District Sales Managers", body: "Six of them, each managing allocation for the retailers in a district." },
            { title: "Retailers", body: "65 Subaru retailers that need to know what they have been allocated, and act on it." },
          ],
        },
      ],
    },
    {
      id: "problem",
      label: "The real problem",
      headline: "The interface was old. The bigger problem was underneath it.",
      blocks: [
        {
          type: "prose",
          body: [
            "The brief looked like a modernization project. Mapping the process showed something else: allocation had become a fragmented workflow, spread across separate applications, reports, a spreadsheet and a series of handoffs between roles.",
          ],
        },
        {
          type: "image",
          src: `${IMG}/current-state-map.png`,
          alt: "Current-state allocation process map showing Sales Operations working in SNE Advantage and SNE Web, District Sales Managers in a separate mobile application, and retailers in Subaru Solutions.",
          label: "Current-state process map",
          scroll: true,
          caption: "The full map I drew of the existing process. You don't need to read every box; its size is the point.",
        },
        {
          type: "table",
          title: "The same process, in plain terms",
          head: ["Who", "Where they worked", "What happened there"],
          rows: [
            ["Sales Operations", "SNE Advantage", "Pre-allocation checks, a roughly 12-step allocation process, and allocation reports."],
            ["Sales Operations", "SNE Web + a spreadsheet", "Distributing vehicles and discretionary vehicles to the six districts, then checking the numbers against the spreadsheet."],
            ["District Sales Managers", "A separate mobile application", "Viewing allocated vehicles by allocation, district and retailer; accessorizing; purchasing."],
            ["Retailers", "Subaru Solutions", "Viewing the allocation summary, then building a car or transferring a vehicle."],
          ],
        },
        {
          type: "metrics",
          title: "Scale of the workflow",
          items: [
            { value: "3", label: "Primary roles" },
            { value: "~12", label: "Steps in the core allocation process" },
            { value: "~500", label: "Vehicles updated by hand in one part of the legacy workflow" },
          ],
        },
      ],
    },
    {
      id: "operating-model",
      label: "Understanding the operating model",
      headline: "Before redesigning screens, I mapped how the work actually moved.",
      blocks: [
        {
          type: "prose",
          body: [
            "This was not a large formal research study. I worked from the existing systems and their outputs, from the domain knowledge of the people who ran the process, and from a small number of retailer visits that gave me context for how the work looked on the receiving end.",
            "The questions were simple. Who is involved? What is each role responsible for? Where does information move, and where does the work cross from one system to another?",
          ],
        },
        {
          type: "image",
          src: `${IMG}/current-state-salesops.png`,
          alt: "Detail of the process map: Sales Operations uses SNE Advantage for pre-allocation checks, a twelve-step allocation process and allocation reports.",
          label: "Detail · Sales Operations",
          caption: "Preparation alone ran through pre-checks, twelve steps and a set of reports. Allocation did not happen until step 10 was complete.",
        },
        {
          type: "image",
          src: `${IMG}/current-state-retailers.png`,
          alt: "Detail of the process map: retailers use Subaru Solutions to view the allocation summary, then build a car or transfer.",
          label: "Detail · Retailers",
          caption: "A handoff the map made visible: retailers could see how many vehicles they had been allocated, but could not accessorize until a District Sales Manager had purchased or flagged the vehicles for them.",
        },
      ],
    },
    {
      id: "insight",
      label: "Key insight",
      headline: "One process didn't mean one experience.",
      blocks: [
        {
          type: "prose",
          body: ["The three groups were part of the same allocation, but they were doing different jobs with it."],
        },
        {
          type: "columns",
          items: [
            { title: "Sales Operations", body: "Prepare and manage the allocation. Highest complexity, highest control." },
            { title: "District Sales Managers", body: "Understand and manage allocation for their district. District-level visibility and actions." },
            { title: "Retailers", body: "Understand what has been allocated to them. A few focused downstream actions." },
          ],
        },
        {
          type: "callout",
          kind: "insight",
          title: "Shared system. Role-aware experiences.",
          body: "This was a design response to the responsibilities the map revealed, not the result of a usability study: unify the system, and organize what each role sees around what that role has to do.",
        },
      ],
    },
    {
      id: "reframing",
      label: "Reframing the system",
      headline: "From fragmented tools to role-aware workflows.",
      blocks: [
        {
          type: "prose",
          body: [
            "The challenge was to create one coherent experience without exposing every function to every user. Giving everyone the same dashboard would have moved the complexity, not reduced it.",
            "The proposed structure brings the three roles into a single application. Each role lands on its own screen, and the allocation area opens onto the capabilities that role is responsible for.",
          ],
        },
        {
          type: "image",
          src: `${IMG}/proposed-process.png`,
          alt: "Proposed process: Sales Operations, District Sales Managers and retailers enter one application, each with a personalized landing screen and a role-specific allocation menu.",
          label: "Proposed process",
        },
        {
          type: "columns",
          title: "What each role gets in Allocation",
          items: [
            { title: "Sales Operations", body: "Inventory data, allocation pre-check, the step-by-step allocation process, discretionary allocation, reports." },
            { title: "District Sales Managers", body: "District allocation summary, allocation process, bulk accessorize, reports." },
            { title: "Retailers", body: "Allocation summary, and allocation by allocation number." },
          ],
        },
      ],
    },
    {
      id: "redesign",
      label: "Redesigning allocation",
      headline: "From raw allocation data to operational awareness.",
      blocks: [
        {
          type: "compare",
          before: {
            src: `${IMG}/legacy-allocation-report.jpg`,
            alt: "Legacy vehicle allocation list: a plain table of vehicles with totals listed as text underneath.",
            label: "Legacy allocation list",
          },
          after: {
            src: `${IMG}/allocation-redesign.jpg`,
            alt: "Redesigned Allocation screen with summary, status breakdown and vehicle table.",
            label: "Redesigned Allocation",
          },
          caption: "The same allocation, number 1255. All the information in the legacy list is still there; what changed is the order you meet it in.",
        },
        {
          type: "image",
          src: `${IMG}/allocation-redesign.jpg`,
          alt: "Redesigned Allocation screen with five numbered areas: context, overview, status, vehicle detail and actions.",
          pins: [
            { x: 17, y: 24, title: "Context", body: "Which allocation am I looking at? Number and date, with the previous allocation one tab away." },
            { x: 37, y: 28, title: "Overview", body: "The allocation as a whole, before any single vehicle." },
            { x: 54, y: 28, title: "Status", body: "Available, sold, saved, unsold, transferred in and out, discretionary." },
            { x: 35, y: 72, title: "Vehicle detail", body: "One row per vehicle, with model, color, status and accessory list." },
            { x: 88, y: 45, title: "Actions", body: "Search, filter by order type, copy, export, print, bulk accessorize." },
          ],
          caption: "Figures shown are sample interface data.",
        },
      ],
    },
    {
      id: "principle",
      label: "Overview → Detail → Action",
      headline: "Understand the whole, inspect the part, then act.",
      blocks: [
        {
          type: "image",
          src: `${IMG}/allocation-overview.jpg`,
          alt: "Overview: allocation number and date beside a status summary and counts of vehicles for sale and sold.",
          label: "01 · Overview",
          caption: "The totals that sat as plain text under the legacy list now come first.",
        },
        {
          type: "image",
          src: `${IMG}/allocation-detail.jpg`,
          alt: "Detail: the vehicle table with model, color, description, status and accessory columns.",
          label: "02 · Detail",
          caption: "Individual vehicles, with status readable at a glance down the column.",
        },
        {
          type: "image",
          src: `${IMG}/allocation-actions.jpg`,
          alt: "Actions: rows-per-page, search, a filter for all, retail order or service loaner, and copy, export and print.",
          label: "03 · Action",
          caption: "The legacy list explained R and L prefixes in its title. Here they became a filter.",
        },
      ],
    },
    {
      id: "density",
      label: "Simplifying without oversimplifying",
      headline: "Operational software still needs information density.",
      blocks: [
        {
          type: "prose",
          body: [
            "People who run an allocation need to compare many vehicles at once. Removing columns to make the screen look clean would have made them slower, so the table keeps its eleven columns.",
            "The work went into hierarchy instead: a summary above the table, status as a colored label, truncation where full text isn't needed to decide, and search and filters to narrow the set.",
          ],
        },
        {
          type: "image",
          src: `${IMG}/allocation-table.jpg`,
          alt: "The redesigned vehicle table showing ten vehicles across eleven columns with sold and unsold status labels and pagination.",
        },
        {
          type: "statement",
          body: "The question wasn't “How can I show less?”",
          sub: "It was “What needs to be understood together?”",
        },
      ],
    },
    {
      id: "ecosystem",
      label: "Broader retailer ecosystem",
      headline: "Allocation was only one part of the system.",
      blocks: [
        {
          type: "prose",
          body: [
            "The same retailer platform also supported custom vehicle orders, network inventory and vehicle transfers, giving retailers a more connected operational experience.",
          ],
        },
        {
          type: "gallery",
          items: [
            {
              src: `${IMG}/build-a-car.jpg`,
              alt: "Build a Car screen: configuring an Outback with colors and accessories beside customer details and an order summary.",
              title: "Build a Car",
              body: "Configure a customer order, add options and customer details, save a draft, submit.",
            },
            {
              src: `${IMG}/inventory.jpg`,
              alt: "Inventory screen: a table of vehicles with status labels such as inventory, in transit and on order.",
              title: "Inventory",
              body: "See what is in inventory, in transit or on order across the network.",
            },
            {
              src: `${IMG}/inventory-transfer.jpg`,
              alt: "Row menu in Inventory with actions including Transfer.",
              title: "Transfers",
              body: "Move vehicles between retailers, started from the vehicle itself.",
            },
          ],
        },
      ],
    },
  ],
  lessons: [
    {
      title: "Complexity isn't always something to remove",
      body: "In operational products, complexity often represents real business rules, dependencies and decisions. My job wasn't to hide all of it. It was to tell accidental complexity from necessary complexity, then make the system easier to understand and operate.",
    },
    {
      title: "The product is more than the screen",
      body: "This project reinforced another lesson: the product is also the rules, states, permissions and behaviors underneath what is visible.",
    },
  ],
};
