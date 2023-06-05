import { Typography } from "@mui/material"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import ContactForm from "../../components/forms/ContactForm"
import useStyles from "./styles"
import { useTranslation } from "react-i18next";

function ContactPage(): JSX.Element {
  const { classes } = useStyles()
  const [tr] = useTranslation()

  const t = (key: string) => tr(`contact-us.${key}`)

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.content}>
          <Typography className={classes.title}>
            {t('title')}
          </Typography>
          <ContactForm />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default ContactPage
