import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const {height: HEIGHT, width: WIDTH} = Dimensions.get("screen");

export default function App() {
  const EDGE = 10;

  const digits = [
    "0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"
  ];


  let colorArray = Array(Math.ceil(HEIGHT/EDGE));

  for(let i = 0; i < colorArray.length; ++i)
    colorArray[i] = Array(Math.ceil(WIDTH/EDGE));
  

  function randomColorGenerator(){
    let color = "#";

    for(let i = 0; i < 6; ++i){
      color += digits[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  const [colors, setColors] = useState([]);

  useEffect(()=>{
    let newArr = [...colorArray];
    for(let i = 0; i < colorArray.length; ++i){
      for(let j = 0; j < colorArray[i].length; ++j){
        newArr[i][j] = randomColorGenerator();
      }
    }

    setColors(newArr);
  }, []);

  return (
    <View style={styles.page}>
      {colors.map((row, index1) => 
        <View style={styles.row} key={index1}>
          {row.map((item, index) => <View style={{height: EDGE, aspectRatio: 1, backgroundColor: item}} key={index} />)}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: "row",
  }
});
