import { memo } from "react";
import { Pressable } from "react-native";

import { AppQueryKey } from "@/api/queryKeys";
import type { DocumentItem } from "@/api/search/types";
import Icon from "@/components/baseComponents/Icon";
import { AppColors } from "@/constants/colors";

import { useSaveButtonToggle } from "../hooks/useSaveButtonToggle";

interface Props {
  document: DocumentItem;
  resultListQueryKey: AppQueryKey;
}

const ResultsListItemSaveButton: React.FC<Props> = memo(
  ({ document, resultListQueryKey }) => {
    const { toggleSaved } = useSaveButtonToggle({
      documentId: document.id,
      resultListQueryKey,
    });

    const handlePress = () => toggleSaved(!document.isBookmarked);

    return (
      <Pressable style={{ padding: 8 }} onPress={handlePress}>
        {document.isBookmarked ? (
          <Icon name="bookmark-filled" size={24} />
        ) : (
          <Icon
            name="bookmark"
            size={24}
            color={AppColors.textSecondaryMuted}
          />
        )}
      </Pressable>
    );
  },
);

ResultsListItemSaveButton.displayName = "ResultsListItemSaveButton";

export default ResultsListItemSaveButton;
