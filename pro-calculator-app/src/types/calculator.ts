export type CalculatorMode = 'standard' | 'scientific';
export type AngleMode = 'DEG' | 'RAD';
export type ThemeMode = 'system' | 'light' | 'dark';

export interface CalculatorSettings {
  theme: ThemeMode;
  angleMode: AngleMode;
  calculatorMode: CalculatorMode;
  hapticsEnabled: boolean;
  soundEnabled: boolean;
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface CalculatorState {
  expression: string;
  displayValue: string;
  result: string | null;
  memory: number;
  mode: CalculatorMode;
  angleMode: AngleMode;
  isEvaluated: boolean;
  errorMessage: string | null;
}

export type TokenType =
  | 'NUMBER'
  | 'OPERATOR'
  | 'FUNCTION'
  | 'CONSTANT'
  | 'LPAREN'
  | 'RPAREN'
  | 'POSTFIX';

export interface Token {
  type: TokenType;
  value: string;
  precedence?: number;
  associativity?: 'LEFT' | 'RIGHT';
}