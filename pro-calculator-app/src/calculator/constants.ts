export const CONSTANTS: Record<string, number> = {
  π: Math.PI,
  e: Math.E,
};

export const OPERATOR_PRECEDENCE: Record<
  string,
  { precedence: number; associativity: "LEFT" | "RIGHT" }
> = {
  "+": { precedence: 1, associativity: "LEFT" },
  "−": { precedence: 1, associativity: "LEFT" },
  "-": { precedence: 1, associativity: "LEFT" },
  "×": { precedence: 2, associativity: "LEFT" },
  "*": { precedence: 2, associativity: "LEFT" },
  "÷": { precedence: 2, associativity: "LEFT" },
  "/": { precedence: 2, associativity: "LEFT" },
  mod: { precedence: 2, associativity: "LEFT" },
  "^": { precedence: 3, associativity: "RIGHT" },
};
