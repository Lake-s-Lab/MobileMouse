import React from "react";
import { Button, View } from "react-native";
import Options from "./Options";
import TouchScreen from "./TouchScreen";

interface Props {
  setPos: (x: number, y: number, clickBehavior: string, mouseSpeed: number) => void;
  disconnectBtn: () => void;
}

export default function DragMousePage(props:Props) {
  return (
    <View>
      <TouchScreen
        setPos={props.setPos}
        disconnectBtn={props.disconnectBtn}
      />
    </View>
  );
}
