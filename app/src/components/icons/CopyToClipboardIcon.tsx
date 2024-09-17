import * as React from 'react';
import {Path, Rect, SvgProps} from 'react-native-svg';
import IconWrapper from './IconWrapper';
const CopyToClipboardIcon = (props: SvgProps) => (
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
    <Rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
    <Path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    <Path d="M16 4h2a2 2 0 0 1 2 2v4" />
    <Path d="M21 14H11" />
    <Path d="m15 10-4 4 4 4" />
  </IconWrapper>
);
export default CopyToClipboardIcon;
