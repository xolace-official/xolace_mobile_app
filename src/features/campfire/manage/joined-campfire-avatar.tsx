import { Avatar } from "heroui-native";

interface JoinedCampfireAvatarProps {
  imageUri?: string;
  name: string;
}

export function JoinedCampfireAvatar({
  imageUri,
  name,
}: JoinedCampfireAvatarProps) {
  const getInitials = (text: string) => {
    const words = text.split(" ");
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return text.slice(0, 2).toUpperCase();
  };

  return (
    <>
      <Avatar size="md" alt="Medium Avatar">
        <Avatar.Image
          source={{
            uri: "https://img.heroui.chat/image/avatar?w=400&h=400&u=5",
          }}
        />
        <Avatar.Fallback>{getInitials(name)}</Avatar.Fallback>
      </Avatar>
    </>
  );
}
