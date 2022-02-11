import React, { useEffect, useRef } from "react";
import { Animated, Button, PanResponder, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import Cursor from "./Cursor";
import styles from "./styles";

interface Props {
  setPos: (x: number, y: number, type: string) => void;
}

export default function TouchScreen(props:Props) {
  const [startPos, setStartPos] = React.useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = React.useState({ x: 0, y: 0 });
  const [disPos, setDisPos] = React.useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = React.useState({ width: 0, height: 0 });

  const getDistance = (startPos:any, endPos:any) => {
    return Math.sqrt(Math.pow(startPos.x - endPos.x, 2) + Math.pow(startPos.y - endPos.y, 2));
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        const curX = parseFloat(gestureState.x0.toFixed(10));
        const curY = parseFloat(gestureState.y0.toFixed(10));
        // console.log(curX, curY);
        
        setStartPos({ x: curX, y: curY });
        setEndPos({ x: curX, y: curY });
        setDisPos({ x: 0, y: 0 });
        props.setPos(curX, curY, "Grant");
      },
      onPanResponderMove: (event, gestureState) => {
        const curX = parseFloat(gestureState.moveX.toFixed(10));
        const curY = parseFloat(gestureState.moveY.toFixed(10));
        // console.log(curX, curY);
        
        setDisPos({ x: curX - endPos.x, y: curY - endPos.y });
        setEndPos({ x: curX, y: curY });
        props.setPos(curX, curY, "Move");
      },
      onPanResponderRelease: (event, gestureState) => {
        const curX = parseFloat(gestureState.moveX.toFixed(10));
        const curY = parseFloat(gestureState.moveY.toFixed(10));
        console.log(screenSize);
        
        
        if(curX === 0 && curY === 0) {
          if(screenSize.width/2){
            console.log("Left");
          }else{
            console.log("Right");
          }
        }else{
          console.log("Drag");
          
        }

        props.setPos(curX, curY, "Release");
      }
    })
  ).current;

  return (
    <Animated.View
      style={styles.mousePad}
    >
      <View
        style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}
        {...panResponder.panHandlers}
        onLayout={(event) => {
          setScreenSize({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height });
          
        }}
      >
        <Text>{endPos.x.toFixed(2)}, {endPos.y.toFixed(2)}</Text>
      </View>
    </Animated.View>
  );
}
