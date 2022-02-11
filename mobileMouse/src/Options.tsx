import React, { useEffect } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
  setMouseSpeed: (speed: number) => void;
  disconnectBtn: () => void;
}

export default function Options(props:Props) {
  const [isPressed, setIsPressed] = React.useState(false);
  const [optionSize, setOptionSize] = React.useState({width: styles.options.width, height: styles.options.height});

  const optionBtn = () => {
    setIsPressed(!isPressed);
  }

  const mouseSpeedBtn = (speed:number) => {
    props.setMouseSpeed(speed);
  }


  return (
    <View style={{position: "absolute", width: optionSize.width, height: optionSize.height, backgroundColor: "blue", top: 70, right: 20}}>
      {isPressed ? (
        <View style={{width: "100%", height: "100%"}}>
          <TouchableOpacity
          style={[styles.options]}
          onPress={optionBtn}
          >
            <Image
              source={require("./../assets/option.png")}
              style={{ width: "100%", height: "100%", resizeMode: "contain"}}
            />
          </TouchableOpacity>
          
          {/* Deprecated */}
          {/* <TouchableOpacity
          style={[styles.options]}
          onPress={() => {
            Alert.prompt(
              "Set Mouse Speed",
              "Enter a number between 1 and 10",
              [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel"
                },
                {
                  text: "Enter",
                  onPress: (speed:any) => {
                    mouseSpeedBtn(speed)                    
                  }
                }
              ],
            )
          }}
          >
            
            <Text>Speed</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
          style={[styles.options]}
          onPress={props.disconnectBtn}
          >
            <Text>Quit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[ styles.options ]}
          onPress={optionBtn}
        >
          <Image
            source={require("./../assets/option.png")}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
