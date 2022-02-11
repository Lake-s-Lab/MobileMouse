import { useRef } from "react";
import { Animated, PanResponder, View } from "react-native";

export default function Cursor() {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: pan.x,
          dy: pan.y
        }
      ]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <Animated.View style={{width: 40, height: 40}}>

    </Animated.View>
  )
}