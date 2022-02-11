import { Button, Text, View, Animated, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import ConnSettingPage from "./ConnSettingPage";
import styles from "./styles";
import DragMousePage from "./DragMousePage";

export default function MainPage() {
  const [pageName, setPageName] = React.useState("MainPage");
  const [ip, setIp] = React.useState("");
  const [port, setPort] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(false);
  const [mouseSpeed, setMouseSpeed] = React.useState(1);

  const ws = useRef<any>(null);

  const connectBtn = () => {
    setIp(ip);
    setPort(port);
    setIsConnected(true);
    setPageName("DragMousePage");
  }

  const disconnectBtn = () => {
    ws.current.close();
    setIsConnected(false);
    setPageName("MainPage");
  
  }

  const setPos = (x: number, y: number, type: string) => {
    // console.log("send");
    
    ws.current.send(JSON.stringify({x: x.toString(), y: y.toString(), type: type, speed: mouseSpeed.toString()}));
  }

  useEffect(() => {
    if(isConnected){
      const url = `ws://${ip}:${port}`;
      ws.current = new WebSocket(url);
  
      ws.current.onopen = (event:any) => {
        console.log("onopen");
        ws.current.send(JSON.stringify({type: "Connect"}));
  
      }
  
      ws.current.onmessage = (event:any) => {
        console.log("onmessage : " + event.data);
      }
  
      ws.current.onclose = (event:any) => {
        console.log("onclose");
        setIsConnected(false);
      }  
    }
  }, [isConnected])


  if(pageName === "MainPage"){
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="height" style={styles.background}>
          <View style={styles.titleArea}>
            <Text style={{fontSize: 30}}>Mobile Mouse</Text>
          </View>
          <ConnSettingPage 
            ip={ip}
            port={port}
            isConnected={isConnected}
            setIp={setIp}
            setPort={setPort}
            connectBtn={connectBtn}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )  
  }

  else if(pageName === "DragMousePage"){
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="height" style={styles.background}>
          <DragMousePage
            setPos={setPos}
            disconnectBtn={disconnectBtn}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }

  else if(pageName === "TiltMousePage"){
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="height" style={styles.background}>
          
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }

  return(
    <View>
      <Text>Hello World!</Text>
    </View>
  )
}

