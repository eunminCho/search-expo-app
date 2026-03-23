import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Pressable,
} from "react-native";

import { AppColors } from "@/constants/colors";
import { FontFamily } from "@/constants/styles";

import Icon from "./baseComponents/Icon";

interface SearchTextFieldProps extends Omit<TextInputProps, "clearButtonMode"> {
  /**
   * search icon 노출 여부
   * @default false
   */
  hasSearchIcon?: boolean;
  /**
   * clear button 노출 여부
   * @default false
   */
  showClearButton?: boolean;
}

const SearchTextField: React.FC<SearchTextFieldProps> = ({
  hasSearchIcon,
  showClearButton,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    if (props.onChangeText) {
      props.onChangeText("");
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: isFocused ? AppColors.textPrimary : AppColors.border,
        },
      ]}
    >
      {hasSearchIcon && (
        <Icon
          name="search"
          size={24}
          color={
            isFocused ? AppColors.textPrimary : AppColors.textSecondaryMuted
          }
        />
      )}
      <View style={{ height: 24, flex: 1 }}>
        <TextInput
          style={[styles.input, style]}
          hitSlop={16}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          placeholder="검색어를 입력하세요"
          placeholderTextColor={AppColors.textSecondaryMuted}
          inputMode="search"
          enterKeyHint="search"
          selectionColor={AppColors.textPrimary}
          selectionHandleColor={AppColors.textPrimary}
          underlineColorAndroid="transparent"
          {...props}
        />
      </View>
      {showClearButton && props.value && props.value.length > 0 && (
        <Pressable onPress={handleClear}>
          <Icon
            name="x-circle-filled"
            size={24}
            color={AppColors.textSecondaryMuted}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 16,
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  input: {
    fontSize: 16,
    fontFamily: FontFamily.PretendardRegular,
    letterSpacing: 0,
    fontWeight: 400,
    color: AppColors.textPrimary,
    flex: 1,
    paddingVertical: 0,
  },
});

export default SearchTextField;
