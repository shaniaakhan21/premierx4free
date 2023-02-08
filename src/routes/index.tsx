import { Route, Routes } from "react-router-dom";
import ContactPage from "../pages/Contact";
import HomePage from "../pages/Home";

function AppRouter(): JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/contact' element={<ContactPage />} />
		</Routes>
	)
}
export default AppRouter
