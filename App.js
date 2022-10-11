import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const {width: WIDTH} = Dimensions.get("screen");

const EDGE = 10;

export default function App() {


  let colorArray = Array(Math.ceil(WIDTH/EDGE));

  for(let i = 0; i < colorArray.length; ++i)
    colorArray[i] = Array(Math.ceil(WIDTH/EDGE));
  

  function randomColorGenerator(){
    let r, g, b;

    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  const renderItem = (color) =>{
    return(<View style={{...styles.atom, backgroundColor:color.item.color}} />);
  }

  const [colors, setColors] = useState([]);

  useEffect(()=>{
    let newArr = [...colorArray];
    for(let i = 0; i < colorArray.length; ++i){
      for(let j = 0; j < colorArray[i].length; ++j){
        newArr[i][j] = {color:randomColorGenerator(), id:`${i}${j}`};
      }
    }
    setColors(newArr);
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
              {length: EDGE, offset: EDGE * index, index}
            )}
          />
        </View>
      )}
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
  atom: {
    height: EDGE,
    aspectRatio: 1,
  }
});
