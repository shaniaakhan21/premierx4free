import { Route, Routes } from "react-router-dom";
import ContactPage from "../pages/Contact";
import AboutPage from "../pages/About";
import TeamPage from "../pages/Team";
import PartnersPage from "../pages/Partners";
import Planoptions from "../pages/Plans/components/Planoptions";
import FaqPage from "../pages/FAQ";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";
function AppRouter(): JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<AboutPage />} />
			<Route path='/team' element={<TeamPage />} />
			<Route path='/partners' element={<PartnersPage />} />
			<Route path='/plans' element={<Planoptions />} />
			<Route path='/contact' element={<ContactPage />} />
			<Route path='/faq' element={<FaqPage />} />
			<Route path='/signup' element={<SignUpPage />} />
			<Route path='/signin' element={<SignInPage />} />
		</Routes>
	)
}
export default AppRouter
