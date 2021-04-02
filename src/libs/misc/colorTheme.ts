import colors from 'colors';

export const colorTheme = {
  error: (str: string): void => {
    console.log(colors.red(str));
  },
  success: (str: string): void => {
    console.log(colors.green(str));
  },
  warning: (str: string): void => {
    console.log(colors.yellow(str));
  },
  custom: colors,
};
