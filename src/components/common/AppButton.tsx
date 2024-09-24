import {colors} from '@/theme/color';
import {s} from '@/utils/responsive';
import React, {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  ColorValue,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
} from 'react-native';

type Props = PropsWithChildren<
  PressableProps & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    color?: string | ColorValue;
    isLoading?: boolean;
    size?: 'small' | 'medium' | 'large';
    showShadow?: boolean;
    variant?: 'default' | 'outline' | 'clear';
    isDisabled?: boolean;
  }
>;

const EmptyIcon = () => <View />;

const AppButton = ({
  children,
  style,
  leftIcon = <EmptyIcon />,
  rightIcon = <EmptyIcon />,
  color = colors.main,
  isLoading = false,
  showShadow = false,
  size = 'medium',
  variant = 'default',
  isDisabled = false,
  ...rest
}: Props) => {
  const sizeToPadding = {
    small: {
      paddingHorizontal: s(12),
      paddingVertical: s(8),
    },
    medium: {
      paddingHorizontal: s(20),
      paddingVertical: s(10),
    },
    large: {
      paddingHorizontal: s(24),
      paddingVertical: s(12),
    },
  };

  const variantStyle = {
    default: {
      backgroundColor: color,
      borderColor: color,
    },
    outline: {
      backgroundColor: colors.white,
      borderColor: color,
    },
    clear: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  };

  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      style={StyleSheet.flatten([
        styles.container,
        {
          ...sizeToPadding[size],
          ...variantStyle[variant],
          elevation: showShadow ? 4 : 0,
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ])}>
      {leftIcon}
      <View style={styles.childrenContainer}>
        {children}
        {isLoading && <ActivityIndicator color={colors.white} />}
      </View>
      {rightIcon}
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    flexDirection: 'row',
    gap: 4,
    borderWidth: 1,
    alignItems: 'center',
  },
  childrenContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});
