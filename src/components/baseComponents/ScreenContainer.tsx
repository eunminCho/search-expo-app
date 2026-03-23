import React from "react";
import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { AppColors } from "@/constants/colors";

interface ScreenLayoutProps {
  hasSafeBottomEdges?: boolean;
  children: React.ReactNode;
}

/**
 * @param hasSafeBottomEdges safeArea bottom edge 포함 여부
 * @param children
 * @returns SafeAreaView 래핑 컴포넌트
 */
const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  hasSafeBottomEdges,
  children,
}) => {
  return (
    <SafeAreaView
      {...(hasSafeBottomEdges
        ? { edges: ["top", "bottom"] }
        : { edges: ["top"] })}
      style={[styles.safeArea]}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
});

export default ScreenLayout;
