import { BlurView } from "expo-blur";
import { useCallback, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabsContext } from '@/src/providers/tab-provider';
import { useHeaderAnimation } from "@/src/hooks/use-header-animation";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { dummyPosts, EnhancedPost } from "@/src/constants/dummy-data";
import { AnimatedLegendList } from "@legendapp/list/reanimated";
import { HomePost } from '../extras/home-post';

export const Feed = () => {
    const [headerHeight, setHeaderHeight] = useState(0);

  const insets = useSafeAreaInsets();

  // x-bottom-tabs-background-animation 🔽
  const { tabBarHeight, scrollDirection, handleXTabsOnScroll } = useContext(TabsContext);

  // x-home-header-animation 🔽
  const { rHeaderStyle, rBlurViewStyle, scrollHandler } = useHeaderAnimation({
    headerHeight,
    scrollDirection,
    handleXTabsOnScroll,
  });

    // renderItem memoized for performance
  const _renderItem = useCallback(({ item }: { item: EnhancedPost }) => {
    return <HomePost />;
  }, []);

  const getItemType = useCallback((item: EnhancedPost) => {
    return 'post';
  }, []);

    const _renderItemSeparator = () => {
    return <View className="h-px bg-gray-500 my-6" />;
  };
  
  return (
    <View className='bg-background flex-1'>
         <Animated.View
        style={rHeaderStyle}
        className="absolute top-0 left-0 right-0 z-50"
        onLayout={({ nativeEvent }) => {
          setHeaderHeight(nativeEvent.layout.height);
        }}
      >
        {/* BlurView is experimental on Android and should be used with caution */}
        {/* To apply blur effect on Android, you need use experimentalBlurMethod prop */}
        <Animated.View style={[StyleSheet.absoluteFillObject, rBlurViewStyle]}>
          <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFillObject} />
        </Animated.View>
        <View
          className="bg-background/50 border-b border-primary"
          style={{ paddingTop: insets.top + 8 }}
        >
          <View className="flex-row items-end justify-between mb-2 px-5">
            <View className="w-8 h-8 bg-background rounded-full" />
            <View className="absolute top-0 left-0 right-0 bottom-0 flex-row items-center justify-center pointer-events-none">
              <FontAwesome6 name="x-twitter" size={24} color="#e5e5e5" />
            </View>
            <View className="w-[60px] h-8 bg-background rounded-full" />
          </View>
        </View>
      </Animated.View>


       <AnimatedLegendList
        data={dummyPosts}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
        getItemType={getItemType}
        onScroll={scrollHandler}
        ItemSeparatorComponent={_renderItemSeparator}
        scrollEventThrottle={1000 / 60}
        ListFooterComponent={<View style={{ height: 80 }} />}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 16, paddingTop: headerHeight }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}