import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

export default function App() {

  const [colors, setColors] = useState([]);
  const tableResolution = useRef(15)
  
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
        colorArray[i][j] = {color:randomColorGenerator(), id:`${i}${j}`};
      }
    }

    setColors(colorArray);
  }
  
  useEffect(()=>{
    generateTable();
  }, []);
  
  return (
    <SafeAreaView style={styles.page} onLayout={SplashScreen.hideAsync}>
      <StatusBar style="dark" />

      {colors.map((row, index) => 
        <View style={styles.row(tableResolution.current)} key={index}>
          {row.map((cell, index) => 
            <View style={styles.cell(100/tableResolution.current, cell.color)} key={index}/>)}
        </View>
      )}

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

      <TouchableOpacity onPress={generateTable} style={styles.button}>
        <Text>Generate</Text>
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
});
