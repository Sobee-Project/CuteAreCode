import {BOTTOM_TAB_HEIGHT} from '@/utils/responsive';
import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
const {width: WIDTH, height} = Dimensions.get('screen');
const HEIGHT = height - BOTTOM_TAB_HEIGHT - 20;
const SQUARE_DIMENSIONS = 300;
const SCANBOX_SIZE = 80;
const left = WIDTH / 2 - SQUARE_DIMENSIONS / 2;
const top = HEIGHT / 2 - SQUARE_DIMENSIONS / 2;
const cornerPosition = top - 10;

const Overlay = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const flickValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(flickValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(flickValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    return () => {
      scaleValue.stopAnimation();
      flickValue.stopAnimation();
    };
  }, [scaleValue, flickValue]);

  return (
    <View style={styles.container}>
      <View style={styles.top} />
      <View style={styles.bottom} />
      <View style={styles.left} />
      <View style={styles.right} />
      <View style={styles.overlay} />
      <Animated.View
        style={[
          styles.flick,
          {
            opacity: flickValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.topCorner,
          styles.corner,
          {
            transform: [{scale: scaleValue}],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bottomCorner,
          styles.corner,
          {
            transform: [{scale: scaleValue}],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.leftCorner,
          styles.corner,
          {
            transform: [{scale: scaleValue}],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.rightCorner,
          styles.corner,
          {
            transform: [{scale: scaleValue}],
          },
        ]}
      />
    </View>
  );
};

export default Overlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  top: {
    height: top,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left,
    right: left,
  },
  topCorner: {
    borderLeftWidth: 4,
    borderTopWidth: 4,
    top: cornerPosition,
    left: left - 10,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left,
    right: left,
    height: top,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomCorner: {
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    bottom: cornerPosition,
    left: left - 10,
  },
  left: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: left,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  leftCorner: {
    borderRightWidth: 4,
    borderTopWidth: 4,
    top: cornerPosition,
    right: left - 10,
  },
  right: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: left,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rightCorner: {
    borderRightWidth: 4,
    borderBottomWidth: 4,
    bottom: cornerPosition,
    right: left - 10,
  },
  overlay: {
    width: SQUARE_DIMENSIONS,
    height: SQUARE_DIMENSIONS,
    borderWidth: 4,
    borderColor: '#ffffff40',
    alignSelf: 'center',
  },
  corner: {
    width: SCANBOX_SIZE,
    height: SCANBOX_SIZE,
    borderColor: '#ffffff',
    position: 'absolute',
  },
  flick: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#FF000080',
    left,
    right: left,
  },
});
