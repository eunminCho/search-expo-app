import React from "react";

import { Image } from "expo-image";

import { IconName } from "@/constants/icon/iconNameType";
import { iconSources } from "@/constants/icon/iconSources";

interface IconProps {
  name: IconName;
  size: number;
  color?: string;
}

/**
 * @param name (IconName)
 * @param size (height, width 동일)
 * @param color
 * @returns Image 컴포넌트
 */
const Icon: React.FC<IconProps> = ({ name, size, color }) => {
  const source = iconSources[name];

  if (!source) {
    console.warn(`Icon '${name}' not found.`);
    return null;
  }

  // PNG/JPG의 경우 color prop은 효과가 없습니다. (SVG를 사용해야 함)
  // SVG 아이콘의 경우 tintColor를 사용하여 색상을 변경할 수 있습니다.
  const tintStyle = color ? { tintColor: color } : {};

  return (
    <Image source={source} style={[{ width: size, height: size }, tintStyle]} />
  );
};

export default Icon;
