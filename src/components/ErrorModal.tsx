import React, { useEffect } from "react";
import { Modal, Pressable, View } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppColors } from "@/constants/colors";

import Typo from "./baseComponents/Typo";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: AppColors.overlay }}>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ErrorModalContent onClose={onClose} />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const SLIDE_UP_DISTANCE = 80;
const ANIMATION_DURATION = 300;

const ErrorModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const translateY = useSharedValue(SLIDE_UP_DISTANCE);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: ANIMATION_DURATION });
  }, [translateY]);

  const handleClose = () => {
    onClose();
    translateY.value = withTiming(SLIDE_UP_DISTANCE, {
      duration: ANIMATION_DURATION,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: 320,
          gap: 32,
          backgroundColor: AppColors.white,
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: AppColors.modalBorder,
          boxShadow: `0px 2px 24px 0px ${AppColors.shadow}`,
        },
        animatedStyle,
      ]}
    >
      <ErrorModalTitle />
      <ErrorModalButton onPress={handleClose} />
    </Animated.View>
  );
};

const ErrorModalTitle = () => {
  return (
    <Typo
      fontStyle="bold"
      style={{
        fontSize: 20,
        letterSpacing: 0,
        color: AppColors.textPrimary,
      }}
    >
      오류가 발생했습니다.
    </Typo>
  );
};

const ErrorModalButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed
          ? AppColors.buttonPrimaryPressed
          : AppColors.buttonPrimary,
        paddingTop: 13,
        paddingBottom: 14,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: "center",
      })}
      onPress={onPress}
    >
      <Typo
        fontStyle="bold"
        style={{
          fontSize: 15,
          lineHeight: 15,
          letterSpacing: 0,
          color: AppColors.onPrimary,
        }}
      >
        OK
      </Typo>
    </Pressable>
  );
};
