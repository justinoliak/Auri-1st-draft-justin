import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Calendar as CalendarIcon,
  Home as HomeIcon,
  BarChart3,
} from "lucide-react-native";
import theme from "@/theme";

/**
 * BottomNavigation Component
 *
 * A navigation bar displayed at the bottom of the screen with tabs for
 * different sections of the app.
 *
 * @example
 * <BottomNavigation
 *   activeTab="home"
 *   onTabPress={(tab) => console.log(`Navigating to ${tab}`)}
 * />
 */

type TabName = "calendar" | "home" | "analytics";

interface BottomNavigationProps {
  /** Currently active tab */
  activeTab?: TabName;
  /** Function called when a tab is pressed with the tab name as parameter */
  onTabPress?: (tab: TabName) => void;
}

export default function BottomNavigation({
  activeTab = "home",
  onTabPress = (tab) => {
    // Get router instance
    const router = require("expo-router").useRouter();

    // Navigate based on tab
    switch (tab) {
      case "home":
        router.push("/home");
        break;
      case "calendar":
        router.push("/calendar");
        break;
      case "analytics":
        // Not implemented yet
        console.log("Analytics tab pressed");
        break;
      default:
        break;
    }
  },
}: BottomNavigationProps) {
  return (
    <View style={styles.container}>
      {/* Calendar Tab */}
      <TouchableOpacity
        style={[styles.tab, activeTab === "calendar" && styles.activeTab]}
        onPress={() => onTabPress("calendar")}
        accessibilityRole="button"
        accessibilityLabel="Calendar tab"
      >
        <CalendarIcon
          width={24}
          height={24}
          color={
            activeTab === "calendar"
              ? theme.colors.primary.dark
              : theme.colors.primary.main
          }
        />
        <Text
          style={[
            styles.tabText,
            activeTab === "calendar" && styles.activeTabText,
          ]}
        >
          Calendar
        </Text>
      </TouchableOpacity>

      {/* Home Tab */}
      <TouchableOpacity
        style={[styles.tab, activeTab === "home" && styles.activeTab]}
        onPress={() => onTabPress("home")}
        accessibilityRole="button"
        accessibilityLabel="Home tab"
      >
        <HomeIcon
          width={24}
          height={24}
          color={
            activeTab === "home"
              ? theme.colors.primary.dark
              : theme.colors.primary.main
          }
        />
        <Text
          style={[styles.tabText, activeTab === "home" && styles.activeTabText]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Analytics Tab */}
      <TouchableOpacity
        style={[styles.tab, activeTab === "analytics" && styles.activeTab]}
        onPress={() => onTabPress("analytics")}
        accessibilityRole="button"
        accessibilityLabel="Analytics tab"
      >
        <BarChart3
          width={24}
          height={24}
          color={
            activeTab === "analytics"
              ? theme.colors.primary.dark
              : theme.colors.primary.main
          }
        />
        <Text
          style={[
            styles.tabText,
            activeTab === "analytics" && styles.activeTabText,
          ]}
        >
          Analytics
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: theme.spacing.container,
    paddingVertical: 15,
    backgroundColor: theme.colors.background.main,
    ...theme.shadows.large,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tab: {
    width: 88,
    paddingHorizontal: 21,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  activeTab: {
    backgroundColor: theme.colors.background.secondary,
  },
  tabText: {
    textAlign: "center",
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.primary,
  },
  activeTabText: {
    color: theme.colors.primary.dark,
  },
});
