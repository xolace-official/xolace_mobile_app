import { Stack } from "expo-router";
import { useNormalHeaderOptions } from "@/src/hooks/useNormalHeaderOptions";
import { BackButton } from "@/src/components/shared/back-button";

const CampfireLayout = () => {
  const normalHeaderOptions = useNormalHeaderOptions();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="manage/index"
        options={{
          ...normalHeaderOptions,
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
};

export default CampfireLayout;
