import { ErrorBoundary } from "react-error-boundary";
import { View, Text } from "react-native";
import WelcomeScreen from "../screens/WelcomeScreen";

function ErrorFallback() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Error loading welcome screen. Please restart the app.</Text>
    </View>
  );
}

export default function Welcome() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <WelcomeScreen />
    </ErrorBoundary>
  );
}
