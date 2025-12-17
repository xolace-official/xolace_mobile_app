import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="sign-in" options={{ headerShown: false, title: "Sign In" }} />
    </Stack>
  );
};

export default AuthLayout;
