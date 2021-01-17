import Color from 'color'

const hexaToRgb = (color: string) =>
  Color(color)
    .rgb()
    .string()

export const COLOR_GREEN_1 = '#31E897'
export const COLOR_GREEN_1_RGB = hexaToRgb(COLOR_GREEN_1)
export const COLOR_GREEN_2 = '#3CD16C'
export const COLOR_WHITE = '#FFFFFF'
export const COLOR_GRAY = '#272727'
export const COLOR_DARK_GRAY = '#121212'
export const COLOR_BLACK = '#333333'
export const COLOR_LIGHT_GREEN = '#B7EDD5'
export const COLOR_RED = '#BF0404'
export const COLOR_RED_RGB = hexaToRgb(COLOR_RED)
export const COLOR_LIGHT_RED = '#FC5A5A'
export const COLOR_LIGHT_RED_RGB = hexaToRgb(COLOR_LIGHT_RED)
