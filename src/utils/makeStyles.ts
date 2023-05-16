import { createMakeAndWithStyles } from 'tss-react';
import theme from '../theme';

export const { makeStyles, withStyles } = createMakeAndWithStyles({
  useTheme: () => theme,
});