import {colors} from '@/theme/color';
import {families} from '@/theme/font';
import {mvs} from '@/utils/responsive';
import React, {forwardRef} from 'react';
import {ColorValue, StyleSheet, Text, TextProps, TextStyle} from 'react-native';

type Props = {
  weight?: keyof typeof families;
  size?: number;
  color?: string | ColorValue;
  children: React.ReactNode;
  align?: TextStyle['textAlign'];
} & Omit<TextProps, 'children'>;

const AppText = forwardRef<Text, Props>(
  (
    {
      children,
      weight = 'regular',
      size = 14,
      color = colors.black,
      align = 'left',
      style = {},
      ...rest
    },
    ref,
  ) => {
    return (
      <Text
        ref={ref}
        {...rest}
        style={StyleSheet.flatten([
          {
            fontFamily: families[weight],
            fontSize: mvs(size),
            color,
            textAlign: align,
          },
          style,
        ])}>
        {children}
      </Text>
    );
  },
);

export default AppText;
