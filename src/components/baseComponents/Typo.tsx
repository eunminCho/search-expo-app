import React from "react";
import { Text, TextProps } from "react-native";

import { FontFamily } from "../../constants/styles";

interface TypoProps extends TextProps {
  fontStyle?: "regular" | "bold";
}

/**
 * @param fontStyle 폰트 굵기 regular(default) | bold
 * - TextProps 모두 지원, 공통 텍스트 스타일 정의에 활용 가능
 * - 향후 다국어 지원, 접근성 개선 등 확장 가능
 */
const Typo: React.FC<TypoProps> = ({
  fontStyle = "regular",
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        {
          fontFamily:
            fontStyle === "regular"
              ? FontFamily.PretendardRegular
              : FontFamily.PretendardBold,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Typo;
