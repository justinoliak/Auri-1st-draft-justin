import { View, Text } from "react-native";
import { useRouter, Redirect } from "expo-router";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Something went wrong. Please restart the app.</Text>
    </View>
  );
}

export default function Index() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Redirect href="/welcome" />
    </ErrorBoundary>
  );
}
