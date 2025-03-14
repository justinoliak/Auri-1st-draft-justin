import { useNavigation as useReactNavigation } from "@react-navigation/native";

export function useNavigation() {
  const navigation = useReactNavigation();

  return {
    ...navigation,
    navigateToHome: () => navigation.navigate("Home"),
    navigateToSignIn: () => navigation.navigate("SignIn"),
    navigateToCalendar: () => navigation.navigate("Calendar"),
    navigateToJournal: () => navigation.navigate("Journal"),
  };
}
