import { Button } from '@material-ui/core';
import Logo from '../Logo';
import useStyles from './styles';

const partell = '/assets/svg/Home/ellipse-partell.svg'
const bma = '/assets/svg/Home/ellipse-bma.svg'
const nsurx = '/assets/svg/Home/ellipse-nsurx.svg'
const swiftMD = '/assets/svg/Home/ellipse-swiftmd.svg'

const partellIcon = '/assets/svg/Home/icon-partell.svg'
const bmaIcon = '/assets/svg/Home/icon-bma.svg'
const nsurxIcon = '/assets/svg/Home/icon-nsurx.svg'
const swiftMDIcon = '/assets/svg/Home/icon-swiftmd.svg'


interface PartnerChartProps {
	onHover?: (idx: number) => unknown; // top right arc is 0, bottom right is 1, bottom left is 2, top left is 3
	onHoverEnd?: () => unknown
}

function PartnerChart(props: PartnerChartProps): JSX.Element {
	const { onHover = () => { }, onHoverEnd = () => { } } = props
	const classes = useStyles();

	const onImageHovered = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
		console.log('idx ', idx)
		onHover(idx)
	}

	return (
		<div className={classes.container}>
			<div className={classes.row}>
				<div id="quarter1" className={classes.quarter1} onMouseEnter={(e) => onImageHovered(e, 0)} onMouseLeave={onHoverEnd}>
					<img src={partell} className={classes.ellipseImg} style={{ transform: 'translateY(90)', }} />
					<img src={partellIcon} className={`icon ${classes.icon1}`} />
				</div>
				<div id="quarter2" className={classes.quarter2} onMouseEnter={(e) => onImageHovered(e, 1)} onMouseLeave={onHoverEnd}>
					<img src={bma} className={classes.ellipseImg} />
					<img src={bmaIcon} className={`icon ${classes.icon2}`} />
				</div>
			</div>
			<div className={classes.row}>
				<div id="quarter3" className={classes.quarter3} onMouseEnter={(e) => onImageHovered(e, 2)} onMouseLeave={onHoverEnd}>
					<img src={swiftMD} className={classes.ellipseImg} />
					<img src={swiftMDIcon} className={`icon ${classes.icon3}`} />
				</div>
				<div id="quarter4" className={classes.quarter4} onMouseEnter={(e) => onImageHovered(e, 3)} onMouseLeave={onHoverEnd}>
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