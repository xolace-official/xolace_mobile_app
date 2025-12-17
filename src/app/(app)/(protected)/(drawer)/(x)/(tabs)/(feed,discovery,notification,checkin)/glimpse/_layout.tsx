import { Stack } from "expo-router";

const GlimpseLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Glimpse',
        }}
      />
    </Stack>
  );
};

export default GlimpseLayout;