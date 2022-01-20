import React, { FC, useState } from "react";
import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../utils/colors";
import { Send } from "../../utils/icons";

export type OnboardingTextFieldProps = {
  label: string;
  prefix?: string;
  type: "number" | "email";
  keyboard: KeyboardTypeOptions;
  regex?: RegExp;
  errorLabel: string;
};

const OnboardingTextField: FC<OnboardingTextFieldProps> = ({
  label,
  prefix,
  keyboard,
  regex,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const validateFleld = (text: string) => {
    if (regex) {
      setIsValid(regex.test(text));
    }
  };

  const TextView = () => (
    <SafeAreaView edges={["bottom"]}>
      <View style={style.container}>
        <View style={style.fieldLabelContainer}>
          <Text style={style.fieldLabel}>{label}</Text>
        </View>
        <View style={style.divider} />
        <View style={style.middleContainer}>
          {prefix && <Text style={style.prefix}>{prefix}</Text>}
          <View style={style.textInputContainer}>
            <TextInput
              style={style.textInput}
              keyboardType={keyboard}
              onChangeText={(text) => {
                validateFleld(text);
              }}
            />
          </View>
          <View style={style.rightButtonContainer}>
            <TouchableOpacity activeOpacity={0.8}>
              <Send />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  return Platform.OS === "android" ? (
    <TextView />
  ) : (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={54}>
      <TextView />
    </KeyboardAvoidingView>
  );
};

export default OnboardingTextField;

const style = StyleSheet.create({
  container: {
    height: 90,
    width: "100%",
    backgroundColor: theme.background,
  },
  fieldLabelContainer: {
    height: 24,
    marginHorizontal: 24,
    justifyContent: "center",
  },
  fieldLabel: {
    fontFamily: "Inter-Regular",
    color: "#636682",
    fontSize: 12,
  },
  divider: {
    backgroundColor: "#636682",
    height: 1,
    width: "100%",
  },
  middleContainer: {
    marginHorizontal: 24,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  prefix: {
    fontFamily: "Inter-Regular",
    color: "#636682",
    fontSize: 14,
    marginRight: 10,
  },
  textInputContainer: {
    flex: 1,
    marginRight: 16,
  },
  textInput: {
    height: "100%",
    fontFamily: "Inter-Regular",
    color: "white",
    fontSize: 14,
  },
  rightButtonContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
