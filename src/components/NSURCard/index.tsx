import React from 'react'
import { Typography } from '@mui/material'
import useStyles from './styles'

const nsurCardBg = '/assets/svg/nsurCardBg.svg'

interface NSURCardProps {
	auth?: string
	bin?: string
	grp?: string
	pcn?: string
	hideNumbers?: boolean
}


function NSURCard(props: NSURCardProps) {
	const {
		auth = '123123456',
		bin = '610378',
		grp = '218310',
		pcn = 'SC1',
		hideNumbers = false
	} = props
	const { classes } = useStyles()

	return (
		<div className={classes.container}>
			<div className={classes.innerContainer}>
				<img src={nsurCardBg} style={{ width: '100%', }} />
				<div className={classes.cardInner}>
					<Typography variant="h6" className={classes.whiteTxt}>
						Prescription savings Card
					</Typography>
					{
						hideNumbers ? (
							<Typography variant='subtitle2' className={classes.whiteTxt} style={{ maxWidth: 320 }}>
								Every time you buy your prescriptions using your card, you will earn $1 free NSUR Coin
							</Typography>

						)
							: (
								<div className={classes.cardContent}>
									<div className={classes.cardContentColumn}>
										<Typography className={classes.whiteTxt}>
											AUTH{' '}
											<Typography className={classes.whiteTxt} display="inline">
												{auth}
											</Typography>
										</Typography>
										<Typography className={classes.whiteTxt}>
											GRP{' '}
											<Typography className={classes.whiteTxt} display="inline">
												{grp}
											</Typography>
										</Typography>
									</div>
									<div className={classes.cardContentColumn}>
										<Typography className={classes.whiteTxt}>
											BIN{' '}
											<Typography className={classes.whiteTxt} display="inline">
												{bin}
											</Typography>
										</Typography>
										<Typography className={classes.whiteTxt}>
											PCN{' '}
											<Typography className={classes.whiteTxt} display="inline">
												{pcn}
											</Typography>
										</Typography>
									</div>
								</div>
							)
					}
				</div>
			</div>
		</div>
	)
}

export default NSURCard
