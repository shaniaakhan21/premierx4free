import { createMakeAndWithStyles } from 'tss-react';
import theme from '../theme';

export const { makeStyles, withStyles } = createMakeAndWithStyles({
  useTheme: () => theme,
  /*
    OR, if you have extended the default mui theme adding your own custom properties:
    Let's assume the myTheme object that you provide to the <ThemeProvider /> is of
    type MyTheme then you'll write:
    */
  //"useTheme": useTheme as (()=> MyTheme)
});
