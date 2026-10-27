import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LogoMarkProps {
  width?: number;
  height?: number;
  color?: string;
}

export const VeryfyLogo: React.FC<LogoMarkProps> = ({
  width = 68,
  height = 74,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 108 118" fill="none">
      <Path
        d="M0 45.75L28.94 112.73H41.35L12.41 45.75H0Z"
        fill={color}
      />
      <Path
        d="M29.39 118L64.88 35.85L76.54 0H108L73.12 80.64L60.31 106.84L54.76 118H29.39ZM44.29 110.82L70.47 50.48L88.94 10.93H79.61L44.29 110.82Z"
        fill={color}
      />
    </Svg>
  );
};
