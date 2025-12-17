import { Stack } from "expo-router";

export default function PostCreationLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ presentation: "card", headerShown: false }} />
      <Stack.Screen name="post-to" options={{ presentation: "pageSheet", headerShown: false }} />
    </Stack>
  );
}
