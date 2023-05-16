import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import SignIn from './components/SignIn';

function SignInPage(): JSX.Element {
  return (
    <div>
      <Navbar />
      <SignIn />
      <Footer />
    </div>
  );
}

export default SignInPage;