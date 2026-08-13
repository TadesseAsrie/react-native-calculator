import { Token } from "../types/calculator";
import { CONSTANTS } from "./constants";

const FUNCTIONS = [
  "sin⁻¹",
  "cos⁻¹",
  "tan⁻¹",
  "sin",
  "cos",
  "tan",
  "sinh",
  "cosh",
  "tanh",
  "log₂",
  "log",
  "ln",
  "√",
  "∛",
  "10ˣ",
  "eˣ",
  "abs",
  "floor",
  "ceil",
];

export function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const cleanExp = expression.replace(/\s+/g, "");

  while (i < cleanExp.length) {
    const char = cleanExp[i];

    // Numbers (including decimals)
    if (/[0-9.]/.test(char)) {
      let numStr = "";
      let decimalCount = 0;
      while (i < cleanExp.length && /[0-9.]/.test(cleanExp[i])) {
        if (cleanExp[i] === ".") {
          decimalCount++;
          if (decimalCount > 1) throw new Error("Invalid expression");
        }
        numStr += cleanExp[i];
        i++;
      }
      tokens.push({ type: "NUMBER", value: numStr });
      continue;
    }

    // Constants
    let matchedConstant = false;
    for (const c of Object.keys(CONSTANTS)) {
      if (cleanExp.startsWith(c, i)) {
        tokens.push({ type: "CONSTANT", value: c });
        i += c.length;
        matchedConstant = true;
        break;
      }
    }
    if (matchedConstant) continue;

    // Functions
    let matchedFunc = false;
    for (const fn of FUNCTIONS) {
      if (cleanExp.startsWith(fn, i)) {
        tokens.push({ type: "FUNCTION", value: fn });
        i += fn.length;
        matchedFunc = true;
        break;
      }
    }
    if (matchedFunc) continue;

    // Special cases like 1/x
    if (cleanExp.startsWith("1/x", i)) {
      tokens.push({ type: "FUNCTION", value: "1/x" });
      i += 3;
      continue;
    }

    // Postfix Operator (!)
    if (char === "!") {
      tokens.push({ type: "POSTFIX", value: "!" });
      i++;
      continue;
    }

    // Percentage (%)
    if (char === "%") {
      tokens.push({ type: "POSTFIX", value: "%" });
      i++;
      continue;
    }

    // Operators
    if (["+", "−", "-", "×", "*", "÷", "/", "^"].includes(char)) {
      // Handle Unary Minus vs Subtraction
      if (char === "-" || char === "−") {
        const prevToken = tokens[tokens.length - 1];
        if (
          !prevToken ||
          prevToken.type === "OPERATOR" ||
          prevToken.type === "LPAREN"
        ) {
          // Unary minus treated as multiplying by -1 or negative number token if before number
          if (i + 1 < cleanExp.length && /[0-9.]/.test(cleanExp[i + 1])) {
            let numStr = "-";
            i++;
            let decimalCount = 0;
            while (i < cleanExp.length && /[0-9.]/.test(cleanExp[i])) {
              if (cleanExp[i] === ".") {
                decimalCount++;
                if (decimalCount > 1) throw new Error("Invalid expression");
              }
              numStr += cleanExp[i];
              i++;
            }
            tokens.push({ type: "NUMBER", value: numStr });
            continue;
          } else {
            // Unary operator as function
            tokens.push({ type: "FUNCTION", value: "negate" });
            i++;
            continue;
          }
        }
      }

      tokens.push({ type: "OPERATOR", value: char });
      i++;
      continue;
    }

    // Multi-char operator like 'mod'
    if (cleanExp.startsWith("mod", i)) {
      tokens.push({ type: "OPERATOR", value: "mod" });
      i += 3;
      continue;
    }

    // Parentheses
    if (char === "(") {
      tokens.push({ type: "LPAREN", value: "(" });
      i++;
      continue;
    }
    if (char === ")") {
      tokens.push({ type: "RPAREN", value: ")" });
      i++;
      continue;
    }

    throw new Error("Invalid expression");
  }

  // Handle Implicit Multiplication e.g., 2pi -> 2 * pi, 5(3+2) -> 5 * (3+2)
  const processedTokens: Token[] = [];
  for (let idx = 0; idx < tokens.length; idx++) {
    const curr = tokens[idx];
    const prev = tokens[idx - 1];

    if (prev) {
      const prevIsVal =
        prev.type === "NUMBER" ||
        prev.type === "CONSTANT" ||
        prev.type === "RPAREN" ||
        prev.type === "POSTFIX";
      const currIsVal =
        curr.type === "NUMBER" ||
        curr.type === "CONSTANT" ||
        curr.type === "FUNCTION" ||
        curr.type === "LPAREN";

      if (prevIsVal && currIsVal) {
        processedTokens.push({ type: "OPERATOR", value: "×" });
      }
    }
    processedTokens.push(curr);
  }

  return processedTokens;
}
