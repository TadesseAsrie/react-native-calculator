import { evaluateExpression } from "../src/calculator/calculatorEngine";

describe("Calculator Engine Tests", () => {
  test("Basic Arithmetic Operations", () => {
    expect(evaluateExpression("2 + 2")).toBe(4);
    expect(evaluateExpression("10 - 5")).toBe(5);
    expect(evaluateExpression("5 × 5")).toBe(25);
    expect(evaluateExpression("20 ÷ 4")).toBe(5);
  });

  test("Operator Precedence & Parentheses", () => {
    expect(evaluateExpression("2 + 3 × 4")).toBe(14);
    expect(evaluateExpression("(2 + 3) × 4")).toBe(20);
    expect(evaluateExpression("10 + 5 × 2")).toBe(20);
    expect(evaluateExpression("(10 + 5) × 2")).toBe(30);
  });

  test("Powers and Roots", () => {
    expect(evaluateExpression("√25")).toBe(5);
    expect(evaluateExpression("2^2")).toBe(4);
    expect(evaluateExpression("2^3")).toBe(8);
    expect(evaluateExpression("2^5")).toBe(32);
    expect(evaluateExpression("∛27")).toBe(3);
  });

  test("Factorial", () => {
    expect(evaluateExpression("5!")).toBe(120);
    expect(evaluateExpression("0!")).toBe(1);
  });

  test("Trigonometry in DEG mode", () => {
    expect(evaluateExpression("sin(30)", "DEG")).toBeCloseTo(0.5);
    expect(evaluateExpression("cos(60)", "DEG")).toBeCloseTo(0.5);
  });

  test("Logarithms and Constants", () => {
    expect(evaluateExpression("log(100)")).toBe(2);
    expect(evaluateExpression("ln(e)")).toBe(1);
    expect(evaluateExpression("2×π")).toBeCloseTo(2 * Math.PI);
  });

  test("Error handling", () => {
    expect(() => evaluateExpression("2 ÷ 0")).toThrow("Cannot divide by zero");
    expect(() => evaluateExpression("√(-4)")).toThrow(
      "Square root of negative number",
    );
    expect(() => evaluateExpression("log(-10)")).toThrow("Domain error");
    expect(() => evaluateExpression("(2 + 3")).toThrow("Malformed parentheses");
  });
});
