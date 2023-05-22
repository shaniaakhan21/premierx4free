import { Route, Routes } from "react-router-dom";
import ContactPage from "../pages/Contact";
import AboutPage from "../pages/About";
import TeamPage from "../pages/Team";
import PartnersPage from "../pages/Partners";
import Plan from "../pages/Plans";
import FaqPage from "../pages/FAQ";
import AdminDashboard from "../admin-dashboard/Admin";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import AgentDashboard from "../Dashboard";
import { ProtectedAgentDashboard } from "./ProtectedRoutes";

function AppRouter(): JSX.Element {
	const userAgent = localStorage.getItem('data')
	return (
		<Routes>
			<Route path='/' element={<AboutPage />} />
			<Route path='/team' element={<TeamPage />} />
			<Route path='/partners' element={<PartnersPage />} />
			<Route path='/plans' element={<Plan />} />
			<Route path='/contact' element={<ContactPage />} />
			<Route path='/faq' element={<FaqPage />} />
			<Route path='/admin' element={<AdminDashboard />} />
			<Route path='/signup' element={<SignUpPage />} />
			<Route path='/signin' element={<SignInPage />} />
			<Route path='/resetpassword' element={<ForgotPassword />} />
			<Route path='/agent-dashboard' element={
			<ProtectedAgentDashboard>
				<AgentDashboard />
			</ProtectedAgentDashboard>
			} />


		</Routes>
	)
}
export default AppRouter
