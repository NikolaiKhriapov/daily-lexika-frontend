export enum Color {
  WHITE = 'WHITE',      // 255, 255, 255
//    LIGHT_GRAY, // 192, 192, 192
//    GRAY,       // 128, 128, 128
//    DARK_GRAY,  // 64, 64, 64
//    BLACK,      // 0, 0, 0
//    RED,        // 255, 0, 0
//    PINK,       // 255, 175, 175
//    ORANGE,     // 255, 200, 0
  YELLOW = 'YELLOW',     // 255, 255, 0
  GREEN = 'GREEN',      // 0, 255, 0
//    MAGENTA,    // 255, 0, 255
//    CYAN,       // 0, 255, 255
//    BLUE        // 0, 0, 255
}

export const ColorRgb: Record<Color, string> = {
  [Color.WHITE]: 'rgb(255, 255, 255)',
  [Color.YELLOW]: 'rgb(243, 207, 34)',
  [Color.GREEN]: 'rgb(23, 154, 65)',
};
