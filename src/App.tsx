import { useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { FontFamily } from "@/constants/styles";
import { ErrorModalProvider } from "@/contexts/ErrorModalContext";
import { Navigation } from "@/navigation";

Asset.loadAsync([require("./assets/default/default_image.svg")]);

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

export function App() {
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const [fontLoaded, fontLoadError] = useFonts({
    [FontFamily.PretendardRegular]: require("./assets/fonts/PretendardJP-Regular.ttf"),
    [FontFamily.PretendardBold]: require("./assets/fonts/PretendardJP-Bold.ttf"),
  });

  useEffect(() => {
    if ((fontLoaded || fontLoadError) && isNavigationReady) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontLoadError, isNavigationReady]);

  if (!fontLoaded && !fontLoadError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorModalProvider>
        <Navigation
          onReady={() => {
            setIsNavigationReady(true);
          }}
        />
      </ErrorModalProvider>
    </QueryClientProvider>
  );
}
