import {AppText} from '@/components/common';
import {colors} from '@/theme/color';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

type Props = {
  icon?: React.ReactNode;
  title: string;
  right?: React.ReactNode;
  onPress: () => void;
};

const SettingItem = ({icon, onPress, right, title}: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <AppText weight="semiBold" align="left" style={{flex: 1}}>
        {title}
      </AppText>
      {right}
    </Pressable>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 14,
  },
  icon: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 8,
  },
});
