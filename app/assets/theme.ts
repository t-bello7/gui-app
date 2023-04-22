const palette = {
    purple: '#5A31F4',
    green: '#0ECD9D',
    red: '#CD0E61',
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
      primary: palette.purple,
      success: palette.green,
      danger: palette.red,
      failure: palette.red,
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