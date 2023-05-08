import { Route, Routes } from "react-router-dom";
import ContactPage from "../pages/Contact";
import AboutPage from "../pages/About";
import TeamPage from "../pages/Team";
import PartnersPage from "../pages/Partners";
import Plan from "../pages/Plans";
import FaqPage from "../pages/FAQ";
import AdminDashboard from "../pages/Admin";
import AgentDashboard from "../Dashboard";

function AppRouter(): JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<AboutPage />} />
			<Route path='/team' element={<TeamPage />} />
			<Route path='/partners' element={<PartnersPage />} />
			<Route path='/plans' element={<Plan />} />
			<Route path='/contact' element={<ContactPage />} />
			<Route path='/faq' element={<FaqPage />} />
			<Route path='/admin' element={<AdminDashboard />} />
			<Route path='/agent-dashboard' element={<AgentDashboard />} />
		</Routes>
	)
}
export default AppRouter
