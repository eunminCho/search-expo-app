import { View } from "react-native";

import { AppColors } from "@/constants/colors";

const ResultsListSkeleton: React.FC = () => {
  return (
    <View style={{ paddingHorizontal: 8 }}>
      <ResultsListSkeletonItem />
      <ResultsListSkeletonItem />
      <ResultsListSkeletonItem />
      <ResultsListSkeletonItem />
      <ResultsListSkeletonItem />
      <ResultsListSkeletonItem />
      <ResultsListSkeletonItem />
    </View>
  );
};

export default ResultsListSkeleton;

export const ResultsListSkeletonItem = () => {
  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: "row",
        gap: 16,
      }}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          backgroundColor: AppColors.skeleton,
        }}
      />
      <View style={{ gap: 36 }}>
        <View
          style={{
            width: 192,
            height: 20,
            borderRadius: 4,
            backgroundColor: AppColors.skeleton,
          }}
        />
        <View
          style={{
            width: 140,
            height: 14,
            borderRadius: 4,
            backgroundColor: AppColors.skeleton,
          }}
        />
      </View>
    </View>
  );
};
