import { useState } from "react";
import { ScrollView, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import ScreenLayout from "@/components/baseComponents/ScreenContainer";
import SearchTextField from "@/components/SearchTextField";

export function Home() {
  const navigation = useNavigation();

  const [keyword, setKeyword] = useState<string>("");

  return (
    <ScreenLayout hasSafeBottomEdges>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 40,
            paddingBottom: 40,
            paddingHorizontal: 20,
          }}
        >
          <SearchTextField
            hasSearchIcon
            value={keyword}
            onChangeText={setKeyword}
            onSubmitEditing={(e) => {
              const text = e.nativeEvent.text.trim();
              if (!text) {
                return;
              }
              navigation.navigate("Results", { keyword: text });
              setKeyword("");
            }}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
