import * as WebBrowser from "expo-web-browser";

/**
 * 인앱 브라우저 open
 * @param {string} url - 연결할 웹 주소
 */
export const openInAppBrowser = async (url: string) => {
  try {
    if (!url.startsWith("http")) {
      console.warn("Invalid URL: URL must start with http or https");
      return;
    }

    await WebBrowser.openBrowserAsync(url, {
      dismissButtonStyle: "close",
    });
  } catch (error) {
    console.error("Failed to open browser:", error);
  }
};
