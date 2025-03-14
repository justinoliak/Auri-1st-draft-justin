import { View, Text, StyleSheet } from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import BottomNavigation from "../components/home/BottomNavigation";
import theme from "../theme";

function ErrorFallback() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Error loading analytics. Please try again later.</Text>
    </View>
  );
}

export default function Analytics() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.comingSoon}>Coming Soon</Text>
          <Text style={styles.description}>
            Analytics features are currently in development.
          </Text>
        </View>

        <BottomNavigation activeTab="analytics" />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  header: {
    width: "100%",
    paddingHorizontal: theme.spacing.container,
    paddingTop: 64,
    paddingBottom: 16,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.primary,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.container,
  },
  comingSoon: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: "center",
  },
});
