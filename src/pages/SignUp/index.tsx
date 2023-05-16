import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import SignUp from './components/SignUp';

function SignUpPage(): JSX.Element {
  return (
    <div>
      <Navbar />
      <SignUp />
      <Footer />
    </div>
  );
}

export default SignUpPage;