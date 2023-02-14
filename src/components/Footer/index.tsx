import { Grid, Link, Typography } from '@mui/material';
import Logo from '../Logo';
import { FOOTER_ITEMS, FOOTER_SOCIAL_SHARE_ITEMS } from './Footer.constants';
import { FooterItem, FooterColumn, FooterSocialShare } from './Footer.types';
import useStyles from './styles';

function Footer(): JSX.Element {
	const { classes } = useStyles();

	const renderFooterItem = (item: FooterItem) => {
		return (
			<Grid item style={{ marginTop: 4 }}>
				<Link href={item.link}>
					<Typography variant='subtitle2' className={classes.link}>
						{item.title}
					</Typography>
				</Link>
			</Grid>
		)
	}

	const renderColumn = (item: FooterColumn) => {
		return (
			<Grid item sm={4}>
				<Typography variant='button' className={classes.columnTitle}>
					{item.title}
				</Typography>
				{item.items.map(renderFooterItem)}
			</Grid>
		)

	}

	const renderSocialShare = (item: FooterSocialShare) => {
		return (
			<Grid item>
				<Link href={item.link}>
					<img src={item.icon} />
				</Link>
			</Grid>
		)
	}

	return (
		<Grid container className={classes.container} alignItems='center'>
			<Grid item xs={12} md={2}>
				<Link href='/'>
					<Logo />
				</Link>
			</Grid>
			<Grid item xs={12} md={8}>
				<Grid container spacing={1} className={classes.items}>
					{FOOTER_ITEMS.map(renderColumn)}
				</Grid>
			</Grid>
			<Grid item xs={12} md={2}>
				<Grid container spacing={4}>
					{FOOTER_SOCIAL_SHARE_ITEMS.map(renderSocialShare)}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Footer