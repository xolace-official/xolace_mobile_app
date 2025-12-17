import { Stack } from "expo-router";

const ProtectedLayout = () => {
  return (
    <Stack>
      {/* <Stack.Screen name="campfireSelection" options={{ headerShown: false }} /> */}
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(post-creation)"
        options={{
          presentation: "card",
          animation: "slide_from_right",
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="post-to"
        options={{ presentation: 'pageSheet', headerShown: false }}
      /> */}

      {/* <Stack.Screen
        name="post/[id]"
        options={{
          title: 'Post Details',
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#141A2E' : 'white',
          },
        }}
      /> */}

      {/* <Stack.Screen
        name="profile/index"
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack>
  );
};

export default ProtectedLayout;
