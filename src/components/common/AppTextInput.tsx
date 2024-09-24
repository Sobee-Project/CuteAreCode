import {colors} from '@/theme/color';
import {families} from '@/theme/font';
import React, {forwardRef, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import AppText from './AppText';

type Props = {
  label?: string;
} & TextInputProps;

const AppTextInput = forwardRef<TextInput, Props>(
  ({style, label, ...rest}, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View>
        {label && (
          <AppText
            size={20}
            color={colors.black}
            style={{marginBottom: 6}}
            weight="bold">
            {label}
          </AppText>
        )}
        <TextInput
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={StyleSheet.flatten([
            styles.input,
            style,
            {
              borderColor: isFocused ? colors.main : colors.lightGray,
              backgroundColor: !isFocused ? colors.lightGray : colors.white,
            },
          ])}
          {...rest}
        />
      </View>
    );
  },
);

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: families.regular,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
});
