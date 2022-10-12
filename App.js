import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

const {width: WIDTH} = Dimensions.get("screen");

let edge = 36;
let edgeValues = [10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180];

export default function App() {

  function randomColorGenerator(){
    let r, g, b;

    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  const renderItem = (color) =>{
    return(<View style={{ height: edge, aspectRatio: 1, backgroundColor:color.item.color}} />);
  }

  function generateTable(){

    let colorArray = Array(Math.ceil(WIDTH/edge));

    for(let i = 0; i < colorArray.length; ++i)
      colorArray[i] = Array(Math.ceil(WIDTH/edge));

    for(let i = 0; i < colorArray.length; ++i){
      for(let j = 0; j < colorArray[i].length; ++j){
        colorArray[i][j] = {color:randomColorGenerator(), id:`${i}${j}`};
      }
    }
    setColors(colorArray);
  }

  const [colors, setColors] = useState([]);

  useEffect(()=>{
    generateTable();
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      {colors.map((row, index1) => 
        <View style={styles.row} key={index1}>
          <FlatList
            data={row}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            getItemLayout={(data, index) => (
              {length: edge, offset: edge * index, index}
            )}
          />
        </View>
      )}

      <Slider 
        style={{width: "80%", height: 40, alignSelf:"center", marginTop: 20}}
        minimumValue={0}
        maximumValue={edgeValues.length-1}
        step={1}
        value={7}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={ value => edge=edgeValues[edgeValues.length-value-1]}
      />

      <Pressable onPress={generateTable} style={styles.button}>
        <Text>Generate</Text>
      </Pressable>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#CCC',
  },
  row: {
    flexDirection: "row",
  },
  button:{
    marginTop:40, 
    paddingVertical:10, 
    borderRadius:6, 
    backgroundColor:"green", 
    width:"40%", 
    alignSelf:"center", 
    alignItems:"center",
  },
});
