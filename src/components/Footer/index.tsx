import { Grid, Link, Typography } from '@mui/material';
import Logo from '../Logo';
import { FOOTER_ITEMS, FOOTER_SOCIAL_SHARE_ITEMS } from './Footer.constants';
import { FooterItem, FooterColumn, FooterSocialShare } from './Footer.types';
import useStyles from './styles';

function Footer(): JSX.Element {
	const { classes } = useStyles();

	const renderFooterItem = (item: FooterItem, index: number) => {
		return (
			<Grid item style={{ marginTop: 4 }} key={index}>
				<Link href={item.link}>
					<Typography variant='subtitle2' className={classes.link}>
						{item.title}
					</Typography>
				</Link>
			</Grid>
		)
	}

	const renderColumn = (item: FooterColumn, index: number) => {
		return (
			<Grid key={index} item sm={4}>
				<Typography variant='button' className={classes.columnTitle}>
					{item.title}
				</Typography>
				{item.items.map((item, index) => renderFooterItem(item, index))}
			</Grid>
		)

	}

	const renderSocialShare = (item: FooterSocialShare, index: number) => {
		return (
			<Grid item key={index}>
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
				<img src={'/assets/svg/logo.svg'} className={classes.logo} />
				</Link>
			</Grid>
			<Grid item xs={12} md={8}>
				<Grid container spacing={1} className={classes.items}>
				{FOOTER_ITEMS.map((item, index) => renderColumn(item, index))}
				</Grid>
			</Grid>
			<Grid item xs={12} md={2}>
				<Grid container spacing={4}>
					{FOOTER_SOCIAL_SHARE_ITEMS.map((item, index ) => renderSocialShare(item,index))}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Footer