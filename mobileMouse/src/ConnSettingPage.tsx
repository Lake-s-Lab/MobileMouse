import { View, Text, StyleSheet, Button, SafeAreaView, Alert, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Pressable } from "react-native";
import styles from "./styles";
import React, { useEffect, useRef } from "react";

interface Props{
  ip: string;
  port: string;
  isConnected: boolean;
  setIp: (ip: string) => void;
  setPort: (port: string) => void;
  connectBtn: () => void;
}

export default function ConnSettingPage(props: Props) {
  const connectBtn = () => {
    props.connectBtn();
  }

  return(
    <View style= {styles.content}>
      <View style={{alignItems: "center"}}>
        <TextInput
          style={styles.ipInput}
          placeholder="Host IP"
          keyboardType="numeric"
          onChangeText={(text) => {props.setIp(text)}}
          value={props.ip}
        />
        <TextInput
          style={styles.ipInput}
          placeholder="Host Port"
          keyboardType="numeric"
          onChangeText={(text) => {props.setPort(text)}}
          value={props.port}
        />
        <Button onPress={connectBtn} title="Connect">
        </Button>
      </View>
    </View>
  );  
}