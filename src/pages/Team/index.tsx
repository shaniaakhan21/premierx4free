import Footer from '../../components/Footer';
import TeamInfo from './components/TeamInfo';
import Card from './components/Card';
import { makeStyles } from '@material-ui/core/styles';

const people = [
  { name: 'Randy Case - CEO', imageSrc: '/assets/images/Team/Ellipse-1.png', description:'Randy founded Premierx4Free in 2023 to be a disruptor in the prescription drug industry. His background and knowledge in the subject area make him the perfect person to get prescription medications and tele-health programs to the masses. In 2020, Randy co-founded NSUR, Inc. a crypto based company that specializes in the health and wellness sectors and applying the blockchain technology to it. Randy played a major role in energy deregulation in the 2010-2020 time frame forming Strategic Energy Marketing. Previous to that, Randy founded Strategic Realty Group, Inc. and was responsible for the renovation and development of Palm Desert Country Club (PDCC) in Palm Desert, Ca. As a result of that renovation and development, PDCC was awarded the golf course renovation of the year in the US in 2007 by Golf, Inc. magazine. Randy also served as Director of Real Estate for The Metropolitan Water District of Southern California (MWD), the world’s largest water agency. Randy was responsible for all real estate activities related to approximately 10,000 properties owned by MWD throughout Southern California and a $4.1 billion capital expansion program— The largest ever undertaken by the MWD.' },
  { name: 'Mark - COO', imageSrc: '/assets/images/Team/Ellipse2.png', description:'Mark specializes in finance and has an MBA in investment finance from SCU Leavey School of Business. He has spent his career working for insurance and fintech companies. Mark designed and developed NSUR’s Value Protection Program along with NSUR’s insurance and crypto legal advisors. Over the last 15 years, Mark has raised over $250M in debt and equity investments for his companies. Mark has brought his company investors many positive outcomes, including taking Vocera Communications public in 2012, and has over $1.3B in acquisition exits over the last 4 years, yielding an average multiple return of 5x. Mark is also well versed in public company finance and building strategic partnerships.' },
  { name: 'David Whitmarsh Special Advisor', imageSrc: '/assets/images/Team/Ellipse3.png' , description:'David spent 14 years with H David spent 14 years with HR.com serving as the VP of Sales and then the VP of Research & Revenue. HR.com is the largest social network and online community of Human Resource executives trusted by more then 1 million HR professionals worldwide. 6 years of marketing consulting with a variety of HR service providers. R.com serving as the VP of Sales and then the VP of Research & Revenue. HR.com is the largest social network and online community of Human Resource executives trusted by more then 1 million HR professionals worldwide. 6 years of marketing consulting with a variety of HR service providers.'},
  { name: 'Tomás P. Quevedo', imageSrc: '/assets/images/Team/Ellipse4.png' , description:'Sorry, No Text Available'},
];

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    paddingLeft: '2%',
    paddingRight: '2%',
    marginTop: '0%',
    flexWrap: 'wrap',
    ['@media (min-width: 600px)']: {
      gap: 32,
    },
    ['@media (min-width: 960px)']: {
      gap: 64,
    },
  },
}));

function TeamPage(): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <TeamInfo />
      <div className={classes.container}>
        {people.map((person) => (
          <Card
            key={person.name}
            name={person.name}
            imageSrc={person.imageSrc}
            description={person.description}
            onClick={() => console.log(`Clicked on ${person.name}`)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default TeamPage;
