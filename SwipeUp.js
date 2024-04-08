import { Canvas, Fill, Text, matchFont } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const HELLO_TEXT = "Hello, Prathamesh!";
const SWIPE_TEXT = "Swipe up to get started";
const DISPLACEMENT_TEXT = 20;
const fontStyle = {
  fontFamily: "SFProBold",
  fontWeight: "bold",
  fontSize: 12,
};
const helloFontStyle = {
  fontFamily: "SFProBold",
  fontWeight: "bold",
  fontSize: 32,
};

const SwipeUp = ({ fontMgr }) => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const swipeHeight = useSharedValue(screenHeight - 50);

  const font = matchFont(fontStyle, fontMgr);
  const welcomeFont = matchFont(helloFontStyle, fontMgr);

  useEffect(() => {
    swipeHeight.value = withRepeat(
      withTiming(swipeHeight.value + DISPLACEMENT_TEXT, {
        duration: 2000,
      }),
      -1,
      true
    );
  }, []);

  const swipeTextX = useDerivedValue(() => {
    const { width } = font.measureText(SWIPE_TEXT);
    return (screenWidth - width) / 2;
  }, [font, screenWidth, SWIPE_TEXT]);

  const helloTextX = useDerivedValue(() => {
    const { width } = welcomeFont.measureText(HELLO_TEXT);
    return (screenWidth - width) / 2;
  }, [font, screenWidth, HELLO_TEXT]);

  const helloTextY = useDerivedValue(() => {
    const { height } = welcomeFont.measureText(HELLO_TEXT);
    return (screenHeight - height) / 2;
  }, [font, screenHeight, HELLO_TEXT]);

  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color={"rgb(242, 242, 247)"} />
      <Text
        x={helloTextX}
        y={helloTextY}
        text={HELLO_TEXT}
        font={welcomeFont}
      />
      <Text x={swipeTextX} y={swipeHeight} text={SWIPE_TEXT} font={font} />
    </Canvas>
  );
};

export default SwipeUp;
