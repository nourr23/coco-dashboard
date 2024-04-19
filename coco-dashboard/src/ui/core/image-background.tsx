import { styled, useColorScheme } from "nativewind";
import { ImageBackground as NImageBackground } from "react-native";

const SNImageBackground = styled(NImageBackground);

export const ImageBackground = ({ children, ...otherProps }: any) => {
  return <SNImageBackground {...otherProps}>{children}</SNImageBackground>;
};
