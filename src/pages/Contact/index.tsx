import { Typography } from "@material-ui/core"
import Footer from "../../components/Footer"
import ContactForm from "../../components/forms/ContactForm"
import useStyles from "./styles"

function ContactPage(): JSX.Element {
	const classes = useStyles()
	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<Typography className={classes.title}>
					Contact us
				</Typography>
				<ContactForm />
			</div>
			<Footer />
		</div>
	)
}

export default ContactPage