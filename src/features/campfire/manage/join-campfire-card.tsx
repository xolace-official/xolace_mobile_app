import { Card } from "heroui-native";
import { Pressable, View } from "react-native";
import { JoinedCampfireAvatar } from "./joined-campfire-avatar";
import { AppText } from "@/src/components/builders/app-text";
import { UserCampfireFavoriteJoin } from "@/src/types";
import { Star } from "lucide-react-native";

interface JoinedCampfireCardProps {
  campfire: UserCampfireFavoriteJoin;
}

export const JoinedCampfireCard = ({ campfire }: JoinedCampfireCardProps) => {
  const handleFavoriteToggle = () => {
    // Toggle favorite status
    console.log("Toggle favorite:", campfire.campfireId);
  };
  return (
    <Card className="flex-row rounded-none gap-4 p-3 bg-transparent">
      <JoinedCampfireAvatar
        imageUri="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
        name="Avocado Hackathon"
      />
      <View className="flex-1 gap-4">
        <Card.Body className="flex-1">
          <Card.Title>{campfire.name}</Card.Title>
          <Card.Description numberOfLines={1} className="text-sm">
            {campfire.description}
          </Card.Description>
        </Card.Body>
      </View>

      <View className="ml-2 flex-row items-center gap-3">
        <Pressable onPress={handleFavoriteToggle} className="active:opacity-70">
          <Star
            size={24}
            color={campfire.isFavorite ? "#facc15" : "#a1a1aa"}
            fill={campfire.isFavorite ? "#facc15" : "transparent"}
          />
        </Pressable>

        <View className="rounded-full border border-border bg-surface px-4 py-1.5">
          <AppText className="text-xs font-medium text-surface-foreground">
            Joined
          </AppText>
        </View>
      </View>
    </Card>
  );
};
