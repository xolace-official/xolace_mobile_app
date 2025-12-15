import { useRouter } from 'expo-router';
import { use, useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { MOCK_COMMUNITIES } from '@/src/constants/mock-communities';
import { CommunityList } from '@/src/features/post-creation/community-list';
import type { PostDraftCommunity } from '@/src/providers/postCreationContext';
import { PostCreationContext } from '@/src/providers/postCreationContext';

export const PostToScreen = () => {
  const router = useRouter();
  // Using simple hardcoded colors for now as requested or matching global theme
  // We don't have direct access to useColorScheme from @xolacekit/ui here based on imports shown
  const colorScheme = 'dark'; 

  const [searchQuery, setSearchQuery] = useState('');
  const { community: selectedCommunity, setCommunity } = use(PostCreationContext);

  const filteredCommunities = useMemo(() => {
    if (!searchQuery.trim()) {
      return MOCK_COMMUNITIES;
    }
    const normalizedQuery = searchQuery.toLowerCase();
    return MOCK_COMMUNITIES.filter(
      (community) =>
        community.name.toLowerCase().includes(normalizedQuery) ||
        community.slug.toLowerCase().includes(normalizedQuery) ||
        (community.description ?? '').toLowerCase().includes(normalizedQuery),
    );
  }, [searchQuery]);

  const handleSelect = (community: PostDraftCommunity) => {
    setCommunity(community);
    router.back();
  };

  const handleClear = () => {
    setCommunity(null);
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-3 bg-background">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full active:bg-white/10"
        >
          <IconSymbol name="xmark" size={22} color={colorScheme === 'dark' ? '#f4f4f5' : '#0f172a'} />
        </Pressable>
        <Text className="text-lg font-semibold text-foreground">Post to</Text>
        {selectedCommunity ? (
          <Pressable
            onPress={handleClear}
            className="rounded-full border border-gray-200 px-3 py-1 active:opacity-80 dark:border-white/10"
          >
            <Text className="text-sm text-muted-foreground">Clear</Text>
          </Pressable>
        ) : (
          <View className="w-14" />
        )}
      </View>

      {selectedCommunity && (
        <View className="mx-4 mb-4 rounded-2xl border border-gray-200 bg-background px-4 py-3 dark:border-white/10 dark:bg-white/5">
          <Text className="text-xs uppercase text-muted-foreground">
            Posting to
          </Text>
          <Text className="text-lg font-semibold text-foreground">
            {selectedCommunity.slug}
          </Text>
          <Text className="text-sm text-muted-foreground" numberOfLines={2}>
            {selectedCommunity.description}
          </Text>
        </View>
      )}

      <View className="mx-4 mb-4 rounded-2xl border border-black/10 bg-muted/50 px-3 dark:border-white/10">
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for a campfire"
          placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
          className="h-12 bg-muted/20 text-base text-foreground"
        />
      </View>

      <View className="flex-1 px-4">
        <CommunityList
          data={filteredCommunities}
          selectedId={selectedCommunity?.id}
          onSelect={handleSelect}
          ListEmptyComponent={() => (
            <View className="mt-20 items-center">
              <Text className="text-sm text-muted-foreground">
                No campfires found.
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};