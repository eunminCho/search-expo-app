import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "./screens/Home/Home";
import { Results } from "./screens/Results/Results";

const RootStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Home: {
      screen: Home,
    },
    Results: {
      screen: Results,
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
