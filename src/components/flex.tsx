import React, { useMemo, CSSProperties, FC } from "react";

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  gap?: CSSProperties["gap"];
  direction?: CSSProperties["flexDirection"];
  mt?: CSSProperties["marginTop"];
  mb?: CSSProperties["marginBottom"];
  ml?: CSSProperties["marginLeft"];
  mr?: CSSProperties["marginRight"];
  style?: CSSProperties;
}

const Flex: FC<FlexProps> = ({ align = "start", justify = "flex-start", gap = "0", direction = "row", mt = "0", mb = "0", ml = "0", mr = "0", style, ...rest }) => {
  const styled = useMemo(
    () => ({
      display: "flex",
      justifyContent: justify,
      alignItems: align,
      flexDirection: direction,
      gap,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
    }),
    [align, justify, gap, direction, mt, mb, ml, mr]
  );

  return <div style={{ ...styled, ...style }} {...rest} />;
};

export default Flex;
