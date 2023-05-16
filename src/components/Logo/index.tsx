import useStyles from './styles';

interface LogoProps {
	textColor?: 'black' | 'white';
	className?: string
}

function Logo(props: LogoProps): JSX.Element {
  const { className } = props;
  const { classes } = useStyles();
  return (
    <img src={'/assets/svg/logo-black.svg'} className={`${classes.logo} ${className}`} />
  );
}

export default Logo;