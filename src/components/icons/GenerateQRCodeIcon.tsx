import * as React from 'react';
import {Path, Rect, SvgProps} from 'react-native-svg';
import IconWrapper from './IconWrapper';
const GenerateQRCodeIcon = (props: SvgProps) => (
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
    <Rect width={5} height={5} x={3} y={3} rx={1} />
    <Rect width={5} height={5} x={16} y={3} rx={1} />
    <Rect width={5} height={5} x={3} y={16} rx={1} />
    <Path d="M21 16h-3a2 2 0 0 0-2 2v3m5 0v.01M12 7v3a2 2 0 0 1-2 2H7m-4 0h.01M12 3h.01M12 16v.01M16 12h1m4 0v.01M12 21v-1" />
  </IconWrapper>
);
export default GenerateQRCodeIcon;
