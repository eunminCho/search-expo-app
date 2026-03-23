import { Dispatch, SetStateAction } from "react";
import { Pressable, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import Icon from "@/components/baseComponents/Icon";
import SearchTextField from "@/components/SearchTextField";
import { AppColors } from "@/constants/colors";

const DIVIDER_SCROLL_RANGE = 20;
const DIVIDER_BORDER_WIDTH = 1;

interface Props {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  resultListScrollY: SharedValue<number>;
}

const ResultsHeader: React.FC<Props> = ({
  keyword,
  setKeyword,
  resultListScrollY,
}) => {
  const navigation = useNavigation();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const borderBottomWidth = interpolate(
      resultListScrollY.value,
      [0, DIVIDER_SCROLL_RANGE],
      [0, DIVIDER_BORDER_WIDTH],
      Extrapolation.CLAMP,
    );
    return {
      borderBottomWidth,
      borderBottomColor: AppColors.borderLight,
    };
  });

  return (
    <Animated.View
      style={[
        {
          padding: 16,
          paddingRight: 20,
          gap: 12,
          flexDirection: "row",
          alignItems: "center",
        },
        headerAnimatedStyle,
      ]}
    >
      <Pressable style={{ padding: 12 }} onPress={navigation.goBack}>
        <Icon name="arrow-left" size={24} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <SearchTextField
          showClearButton
          defaultValue={keyword}
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
      </View>
    </Animated.View>
  );
};

export default ResultsHeader;
