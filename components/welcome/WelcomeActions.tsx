import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "../ui/Button";
import theme from "@/theme";
import { useRouter } from "expo-router";

/**
 * WelcomeActions Component
 *
 * A component that displays the primary action buttons on the welcome screen,
 * including sign in and get started options.
 *
 * @example
 * <WelcomeActions
 *   onSignIn={navigateToSignIn}
 *   onGetStarted={navigateToRegistration}
 * />
 */

interface WelcomeActionsProps {
  /** Function called when the sign in button is pressed */
  onSignIn?: () => void;
  /** Function called when the get started button is pressed */
  onGetStarted?: () => void;
}

export default function WelcomeActions({
  onSignIn = () => {},
  onGetStarted,
}: WelcomeActionsProps) {
  const router = useRouter();

  const handleSignIn = () => {
    onSignIn();
    router.push("/signin");
  };

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      router.push("/signin");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        label="Sign in"
        variant="outline"
        onPress={handleSignIn}
        accessibilityLabel="Sign in button"
      />
      <Button
        label="Get started"
        variant="primary"
        onPress={handleGetStarted}
        accessibilityLabel="Get started button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: theme.spacing.cardPadding,
  },
});
