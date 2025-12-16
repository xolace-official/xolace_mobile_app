import { SearchTransitionContext } from "@/src/context/search-transition-context";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { use } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { Button, TextField } from 'heroui-native';

export const SearchInput = () => {
  const { onCloseSearchModal } = use(SearchTransitionContext);

  return (
    <KeyboardStickyView>
      <View className="absolute left-0 right-0 bottom-0 flex-row items-center p-3 gap-2">
        <LinearGradient
          colors={["transparent", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.2 }}
          style={StyleSheet.absoluteFill}
        />
        {/* <View
          className="flex-row flex-1 items-center bg-[#282828] px-3 h-[48px] rounded-2xl gap-2"
          style={styles.borderCurve}
        >
          <Feather name="search" size={22} color="#c3c3c3" />
          <TextInput
            placeholder="Quick find"
            placeholderTextColor="#888"
            returnKeyType="search"
            className="flex-1 text-white text-lg font-semibold"
            selectionColor="#c3c3c3"
            onSubmitEditing={onCloseSearchModal}
            autoFocus
          />
        </View> */}

<View className="flex-1">
         <TextField>
          <TextField.Input
            className=" text-white text-lg font-semibold"
            onSubmitEditing={onCloseSearchModal}
          >
            <TextField.InputStartContent className="pointer-events-none">
              <Feather name="search" size={22} color="#c3c3c3" />
            </TextField.InputStartContent>
          </TextField.Input>
        </TextField>
</View>

        {/* <Pressable
          className="bg-[#282828] h-[48px] aspect-square rounded-2xl items-center justify-center"
          style={styles.borderCurve}
          onPress={onCloseSearchModal}
        >
          <Feather name="x" size={24} color="#c3c3c3" />
        </Pressable> */}
        <Button variant="secondary" 
        size="md" 
        isIconOnly 
        className="rounded-2xl"
        onPress={onCloseSearchModal}
        >
            <Button.Label>
              <Feather name="x" size={24} color="#c3c3c3" />
            </Button.Label>
          </Button>
      </View>
    </KeyboardStickyView>
  );
};

// const styles = StyleSheet.create({
//   borderCurve: {
//     borderCurve: "continuous",
//   },
// });
