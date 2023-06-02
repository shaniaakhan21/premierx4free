import { Typography } from "@mui/material"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import ContactForm from "../../components/forms/ContactForm"
import useStyles from "./styles"

function ContactPage(): JSX.Element {
  const { classes } = useStyles()
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.content}>
          <Typography className={classes.title}>
            Contact us
          </Typography>
          <ContactForm />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default ContactPage
