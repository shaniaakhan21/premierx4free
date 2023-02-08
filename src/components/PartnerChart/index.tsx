import Logo from '../Logo';
import useStyles from './styles';

const partell = '/svg/Home/ellipse-partell.svg'
const bma = '/svg/Home/ellipse-bma.svg'
const nsurx = '/svg/Home/ellipse-nsurx.svg'
const swiftMD = '/svg/Home/ellipse-swiftmd.svg'

const partellIcon = '/svg/Home/icon-partell.svg'
const bmaIcon = '/svg/Home/icon-bma.svg'
const nsurxIcon = '/svg/Home/icon-nsurx.svg'
const swiftMDIcon = '/svg/Home/icon-swiftmd.svg'


interface PartnerChartProps {
	onHover?: (idx: number) => unknown; // top right arc is 0, bottom right is 1, bottom left is 2, top left is 3
}

function PartnerChart(props: PartnerChartProps): JSX.Element {
	const { onHover = () => { } } = props
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.row}>
				<div className={classes.quarter1} onMouseEnter={() => onHover(0)}>
					<img src={partell} className={classes.ellipseImg} />
					<img src={partellIcon} className={`icon ${classes.icon1}`} />
				</div>
				<div className={classes.quarter2} onMouseEnter={() => onHover(1)}>
					<img src={bma} className={classes.ellipseImg} />
					<img src={bmaIcon} className={`icon ${classes.icon2}`} />
				</div>
			</div>
			<div className={classes.row}>
				<div className={classes.quarter3} onMouseEnter={() => onHover(2)}>
					<img src={swiftMD} className={classes.ellipseImg} />
					<img src={swiftMDIcon} className={`icon ${classes.icon3}`} />
				</div>
				<div className={classes.quarter4} onMouseEnter={() => onHover(3)}>
					<img src={nsurx} className={classes.ellipseImg} />
					<img src={nsurxIcon} className={`icon ${classes.icon4}`} />
				</div>
			</div>
			<div className={classes.logoContainer}>
				<Logo textColor='black' className={classes.logo} />
			</div>
		</div >
	)
}

export default PartnerChart