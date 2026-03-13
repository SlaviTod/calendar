import { AuthContext } from "@/contexts/AuthContext";
import { Role } from "@/types";
import { Stack } from "expo-router";
import { useContext } from "react";


export default function CalendarLayout() {

  const { user, isLoggedIn } = useContext(AuthContext);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Calendar", headerShown: false }} />
      <Stack.Protected guard={isLoggedIn && user.role !== Role.user}>
        <Stack.Screen name="add-event" options={{ title: "Create Event", headerShown: false }} />
        <Stack.Screen name="update-event" options={{ title: "Update Event", headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}