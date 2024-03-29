import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

export default function App() {

  const tableResolution = useRef(15)
  const [colors, setColors] = useState(() => generateTable());
  
  function randomColorGenerator(){
    let r, g, b;

    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  function generateTable(){

    let colorArray = Array(tableResolution.current);

    for(let i = 0; i < colorArray.length; ++i)
      colorArray[i] = Array(tableResolution.current);

    for(let i = 0; i < colorArray.length; ++i){
      for(let j = 0; j < colorArray[i].length; ++j){
        colorArray[i][j] = randomColorGenerator();
      }
    }

    return colorArray;
  }

  return (
    <SafeAreaView style={styles.page} onLayout={SplashScreen.hideAsync}>
      <StatusBar style="dark" />

      {colors.map((row, index) => 
        <View style={styles.row(tableResolution.current)} key={index}>
          {row.map((cell, index) => 
            <View style={styles.cell(100/tableResolution.current, cell)} key={index}/>
          )}
        </View>
      )}

      <Text style={styles.resolutionText}>
        {"Table Resolution: " + tableResolution.current.toString().padStart(2, "\u2007") + " x " + tableResolution.current.toString().padEnd(2, "\u2007")}
      </Text>

      <Slider 
        style={styles.slider}
        minimumValue={1}
        maximumValue={30}
        step={1}
        value={15}
        minimumTrackTintColor="#24AFC1"
        maximumTrackTintColor="#000000"
        thumbTintColor="#FCCF47"
        onValueChange={value => tableResolution.current = value}
      />

      <TouchableOpacity onPress={() => setColors(generateTable())} style={styles.button}>
        <Text style={styles.buttonText}>Generate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  row: (tableResolution) => ({
    flexDirection: "row",
    width: "100%",
    aspectRatio: tableResolution,
  }),

  cell: (width, color) => ({
    height:"100%",
    width:`${width}%`,
    backgroundColor: color,
  }),

  resolutionText: {
    fontSize: 28,
    fontWeight: "600",
    alignSelf:"center",
    marginTop: 18
  },

  slider: {
    width: "80%",
    height: 40,
    alignSelf:"center",
    marginTop: 20
  },

  button:{
    marginTop:40, 
    paddingVertical:10, 
    borderRadius:6, 
    backgroundColor:"#1795A8", 
    width:"40%", 
    alignSelf:"center", 
    alignItems:"center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "500"
  }
});
