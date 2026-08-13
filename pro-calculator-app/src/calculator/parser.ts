import { Token } from "../types/calculator";
import { OPERATOR_PRECEDENCE } from "./constants";

export function parseToRPN(tokens: Token[]): Token[] {
  const outputQueue: Token[] = [];
  const operatorStack: Token[] = [];

  for (const token of tokens) {
    if (token.type === "NUMBER" || token.type === "CONSTANT") {
      outputQueue.push(token);
    } else if (token.type === "FUNCTION") {
      operatorStack.push(token);
    } else if (token.type === "POSTFIX") {
      outputQueue.push(token);
    } else if (token.type === "OPERATOR") {
      const tokenOp = OPERATOR_PRECEDENCE[token.value] || {
        precedence: 1,
        associativity: "LEFT",
      };

      while (operatorStack.length > 0) {
        const top = operatorStack[operatorStack.length - 1];
        if (top.type === "OPERATOR") {
          const topOp = OPERATOR_PRECEDENCE[top.value] || {
            precedence: 1,
            associativity: "LEFT",
          };
          if (
            (tokenOp.associativity === "LEFT" &&
              tokenOp.precedence <= topOp.precedence) ||
            (tokenOp.associativity === "RIGHT" &&
              tokenOp.precedence < topOp.precedence)
          ) {
            outputQueue.push(operatorStack.pop()!);
            continue;
          }
        } else if (top.type === "FUNCTION") {
          outputQueue.push(operatorStack.pop()!);
          continue;
        }
        break;
      }
      operatorStack.push(token);
    } else if (token.type === "LPAREN") {
      operatorStack.push(token);
    } else if (token.type === "RPAREN") {
      let hasMatch = false;
      while (operatorStack.length > 0) {
        const top = operatorStack[operatorStack.length - 1];
        if (top.type === "LPAREN") {
          hasMatch = true;
          operatorStack.pop();
          break;
        }
        outputQueue.push(operatorStack.pop()!);
      }
      if (!hasMatch) {
        throw new Error("Malformed parentheses");
      }
      if (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1].type === "FUNCTION"
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
    }
  }

  while (operatorStack.length > 0) {
    const top = operatorStack.pop()!;
    if (top.type === "LPAREN" || top.type === "RPAREN") {
      throw new Error("Malformed parentheses");
    }
    outputQueue.push(top);
  }

  return outputQueue;
}
