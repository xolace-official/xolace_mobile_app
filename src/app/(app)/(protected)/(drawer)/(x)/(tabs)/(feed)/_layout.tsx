import { Stack } from "expo-router";

const FeedLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="glimpse"
        options={{
          title: "Glimpses",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="health-tips"
        options={{
          title: "Health tips",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="campfire"
        options={{
          title: "Campfire",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="collections"
        options={{
          title: "Collections",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default FeedLayout;
