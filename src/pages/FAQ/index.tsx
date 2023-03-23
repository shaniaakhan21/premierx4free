import Accordion from 'react-bootstrap/Accordion';
import '../FAQ/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';

const faqData = [
  {
    question: 'Is this program designed to completely replace the PBM?',
    answer: 'Our core program is 1088 Free generic drugs, with membership, and we have packaged additional generics (Tier2) for a small copay and branded drugs (Tier3) higher copay to offer an alternative to PBM services, yes.'
  },
  {
    question: 'Can it be layered on top of a PBM?',
    answer: 'Yes elements of our program could be customized to fit with other benefits.  We have the flexibility to work with payers/employers/unions to create the custom prescription solution that fits with their needs and maximizes their savings.'
  },
  {
    question: 'If replacement, do you do an analysis that would show disruption to the members? Savings to the employer?',
    answer: 'Yes, we will take the prior year prescription history and create the analysis that demonstrates the reductions and savings for the employer or other payer.'
  },
  {
    question: 'What is the process and what data do you need to get a proposal?',
    answer: 'We usually get excel spreadsheets with prescription history to analyze, it can/should be cleaned of patient/member data since we have no use for it.  Once we receive the data we will show what our price would have been for the same prescriptions and offer custom choices for the employer/payer/union to reduce their cost and/or their employee cost.'
  },
  {
    question: 'How is high cost specialty drugs handled. Is there help with getting the employees on a member or patient assistance programs?',
    answer: 'Most specialty drugs are available to all retail pharmacies, restrictions generally exist within PBM models where the PBM’s restrict employee access.  Discounts on specialty drugs, rebates on specialty drugs are all available with our program based on what the plan earns/utilizes over all with the manufacturer.  If Utilization services are needed they are available for a nominal fee.  We will assist with patients seeking manufacturer discounts.'
  },
  {
    question: 'Do you have some current client case studies?',
    answer: 'We have members on our program today and will start to develop case studies as we launch with employers/payers/unions.  The SwiftMD program cost savings and ER cost reduction program is well documented.'
  },
  {
    question: 'How often is your plan renewed by clients that have used it?',
    answer: '1 year, 2 year or 3 year is the typical term for the pharmacy program.  SwiftMD does an annual review of cost versus savings every year.'
  },
  {
    question: 'How long have you been in business?',
    answer: '365Script is a startup launching our extended prescription package, our core program of free drugs has been around a few years.'
  },
  {
    question: 'Program looks like it is focused on generics and brand name drugs only.',
    answer: 'Our program starts with a core FREE formulary of 1,088 drugs.  The presentation you are seen for Premierx has evolved to include a Tier 2 of other generics with a discounted price/copay and a Tier 3 of Branded drugs at a discounted price/copay.'
  },
  {
    question: 'There is no mention of specialty products – you will want to confirm if they fall underneath this program or how they are handled as the $150 per month average cost for drugs includes that?',
    answer: 'Specialty Drugs are generally available at most pharmacies with a few exceptions, PBMs are using Specialty Drugs in new ways to lock in employers and lock out pharmacies by limiting who they will pay for them.  Utilization management and other services are usually associated with Specialty Drugs to control access within the PBM model.  Specifically drugs available at our pharmacy partners are offered at our best price with Specialty or otherwise (at no additional cost) if utilization or other services are required we can provide those (for nominal additional cost).'
  },
  {
    question: 'They list out the $59.95 per month but it also states that brand name drugs are discounted but not included @ 100% in the “rate” as generics are.',
    answer: 'Our program has a monthly fee, Tier 1 drugs (1088) are free, Tier 2 drugs (other generics) have low copays, Tier 3 (branded drugs) have higher copays once the monthly fee is paid.'
  },
  {
    question: 'The cost of the brand name drugs would be determined by the employee/employer – so in other words the savings example would only hold true if there were no brand utilization.',
    answer: 'We offer flexibility to the employer to maintain an “apples” to “apples” benefit maintaining the current copay employees have today on their plan going forward on our program if the employer prefers.  We also offer the ability to change the payment structure should the employer want to adjust based on the lower prices we offer.'
  },
  {
    question: '90% of the scripts are generic but the cost of generics is usually less then 10-15% of the cost.',
    answer: 'Big savings on generic less savings on Branded you are correct!'
  },
  {
    question: 'Clearly seems to be some gaps in the coverage.',
    answer: 'Maybe my answers have filled in the gaps in your understanding, if you have more questions let us know.'
  }
];

function FaqPage(): JSX.Element {
  return (
    <>
      <h1 className='heading'>How can we help you?</h1>
      <Accordion defaultActiveKey="0" className='accordionContainer'>
        {faqData.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{item.question}</Accordion.Header>
            <Accordion.Body>{item.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}

export default FaqPage;
