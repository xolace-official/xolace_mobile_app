import { IconSymbol } from "@/src/components/ui/icon-symbol";
import type { PostDraftCommunity } from "@/src/providers/postCreationContext";
import { LegendList } from "@legendapp/list";
import { Image } from "expo-image";
import { JSX } from "react";
import { Pressable, Text, View } from "react-native";

type CommunityListProps = {
  data: PostDraftCommunity[];
  selectedId?: string | null;
  onSelect: (community: PostDraftCommunity) => void;
  ListEmptyComponent?: (() => JSX.Element) | null;
};

const formatMemberCount = (count?: number) => {
  if (!count) {
    return "Just launched";
  }

  if (count < 1000) {
    return `${count} members`;
  }

  return `${(count / 1000).toFixed(1)}k members`;
};

export const CommunityList = ({
  data,
  selectedId,
  onSelect,
  ListEmptyComponent,
}: CommunityListProps) => {
  return (
    <LegendList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 48 }}
      ListEmptyComponent={ListEmptyComponent ?? null}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={80}
      ItemSeparatorComponent={() => <View className="h-px ml-14 bg-muted" />}
      renderItem={({ item }) => {
        const isActive = selectedId === item.id;
        return (
          <View>
            <Pressable
              onPress={() => onSelect(item)}
              className={`flex-row items-center justify-between px-1 py-4 active:opacity-80 ${
                isActive ? "bg-white/5" : ""
              }`}
            >
              <View className="flex-1 flex-row items-center gap-3 pr-4">
                <View className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                  {item.avatar ? (
                    <Image
                      source={{ uri: item.avatar }}
                      style={{ width: "100%", height: "100%" }}
                      contentFit="cover"
                    />
                  ) : (
                    <View className="flex-1 items-center justify-center bg-muted">
                      <Text className="text-base font-semibold text-foreground">
                        {item.name.charAt(0)}
                      </Text>
                    </View>
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">{item.slug}</Text>
                  <Text className="text-xs text-muted-foreground" numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text className="mt-1 text-xs text-muted-foreground">
                    {formatMemberCount(item.memberCount)}
                  </Text>
                </View>
              </View>
              {isActive && (
                <View className="h-7 w-7 items-center justify-center rounded-full bg-primary/20">
                  <IconSymbol name="checkmark" size={18} color="#a78bfa" />
                </View>
              )}
            </Pressable>
          </View>
        );
      }}
    />
  );
};
