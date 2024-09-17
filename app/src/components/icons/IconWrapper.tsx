import {s} from '@/utils/responsive';
import React from 'react';
import {Svg, SvgProps} from 'react-native-svg';

const IconWrapper = ({
  size = 24,
  viewBox = '0 0 24 24',
  children,
  ...props
}: SvgProps) => {
  const responsiveSize = s(size);
  return (
    <Svg
      {...props}
      width={responsiveSize}
      height={responsiveSize}
      viewBox={viewBox}>
      {children}
    </Svg>
  );
};

export default IconWrapper;
