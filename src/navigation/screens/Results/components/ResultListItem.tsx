import React from "react";
import { Pressable, View } from "react-native";

import { Image } from "expo-image";

import { AppQueryKey } from "@/api/queryKeys";
import type { DocumentItem } from "@/api/search/types";
import default_image from "@/assets/default/default_image.svg";
import Typo from "@/components/baseComponents/Typo";
import { AppColors } from "@/constants/colors";
import { openInAppBrowser } from "@/utils/browser";

import ResultsListItemSaveButton from "./ResultListItemSaveButton";

interface Props {
  document: DocumentItem;
  resultListQueryKey: AppQueryKey;
}

const ResultsListItem: React.FC<Props> = React.memo(
  ({ document, resultListQueryKey }) => {
    const onPressListItem = async (url: string) => {
      await openInAppBrowser(url);
    };

    const renderImage = () => {
      return (
        <Image
          source={{ uri: document.imageUrl }}
          placeholder={default_image}
          style={{ width: 48, height: 48, borderRadius: 8 }}
          contentFit="cover"
        />
      );
    };

    const renderTitle = () => {
      return (
        <Typo
          fontStyle="bold"
          style={{
            fontSize: 15,
            lineHeight: 20,
            letterSpacing: 0,
            color: AppColors.textPrimary,
          }}
          numberOfLines={2}
        >
          {document.title}
        </Typo>
      );
    };

    return (
      <Pressable
        onPress={() => onPressListItem(document.url)}
        style={({ pressed }) => ({
          padding: 16,
          flexDirection: "row",
          gap: 16,
          borderRadius: 8,
          backgroundColor: pressed ? AppColors.surfaceSubtle : "transparent",
        })}
      >
        {renderImage()}
        <View
          style={{
            gap: 8,
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ gap: 8, flex: 1 }}>{renderTitle()}</View>
          <ResultsListItemSaveButton
            document={document}
            resultListQueryKey={resultListQueryKey}
          />
        </View>
      </Pressable>
    );
  },
);

ResultsListItem.displayName = "ResultsListItem";

export default ResultsListItem;
