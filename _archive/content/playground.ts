export type PlaygroundItem = {
  id: string;
  title: string;
  category:
    | "Motion"
    | "Interaction"
    | "Type"
    | "Brand"
    | "Systems"
    | "Graphic";
  year: string;
  note: string;
  /** Which live demo component renders in the tile. */
  demo:
    | "easing"
    | "typescale"
    | "tokens"
    | "cursor"
    | "marks"
    | "grid"
    | "components"
    | "stagger";
  span?: "wide" | "tall";
};

export const playground: PlaygroundItem[] = [
  {
    id: "easing",
    title: "An easing library with opinions",
    category: "Motion",
    year: "2025",
    note:
      "Six curves, each with a written rule for when to use it. Motion systems fail because engineers pick a duration at random — the fix is naming the intent, not publishing a cubic-bezier.",
    demo: "easing",
    span: "wide",
  },
  {
    id: "typescale",
    title: "Optical scale, not mathematical scale",
    category: "Type",
    year: "2025",
    note:
      "A modular scale ruins large text: tracking that reads well at 16px is loose at 96px. This specimen ties letter-spacing and line-height to size as a continuous function.",
    demo: "typescale",
    span: "tall",
  },
  {
    id: "tokens",
    title: "Semantic colour without a palette explosion",
    category: "Systems",
    year: "2024",
    note:
      "Eleven semantic tokens covering light, dark and high-contrast. Every theme in this site is these eleven values. Designers reach for hex codes when the token names don't match how they think.",
    demo: "tokens",
  },
  {
    id: "cursor",
    title: "Cursor as a state channel",
    category: "Interaction",
    year: "2025",
    note:
      "Custom cursors are usually decoration. Here the cursor carries one job — telling you what a hover will do before you commit. It disappears entirely on touch and for reduced-motion users.",
    demo: "cursor",
  },
  {
    id: "marks",
    title: "Marks for products that don't exist yet",
    category: "Brand",
    year: "2023–25",
    note:
      "Identity studies from concept work. Drawn on a 24-unit grid so they survive being rendered at 16px in a nav bar, which is where logos actually live.",
    demo: "marks",
    span: "wide",
  },
  {
    id: "grid",
    title: "The 12-column grid, interrogated",
    category: "Graphic",
    year: "2024",
    note:
      "Editorial layout studies. Most product design uses one column arrangement forever; varying the measure is the cheapest way to create hierarchy without adding weight.",
    demo: "grid",
  },
  {
    id: "components",
    title: "A component API is a design decision",
    category: "Systems",
    year: "2024",
    note:
      "Same button, three API shapes. The one you choose determines how many variants exist in eighteen months. Design systems rot at the prop level, not the pixel level.",
    demo: "components",
  },
  {
    id: "stagger",
    title: "Stagger as reading order",
    category: "Motion",
    year: "2025",
    note:
      "Entrance animation should teach hierarchy, not perform. Below 40ms the stagger reads as one object; above 120ms it reads as a queue. The window is narrower than people think.",
    demo: "stagger",
  },
];
