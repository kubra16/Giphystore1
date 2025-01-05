import { StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const useThemedStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    background: {
      backgroundColor: theme === "light" ? "#fff" : "#333",
    },
    text: {
      color: theme === "light" ? "#000" : "#fff",
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      padding: 10,
      color: theme === "light" ? "#000" : "#fff", // Text color changes with theme
    },
  });

  const placeholderTextColor = theme === "light" ? "#999" : "#ccc";

  return { styles, placeholderTextColor };
};
