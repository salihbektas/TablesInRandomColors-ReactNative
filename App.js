import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const digits = [
    "0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"
  ];

  function randomColorGenerator(){
    let color = "#";

    for(let i = 0; i < 6; ++i){
      color += digits[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  const [color, setColor] = useState(randomColorGenerator());

  console.log(color);


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{height:100, aspectRatio:1, backgroundColor:color}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
