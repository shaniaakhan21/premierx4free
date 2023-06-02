import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '../../../../utils/makeStyles';
import * as React from 'react';
import { useAuth } from "../../../../contexts/auth.context";

interface SidebarMobileProps {
  sidebarToggle: boolean,
  setSidebarToggle: any,
}

function SidebarMobile(props: SidebarMobileProps) {
  const { user, setUser } = useAuth()

  const { setSidebarToggle } = props
  const { classes } = useStyles()
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(undefined)
    navigate('/')
  }

  return (
    <div className={classes.sidebar_mainContainer}>
      <div className={classes.sidebar_topRectangle}>
        <div className={classes.topRectangle_displayImage}>
          <img src='/assets/svg/Dashboard/dummy.svg' className={classes.displayImage} />
        </div>
        <div className={classes.topRectangle_text}>
          <p className={classes.nameText}>{user?.agentProfile?.name}</p>
          <span className={classes.emailText}>{user?.email}</span>
        </div>
      </div>

      <div className={classes.sidebar_navigation}>
        <Link className={classes.navigation_li} to='/admin' onClick={() => setSidebarToggle(false)}>
          <img src='/assets/svg/documents.svg' className={classes.navigation_img} />
          <p>Agent Documents</p>
        </Link>
        <Link className={classes.navigation_li} to='/admin/calculation' onClick={() => setSidebarToggle(false)}>
          <img src='/assets/svg/calculator.svg' className={classes.navigation_img} />
          <p>Calculation Page</p>
        </Link>
        <Link className={classes.navigation_li} to='/admin/agents' onClick={() => setSidebarToggle(false)}>
          <img src='/assets/svg/marketing.svg' className={classes.navigation_img} />
          <p>Agents</p>
        </Link>
        <Link className={classes.navigation_li} to='/admin/marketingMaterials' onClick={() => setSidebarToggle(false)}>
          <img src='/assets/svg/marketing.svg' className={classes.navigation_img} />
          <p>Marketing Materials</p>
        </Link>
        <Link className={classes.navigation_li} to='/admin/settings' onClick={() => setSidebarToggle(false)}>
          <img src='/assets/svg/setting.svg' className={classes.navigation_img} />
          <p>Settings</p>
        </Link>
        <div className={classes.navigation_li} onClick={handleLogout}>
          <img src='/assets/svg/logout.svg' className={classes.navigation_img} />
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles()(() => ({
  sidebar_mainContainer: {
    width: "100%",
    borderRight: "1px solid #D6D9DB"
  },
  sidebar_topRectangle: {
    width: "100%",
    height: "345px",
    background: "linear-gradient(205.19deg, #64B5F6 1.82%, #0556A7 100%)"
  },
  topRectangle_displayImage: {
    textAlign: "center"
  },
  topRectangle_logo: {
    textAlign: "center"
  },
  displayImage: {
    width: "145px",
    Height: "145px",
    marginTop: "40px"
  },
  logo: {
    width: "217.34px",
    height: "51px",
    marginTop: "22px"
  },
  topRectangle_text: {
    textAlign: "center",
    marginTop: "4px"
  },
  nameText: {
    fontFamily: "Nunito Sans",
    fontWeight: 700,
    fontSize: "27px",
    lineHeight: "36.83px",
    color: "#FFFFFF"
  },
  emailText: {
    fontFamily: "Nunito Sans",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "24.55px",
    color: "#FFFFFF"
  },
  sidebar_navigation: {},
  navigation_ul: {
    listStyleType: "none"
  },
  navigation_li: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    width: "100%",
    fontFamily: "Nunito Sans",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "23.19px",
    color: "#667B8B",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#F4F6F8",
      cursor: "pointer",
      color: "#000000"
    }
  },
  navigation_li_selected: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    width: "100%",
    fontFamily: "Nunito Sans",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "23.19px",
    color: "#000000",
    padding: "10px",
    backgroundColor: "#F4F6F8",
    "&:hover": {
      backgroundColor: "#F4F6F8",
      cursor: "pointer",
      color: "#000000"
    }
  },
  navigation_img: {
    width: "20px",
    height: "17.5px",
    marginTop: "5px"
    // filter:"invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)"
  }
}))

export default SidebarMobile
