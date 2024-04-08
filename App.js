import { useFonts } from "@shopify/react-native-skia";
import SwipeUp from "./SwipeUp";

export default function App() {
  const fontMgr = useFonts({
    SFProBold: [require("./assets/SF-Pro-Display-Bold.otf")],
  });
  if (!fontMgr) return null;

  return <SwipeUp fontMgr={fontMgr} />;
}
