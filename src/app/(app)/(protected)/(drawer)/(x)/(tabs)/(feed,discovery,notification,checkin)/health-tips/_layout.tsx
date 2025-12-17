import { Stack } from "expo-router";

const HealthTipsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Health Tips",
        }}
      />
    </Stack>
  );
};

export default HealthTipsLayout;
