import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('screen');

export default function App() {
  const [resolution, setResulation] = useState(15);
  const [colors, setColors] = useState(() => generateTable(resolution));
  const [opacity, setOpacity] = useState(0);

  function randomColorGenerator() {
    let r, g, b;

    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  function generateTable(resolution) {
    let colorArray = Array(resolution);

    for (let i = 0; i < colorArray.length; ++i)
      colorArray[i] = Array(resolution);

    for (let i = 0; i < colorArray.length; ++i) {
      for (let j = 0; j < colorArray[i].length; ++j) {
        colorArray[i][j] = randomColorGenerator();
      }
    }

    return colorArray;
  }

  return (
    <SafeAreaView style={styles.page} onLayout={SplashScreen.hideAsync}>
      <StatusBar style="dark" />

      {colors.map((row, index) => (
        <View style={styles.row(resolution)} key={index}>
          {row.map((cell, index) => (
            <View style={styles.cell(100 / resolution, cell)} key={index} />
          ))}
        </View>
      ))}

      <Text style={styles.resolutionText}>
        {'Table Resolution: ' +
          resolution.toString().padStart(2, '\u2007') +
          ' x ' +
          resolution.toString().padEnd(2, '\u2007')}
      </Text>

      <View style={styles.tooltip(opacity, resolution)}>
        <Text style={styles.tooptipText}>{resolution}</Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={30}
        step={1}
        value={resolution}
        minimumTrackTintColor="#24AFC1"
        maximumTrackTintColor="#000000"
        thumbTintColor="#FCCF47"
        onValueChange={(value) => {
          setResulation(value);
          setColors(generateTable(value));
        }}
        onSlidingStart={() => setOpacity(1)}
        onSlidingComplete={() => setOpacity(0)}
      />

      <TouchableOpacity
        onPress={() => setColors(generateTable(resolution))}
        style={styles.button}
      >
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
    flexDirection: 'row',
    width: '100%',
    aspectRatio: tableResolution,
  }),

  cell: (width, color) => ({
    height: '100%',
    width: `${width}%`,
    backgroundColor: color,
  }),

  resolutionText: {
    fontSize: 28,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 18,
  },

  tooltip: (opacity, resolution) => ({
    backgroundColor: '#24AFC1',
    justifyContent: 'center',
    width: 50,
    height: 40,
    borderRadius: 8,
    opacity: opacity,
    transform: [
      {
        translateX: (0.14 + 0.0248 * (resolution - 1)) * width - 25,
      },
    ],
  }),

  tooptipText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
  },

  slider: {
    width: '80%',
    height: 40,
    alignSelf: 'center',
  },

  button: {
    marginTop: 40,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#1795A8',
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
