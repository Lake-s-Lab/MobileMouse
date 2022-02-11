import React from "react";
import { Button, View } from "react-native";
import TouchScreen from "./TouchScreen";

interface Props {
  setPos: (x: number, y: number, type: string) => void;
  disconnectBtn: () => void;
}

export default function DragMousePage(props:Props) {
  return (
    <View>
      <TouchScreen
        setPos={props.setPos}
      />
      <Button
        title="Disconnect"
        onPress={() => {props.disconnectBtn()}}
      />
    </View>
  );
}
