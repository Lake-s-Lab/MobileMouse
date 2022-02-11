import { Button, Text, View, Animated, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert } from "react-native";
import React, { useEffect, useRef } from "react";
import ConnSettingPage from "./ConnSettingPage";
import styles from "./styles";
import DragMousePage from "./DragMousePage";

export default function MainPage() {
  const [pageName, setPageName] = React.useState("MainPage");
  const [ip, setIp] = React.useState("");
  const [port, setPort] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(false);

  const ws = useRef<any>(null);

  const connectBtn = () => {
    const addrformat = /(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}[:]([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/;
    
    if(addrformat.test(`${ip}:${port}`)){

      setIp(ip);
      setPort(port);
      setIsConnected(true);
      setPageName("DragMousePage");
  
    }
    else{
      Alert.alert("Invalid IP or Port");
    }
  }

  const disconnectBtn = () => {
    ws.current.close();
    setIsConnected(false);
    setPageName("MainPage");
  }

  const setPos = (x: number, y: number, clickBehavior: string, mouseSpeed: number) => {
    // console.log("send");
    console.log(x, y, clickBehavior, mouseSpeed);
    
    ws.current.send(JSON.stringify({x: x.toString(), y: y.toString(), type: clickBehavior, speed: mouseSpeed.toString()}));
  }

  useEffect(() => {
    if(isConnected){
      const url = `ws://${ip}:${port}`;
      ws.current = new WebSocket(url);
  
      ws.current.onopen = (event:any) => {
        console.log("onopen");
        Alert.alert("Connected");
        ws.current.send(JSON.stringify({type: "Connect"}));
      }
  
      ws.current.onmessage = (event:any) => {
        console.log("onmessage : " + event.data);
      }
  
      ws.current.onclose = (event:any) => {
        console.log("onclose");
        Alert.alert("Disconnected");
        setIsConnected(false);
        setPageName("MainPage");
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

