import { AngleMode } from "../types/calculator";

const toRadians = (deg: number): number => (deg * Math.PI) / 180;
const toDegrees = (rad: number): number => (rad * 180) / Math.PI;

export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error("Invalid factorial input");
  }
  if (n > 170) {
    throw new Error("Overflow");
  }
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

export function evaluateFunction(
  funcName: string,
  arg: number,
  angleMode: AngleMode,
): number {
  switch (funcName) {
    case "sin":
      return Math.sin(angleMode === "DEG" ? toRadians(arg) : arg);
    case "cos":
      return Math.cos(angleMode === "DEG" ? toRadians(arg) : arg);
    case "tan": {
      const rad = angleMode === "DEG" ? toRadians(arg) : arg;
      if (Math.abs(Math.cos(rad)) < 1e-15) {
        throw new Error("Math error");
      }
      return Math.tan(rad);
    }
    case "sin⁻¹":
    case "asin": {
      if (arg < -1 || arg > 1) throw new Error("Domain error");
      const res = Math.asin(arg);
      return angleMode === "DEG" ? toDegrees(res) : res;
    }
    case "cos⁻¹":
    case "acos": {
      if (arg < -1 || arg > 1) throw new Error("Domain error");
      const res = Math.acos(arg);
      return angleMode === "DEG" ? toDegrees(res) : res;
    }
    case "tan⁻¹":
    case "atan": {
      const res = Math.atan(arg);
      return angleMode === "DEG" ? toDegrees(res) : res;
    }
    case "sinh":
      return Math.sinh(arg);
    case "cosh":
      return Math.cosh(arg);
    case "tanh":
      return Math.tanh(arg);
    case "log":
      if (arg <= 0) throw new Error("Domain error");
      return Math.log10(arg);
    case "ln":
      if (arg <= 0) throw new Error("Domain error");
      return Math.log(arg);
    case "log₂":
      if (arg <= 0) throw new Error("Domain error");
      return Math.log2(arg);
    case "√":
    case "sqrt":
      if (arg < 0) throw new Error("Square root of negative number");
      return Math.sqrt(arg);
    case "∛":
    case "cbrt":
      return Math.cbrt(arg);
    case "1/x":
      if (arg === 0) throw new Error("Cannot divide by zero");
      return 1 / arg;
    case "10ˣ":
      return Math.pow(10, arg);
    case "eˣ":
      return Math.exp(arg);
    case "abs":
      return Math.abs(arg);
    case "floor":
      return Math.floor(arg);
    case "ceil":
      return Math.ceil(arg);
    default:
      throw new Error(`Unknown function: ${funcName}`);
  }
}
