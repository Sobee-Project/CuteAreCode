import * as React from 'react';
import {Path, SvgProps} from 'react-native-svg';
import IconWrapper from './IconWrapper';
const XIcon = (props: SvgProps) => (
  <IconWrapper
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="M18 6 6 18M6 6l12 12" />
  </IconWrapper>
);
export default XIcon;
