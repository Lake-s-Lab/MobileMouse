import React, { useEffect, useRef } from "react";
import {
  Animated,
  Button,
  Dimensions,
  PanResponder,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import Options from "./Options";
import styles from "./styles";

interface Props {
  setPos: (x: number, y: number, clickBehavior: string, mouseSpeed: number) => void;
  disconnectBtn: () => void;
}

export default function TouchScreen(props: Props) {
  const [behavior, setBehavior] = React.useState("");
  const [mouseSpeed, setMouseSpeed] = React.useState(1);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        const curX = parseFloat(gestureState.x0.toFixed(10));
        const curY = parseFloat(gestureState.y0.toFixed(10));
        // console.log(curX, curY);

        // setStartPos({ x: curX, y: curY });
        // setEndPos({ x: curX, y: curY });
        // setDisPos({ x: 0, y: 0 });
        setBehavior("Press In");
        props.setPos(curX, curY, "Grant", mouseSpeed);
      },
      onPanResponderMove: (event, gestureState) => {
        const curX = parseFloat(gestureState.moveX.toFixed(10));
        const curY = parseFloat(gestureState.moveY.toFixed(10));
        // console.log(curX, curY);

        // setDisPos({ x: curX - endPos.x, y: curY - endPos.y });
        // setEndPos({ x: curX, y: curY });
        setBehavior("Press Move");
        props.setPos(curX, curY, "Move", mouseSpeed);
      },
      onPanResponderRelease: (event, gestureState) => {
        const curX = parseFloat(gestureState.moveX.toFixed(10));
        const curY = parseFloat(gestureState.moveY.toFixed(10));
        let { width, height } = Dimensions.get("window");
        // console.log(width, height, gestureState.x0, gestureState.y0, gestureState.moveX, gestureState.moveY);

        if (curX === 0 && curY === 0) {
          const clickX = parseFloat(gestureState.x0.toFixed(10));
          const clickY = parseFloat(gestureState.y0.toFixed(10));

          if (clickX < width / 2) {
            setBehavior("Press Out Left");
            props.setPos(clickX, clickY, "Left", mouseSpeed);
          } else {
            setBehavior("Press Out Right");
            props.setPos(clickX, clickY, "Right", mouseSpeed);
          }
        } else {
          setBehavior("Press Out");
          props.setPos(curX, curY, "Release", mouseSpeed);
        }
      },
    })
  ).current;

  return (
    <View>
      <Animated.View style={styles.mousePad}>
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          {...panResponder.panHandlers}
          onLayout={(event) => {}}
        >
          <Text>{behavior}</Text>
        </View>
        <Options 
          setMouseSpeed={setMouseSpeed}
          disconnectBtn={props.disconnectBtn}
        />
      </Animated.View>
    </View>
  );
}
