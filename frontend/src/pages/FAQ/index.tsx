import Accordion from 'react-bootstrap/Accordion';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import '../FAQ/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { useTranslation } from "react-i18next";

function FaqPage(): JSX.Element {
  const [t] = useTranslation()

  return (
    <>
      <Navbar />
      <h1 className='heading'>Please see below for Frequently Asked Questions</h1>
      <Accordion defaultActiveKey="0" className='accordionContainer'>
        {[...Array(17)].map((_, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{t(`faq.items[${index}].question`)}</Accordion.Header>
            <Accordion.Body>{t(`faq.items[${index}].answer`)}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <Footer />
    </>
  );
}

export default FaqPage;
