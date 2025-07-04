export const breakpoints = {
  xs: '480px',   // Extra small devices (phones)
  sm: '640px',   // Small devices (landscape phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (desktops)
  xl: '1280px',  // Extra large devices (large desktops)
  xxl: '1536px'  // Extra extra large devices (larger desktops)
};

export const media = {
  xs: `@media (max-width: ${breakpoints.xs})`,
  sm: `@media (max-width: ${breakpoints.sm})`,
  md: `@media (max-width: ${breakpoints.md})`,
  lg: `@media (max-width: ${breakpoints.lg})`,
  xl: `@media (max-width: ${breakpoints.xl})`,
  xxl: `@media (max-width: ${breakpoints.xxl})`,
  
  // Min-width queries for progressive enhancement
  minXs: `@media (min-width: ${breakpoints.xs})`,
  minSm: `@media (min-width: ${breakpoints.sm})`,
  minMd: `@media (min-width: ${breakpoints.md})`,
  minLg: `@media (min-width: ${breakpoints.lg})`,
  minXl: `@media (min-width: ${breakpoints.xl})`,
  minXxl: `@media (min-width: ${breakpoints.xxl})`
};

// Helper function for responsive font sizes
export const responsiveFontSize = (xlSize, lgSize, mdSize, smSize, xsSize) => `
  font-size: ${xlSize};
  
  ${media.lg} {
    font-size: ${lgSize};
  }
  
  ${media.md} {
    font-size: ${mdSize};
  }
  
  ${media.sm} {
    font-size: ${smSize};
  }
  
  ${media.xs} {
    font-size: ${xsSize};
  }
`;

// Helper function for responsive spacing
export const responsiveSpacing = (xlSpace, lgSpace, mdSpace, smSpace, xsSpace) => `
  padding: ${xlSpace};
  
  ${media.lg} {
    padding: ${lgSpace};
  }
  
  ${media.md} {
    padding: ${mdSpace};
  }
  
  ${media.sm} {
    padding: ${smSpace};
  }
  
  ${media.xs} {
    padding: ${xsSpace};
  }
`;