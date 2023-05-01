import { Route, Routes } from "react-router-dom";
import ContactPage from "../pages/Contact";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import TeamPage from "../pages/Team";
import PartnersPage from "../pages/Partners";
import Planoptions from "../pages/Plans/components/Planoptions";
import FaqPage from "../pages/FAQ";
import AdminDashboard from "../pages/Admin";
function AppRouter(): JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<AboutPage />} />
			<Route path='/team' element={<TeamPage />} />
			<Route path='/partners' element={<PartnersPage />} />
			<Route path='/plans' element={<Planoptions />} />
			<Route path='/contact' element={<ContactPage />} />
			<Route path='/faq' element={<FaqPage />} />
			<Route path='/admin' element={<AdminDashboard />} />
		</Routes>
	)
}
export default AppRouter
