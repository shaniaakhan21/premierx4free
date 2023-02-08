import useStyles from './styles';

interface LogoProps {
	textColor?: "white" | "black";
	className?: string
}

function Logo(props: LogoProps): JSX.Element {
	const { textColor = 'white', className } = props
	const classes = useStyles()
	return (
		<img src={textColor === 'white' ? '/svg/logo.svg' : '/svg/logo-black.svg'} className={`${classes.logo} ${className}`} />
	)
}

export default Logo