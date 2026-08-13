import { AngleMode } from "../types/calculator";
import { CONSTANTS } from "./constants";
import { evaluateFunction, factorial } from "./functions";
import { parseToRPN } from "./parser";
import { tokenize } from "./tokenizer";

export function evaluateExpression(
  expression: string,
  angleMode: AngleMode = "DEG",
): number {
  if (!expression || expression.trim() === "") {
    return 0;
  }

  const tokens = tokenize(expression);
  const rpn = parseToRPN(tokens);
  const stack: number[] = [];

  for (const token of rpn) {
    if (token.type === "NUMBER") {
      const val = parseFloat(token.value);
      if (isNaN(val)) throw new Error("Invalid expression");
      stack.push(val);
    } else if (token.type === "CONSTANT") {
      const val = CONSTANTS[token.value];
      if (val === undefined) throw new Error("Unknown constant");
      stack.push(val);
    } else if (token.type === "POSTFIX") {
      if (stack.length < 1) throw new Error("Invalid expression");
      const val = stack.pop()!;
      if (token.value === "!") {
        stack.push(factorial(val));
      } else if (token.value === "%") {
        stack.push(val / 100);
      }
    } else if (token.type === "FUNCTION") {
      if (token.value === "negate") {
        if (stack.length < 1) throw new Error("Invalid expression");
        stack.push(-stack.pop()!);
      } else {
        if (stack.length < 1) throw new Error("Invalid expression");
        const arg = stack.pop()!;
        stack.push(evaluateFunction(token.value, arg, angleMode));
      }
    } else if (token.type === "OPERATOR") {
      if (stack.length < 2) throw new Error("Invalid expression");
      const b = stack.pop()!;
      const a = stack.pop()!;

      switch (token.value) {
        case "+":
          stack.push(a + b);
          break;
        case "−":
        case "-":
          stack.push(a - b);
          break;
        case "×":
        case "*":
          stack.push(a * b);
          break;
        case "÷":
        case "/":
          if (b === 0) throw new Error("Cannot divide by zero");
          stack.push(a / b);
          break;
        case "mod":
          if (b === 0) throw new Error("Cannot divide by zero");
          stack.push(a % b);
          break;
        case "^":
          stack.push(Math.pow(a, b));
          break;
        default:
          throw new Error(`Unknown operator: ${token.value}`);
      }
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression");
  }

  const finalResult = stack[0];
  if (!isFinite(finalResult)) {
    throw new Error("Overflow");
  }

  // Clean precision issues like 0.1 + 0.2 = 0.30000000000000004
  return Number(Math.round(Number(finalResult + "e12")) + "e-12");
}

export function formatResult(val: number): string {
  if (isNaN(val)) return "Error";
  if (!isFinite(val)) return "Overflow";

  const absVal = Math.abs(val);
  if (absVal > 0 && (absVal >= 1e11 || absVal < 1e-7)) {
    return val.toExponential(6).replace(/\+/, "");
  }

  return val.toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
}
