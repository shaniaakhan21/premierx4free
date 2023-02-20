import { Route, Routes } from "react-router-dom";
import ContactPage from "../pages/Contact";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import TeamPage from "../pages/Team";
import PartnersPage from "../pages/Partners";
function AppRouter(): JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<AboutPage />} />
			<Route path='/team' element={<TeamPage />} />
			<Route path='/partners' element={<PartnersPage />} />
			<Route path='/contact' element={<ContactPage />} />
		</Routes>
	)
}
export default AppRouter
