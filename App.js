import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();


let edgeValues = [10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180];

export default function App() {

  const {width} = useWindowDimensions();
  const [colors, setColors] = useState([]);
  const edge = useRef(edgeValues[7])
  
  function randomColorGenerator(){
    let r, g, b;

    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  const renderItem = (color) =>{
    return(<View style={styles.cell(color, edge.current)} />);
  }

  function generateTable(){

    let colorArray = Array(Math.ceil(width/edge.current));

    for(let i = 0; i < colorArray.length; ++i)
      colorArray[i] = Array(Math.ceil(width/edge.current));

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

      {colors.map((row, index1) => 
        <View style={styles.row} key={index1}>
          <FlatList
            data={row}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            getItemLayout={(data, index) => (
              {length: edge.current, offset: edge.current * index, index}
            )}
          />
        </View>
      )}

      <Slider 
        style={styles.slider}
        minimumValue={0}
        maximumValue={edgeValues.length-1}
        step={1}
        value={7}
        minimumTrackTintColor="#24AFC1"
        maximumTrackTintColor="#000000"
        thumbTintColor="#FCCF47"
        onValueChange={ value => edge.current = edgeValues[edgeValues.length-value-1] }
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

  row: {
    flexDirection: "row",
  },

  cell: (color, edge) => ({
    height: edge, 
    aspectRatio: 1, 
    backgroundColor: color.item.color
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
