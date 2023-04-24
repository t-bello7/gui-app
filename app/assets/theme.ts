const palette = {
    green: '#0ECD9D',
    black: '#0B0B0B',
    white: '#F0F2F3',
    orange: '#FF6C44',
    gray: '#677288',
    lightGray: '#D2D5DC'
}

export const theme = {
    colors: {
      background: palette.lightGray,
      foreground: palette.black,
      white: palette.white,
      primary: palette.orange,
      success: palette.green,
   },
   spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40
   },
   textVariant: {
        header: {
            fontFamily: 'Nunito',
            fontSize: 36,
            fontWeight: 'bold'
        },
        body: {
            fontFamily: 'Poppins',
            fontSize: 16
        }
   },
   breakPoints: {
    smallPhone: 0,
    phone: 321,
    tablet: 768,
   }
}


export const darkTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        background: palette.black,
        foreground: palette.white
    }
}


// export const getBreakpointForScreenSize = ({theme: any, dimensions: any}) => {
//     const sortedBreakpoints = Object.entries(theme.breakpoints).sort(
//       (valA: any, valB: any) => {
//         return valA[1] - valB[1]
//       }
//     )
  
//     return sortedBreakpoints.reduce((acc, [breakpoint, minWidth]) => {
//       if (dimensions.width >= minWidth) return breakpoint
//       return acc
//     }, null)
//   }
  

// export const getResponsiveValue = ({value, dimensions, theme}) => {
//     if (typeof value === 'object') {
//       return value[getBreakpointForScreenSize({theme, dimensions})]
//     }
//     return value
//   }
  