import React from "react";
import { SafeAreaView, StyleSheet, useColorScheme, View } from "react-native";
import { CalculatorButton } from "../src/components/CalculatorButton";
import { CalculatorDisplay } from "../src/components/CalculatorDisplay";
import { Header } from "../src/components/Header";
import { ModeSelector } from "../src/components/ModeSelector";
import { ScientificPanel } from "../src/components/ScientificPanel";
import { useCalculator } from "../src/hooks/useCalculator";
import { useHistory } from "../src/hooks/useHistory";
import { useSettings } from "../src/hooks/useSettings";
import { darkTheme, lightTheme } from "../src/theme/colors";

export default function HomeScreen() {
  const systemColorScheme = useColorScheme();
  const { settings, updateSettings } = useSettings();
  const { addHistoryItem } = useHistory();

  const isDark =
    settings.theme === "dark" ||
    (settings.theme === "system" && systemColorScheme === "dark");
  const theme = isDark ? darkTheme : lightTheme;

  const {
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
  } = useCalculator(
    settings.angleMode,
    settings.calculatorMode,
    settings.hapticsEnabled,
    (expression, result) => {
      addHistoryItem(expression, result);
    },
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header title="Calculator" theme={theme} />

      {/* Main Display */}
      <CalculatorDisplay
        expression={state.expression}
        result={state.result}
        displayValue={state.displayValue}
        errorMessage={state.errorMessage}
        angleMode={state.angleMode}
        memoryValue={state.memory}
        theme={theme}
      />

      {/* Mode & Angle Selector */}
      <ModeSelector
        mode={state.mode}
        angleMode={state.angleMode}
        onModeChange={(m) => {
          setMode(m);
          updateSettings({ calculatorMode: m });
        }}
        onAngleModeChange={(a) => {
          setAngleMode(a);
          updateSettings({ angleMode: a });
        }}
        theme={theme}
      />

      {/* Memory Bar */}
      <View style={styles.memoryRow}>
        <CalculatorButton
          label="MC"
          onPress={memoryClear}
          type="function"
          theme={theme}
          style={styles.memBtn}
        />
        <CalculatorButton
          label="MR"
          onPress={memoryRecall}
          type="function"
          theme={theme}
          style={styles.memBtn}
        />
        <CalculatorButton
          label="M+"
          onPress={memoryAdd}
          type="function"
          theme={theme}
          style={styles.memBtn}
        />
        <CalculatorButton
          label="M−"
          onPress={memorySubtract}
          type="function"
          theme={theme}
          style={styles.memBtn}
        />
        <CalculatorButton
          label="MS"
          onPress={memoryStore}
          type="function"
          theme={theme}
          style={styles.memBtn}
        />
      </View>

      {/* Scientific Keypad Extension */}
      {state.mode === "scientific" && (
        <ScientificPanel onAppend={appendInput} theme={theme} />
      )}

      {/* Main Standard Keypad */}
      <View style={styles.keypad}>
        <View style={styles.row}>
          <CalculatorButton
            label="AC"
            onPress={clear}
            type="accent"
            theme={theme}
          />
          <CalculatorButton
            label="⌫"
            onPress={deleteBack}
            type="function"
            theme={theme}
          />
          <CalculatorButton
            label="("
            onPress={() => appendInput("(")}
            type="function"
            theme={theme}
          />
          <CalculatorButton
            label=")"
            onPress={() => appendInput(")")}
            type="function"
            theme={theme}
          />
          <CalculatorButton
            label="÷"
            onPress={() => appendInput("÷")}
            type="operator"
            theme={theme}
          />
        </View>

        <View style={styles.row}>
          <CalculatorButton
            label="7"
            onPress={() => appendInput("7")}
            theme={theme}
          />
          <CalculatorButton
            label="8"
            onPress={() => appendInput("8")}
            theme={theme}
          />
          <CalculatorButton
            label="9"
            onPress={() => appendInput("9")}
            theme={theme}
          />
          <CalculatorButton
            label="%"
            onPress={() => appendInput("%")}
            type="function"
            theme={theme}
          />
          <CalculatorButton
            label="×"
            onPress={() => appendInput("×")}
            type="operator"
            theme={theme}
          />
        </View>

        <View style={styles.row}>
          <CalculatorButton
            label="4"
            onPress={() => appendInput("4")}
            theme={theme}
          />
          <CalculatorButton
            label="5"
            onPress={() => appendInput("5")}
            theme={theme}
          />
          <CalculatorButton
            label="6"
            onPress={() => appendInput("6")}
            theme={theme}
          />
          <CalculatorButton
            label="+/-"
            onPress={toggleSign}
            type="function"
            theme={theme}
          />
          <CalculatorButton
            label="−"
            onPress={() => appendInput("−")}
            type="operator"
            theme={theme}
          />
        </View>

        <View style={styles.row}>
          <CalculatorButton
            label="1"
            onPress={() => appendInput("1")}
            theme={theme}
          />
          <CalculatorButton
            label="2"
            onPress={() => appendInput("2")}
            theme={theme}
          />
          <CalculatorButton
            label="3"
            onPress={() => appendInput("3")}
            theme={theme}
          />
          <CalculatorButton
            label="="
            onPress={calculate}
            type="operator"
            theme={theme}
            flex={2}
          />
        </View>

        <View style={styles.row}>
          <CalculatorButton
            label="0"
            onPress={() => appendInput("0")}
            theme={theme}
            flex={2}
          />
          <CalculatorButton
            label="."
            onPress={() => appendInput(".")}
            theme={theme}
          />
          <CalculatorButton
            label="+"
            onPress={() => appendInput("+")}
            type="operator"
            theme={theme}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoryRow: {
    flexDirection: "row",
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  memBtn: {
    height: 36,
    borderRadius: 8,
    margin: 2,
  },
  keypad: {
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
  },
});
