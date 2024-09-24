import * as React from 'react';
import {Path, SvgProps} from 'react-native-svg';
import IconWrapper from './IconWrapper';
const ZapOffIcon = (props: SvgProps) => (
  <IconWrapper
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <Path d="M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773m-2.787 2.87L10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643M2 2l20 20" />
  </IconWrapper>
);
export default ZapOffIcon;
