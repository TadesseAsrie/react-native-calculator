import * as Haptics from "expo-haptics";
import { useCallback, useState } from "react";
import {
  evaluateExpression,
  formatResult,
} from "../calculator/calculatorEngine";
import {
  AngleMode,
  CalculatorMode,
  CalculatorState,
} from "../types/calculator";

export function useCalculator(
  initialAngleMode: AngleMode = "DEG",
  initialMode: CalculatorMode = "standard",
  hapticsEnabled = true,
  onCalculationSuccess?: (expression: string, result: string) => void,
) {
  const [state, setState] = useState<CalculatorState>({
    expression: "",
    displayValue: "0",
    result: null,
    memory: 0,
    mode: initialMode,
    angleMode: initialAngleMode,
    isEvaluated: false,
    errorMessage: null,
  });

  const triggerHaptic = useCallback(() => {
    if (hapticsEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [hapticsEnabled]);

  const setAngleMode = (angleMode: AngleMode) => {
    triggerHaptic();
    setState((prev) => ({ ...prev, angleMode }));
  };

  const setMode = (mode: CalculatorMode) => {
    triggerHaptic();
    setState((prev) => ({ ...prev, mode }));
  };

  const clear = () => {
    triggerHaptic();
    setState((prev) => ({
      ...prev,
      expression: "",
      displayValue: "0",
      result: null,
      isEvaluated: false,
      errorMessage: null,
    }));
  };

  const deleteBack = () => {
    triggerHaptic();
    setState((prev) => {
      if (prev.isEvaluated) {
        return {
          ...prev,
          expression: "",
          displayValue: "0",
          isEvaluated: false,
          errorMessage: null,
        };
      }
      const exp = prev.expression;
      if (exp.length <= 1) {
        return {
          ...prev,
          expression: "",
          displayValue: "0",
          errorMessage: null,
        };
      }
      const updated = exp.slice(0, -1);
      return {
        ...prev,
        expression: updated,
        displayValue: updated,
        errorMessage: null,
      };
    });
  };

  const appendInput = (val: string) => {
    triggerHaptic();
    setState((prev) => {
      let exp = prev.expression;
      if (prev.isEvaluated) {
        // If starting with operator after evaluation, chain from previous result
        if (["+", "−", "×", "÷", "^", "mod"].includes(val) && prev.result) {
          exp = prev.result;
        } else {
          exp = "";
        }
      }

      // Prevent duplicate consecutive operators
      const lastChar = exp.slice(-1);
      const isCurrOp = ["+", "−", "×", "÷", "^", "%"].includes(val);
      const isLastOp = ["+", "−", "×", "÷", "^"].includes(lastChar);

      if (isCurrOp && isLastOp) {
        exp = exp.slice(0, -1) + val;
      } else {
        exp += val;
      }

      return {
        ...prev,
        expression: exp,
        displayValue: exp,
        isEvaluated: false,
        errorMessage: null,
      };
    });
  };

  const calculate = () => {
    triggerHaptic();
    if (!state.expression) return;

    try {
      const numericResult = evaluateExpression(
        state.expression,
        state.angleMode,
      );
      const formatted = formatResult(numericResult);

      setState((prev) => ({
        ...prev,
        result: formatted,
        displayValue: formatted,
        isEvaluated: true,
        errorMessage: null,
      }));

      if (onCalculationSuccess) {
        onCalculationSuccess(state.expression, formatted);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error";
      setState((prev) => ({
        ...prev,
        errorMessage: msg,
        result: null,
      }));
    }
  };

  const toggleSign = () => {
    triggerHaptic();
    setState((prev) => {
      if (prev.isEvaluated && prev.result) {
        const val = parseFloat(prev.result) * -1;
        const formatted = formatResult(val);
        return {
          ...prev,
          expression: formatted,
          displayValue: formatted,
          result: formatted,
        };
      }
      if (!prev.expression) return prev;
      if (prev.expression.startsWith("-")) {
        const updated = prev.expression.slice(1);
        return { ...prev, expression: updated, displayValue: updated };
      }
      const updated = `-${prev.expression}`;
      return { ...prev, expression: updated, displayValue: updated };
    });
  };

  // Memory Functions
  const memoryClear = () => {
    triggerHaptic();
    setState((prev) => ({ ...prev, memory: 0 }));
  };

  const memoryRecall = () => {
    triggerHaptic();
    if (state.memory === 0) return;
    appendInput(state.memory.toString());
  };

  const memoryAdd = () => {
    triggerHaptic();
    try {
      const currentVal =
        state.isEvaluated && state.result
          ? parseFloat(state.result)
          : evaluateExpression(state.expression || "0", state.angleMode);
      setState((prev) => ({ ...prev, memory: prev.memory + currentVal }));
    } catch {
      // Ignore if expression invalid
    }
  };

  const memorySubtract = () => {
    triggerHaptic();
    try {
      const currentVal =
        state.isEvaluated && state.result
          ? parseFloat(state.result)
          : evaluateExpression(state.expression || "0", state.angleMode);
      setState((prev) => ({ ...prev, memory: prev.memory - currentVal }));
    } catch {
      // Ignore if expression invalid
    }
  };

  const memoryStore = () => {
    triggerHaptic();
    try {
      const currentVal =
        state.isEvaluated && state.result
          ? parseFloat(state.result)
          : evaluateExpression(state.expression || "0", state.angleMode);
      setState((prev) => ({ ...prev, memory: currentVal }));
    } catch {
      // Ignore if expression invalid
    }
  };

  const setExpressionFromExternal = (exp: string, res?: string) => {
    setState((prev) => ({
      ...prev,
      expression: exp,
      displayValue: res || exp,
      result: res || null,
      isEvaluated: !!res,
      errorMessage: null,
    }));
  };

  return {
    state,
    setAngleMode,
    setMode,
    clear,
    deleteBack,
    appendInput,
    calculate,
    toggleSign,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore,
    setExpressionFromExternal,
  };
}
