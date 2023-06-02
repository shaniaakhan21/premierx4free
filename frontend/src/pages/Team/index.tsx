import Footer from '../../components/Footer';
import TeamInfo from './components/TeamInfo';
import Card from './components/Card';
import Navbar from '../../components/Navbar';
import { makeStyles } from '../../utils/makeStyles';

const people = [
  {
    name: 'Randy Case - CEO',
    marginTop: 47,
    imageSrc: '/assets/svg/Team/randy.svg',
    description: 'Randy founded PremieRx4Free in 2023 to be a disruptor in the prescription drug industry. His background and knowledge in the subject area make him the perfect person to get prescription medications and tele-health programs to the masses. In 2020, Randy co-founded NSUR, Inc. a crypto based company that specializes in the health and wellness sectors and applying the blockchain technology to it. Randy played a major role in energy deregulation in the 2010-2020 time frame forming Strategic Energy Marketing. Previous to that, Randy founded Strategic Realty Group, Inc. and was responsible for the renovation and development of Palm Desert Country Club (PDCC) in Palm Desert, Ca. As a result of that renovation and development, PDCC was awarded the golf course renovation of the year in the US in 2007 by Golf, Inc. magazine. Randy also served as Director of Real Estate for The Metropolitan Water District of Southern California (MWD), the world’s largest water agency. Randy was responsible for all real estate activities related to approximately 10,000 properties owned by MWD throughout Southern California and a $4.1 billion capital expansion program— The largest ever undertaken by the MWD.'
  },
  {
    name: 'Marks Peters - COO',
    marginTop: 47,
    imageSrc: '/assets/svg/Team/mark.svg',
    description: 'Mark specializes in finance and has an MBA in investment finance from SCU Leavey School of Business. He has spent his career working for insurance and fintech companies. Mark designed and developed NSUR’s Value Protection Program along with NSUR’s insurance and crypto legal advisors. Over the last 15 years, Mark has raised over $250M in debt and equity investments for his companies. Mark has brought his company investors many positive outcomes, including taking Vocera Communications public in 2012, and has over $1.3B in acquisition exits over the last 4 years, yielding an average multiple return of 5x. Mark is also well versed in public company finance and building strategic partnerships.'
  },
  {
    name: 'David Whitmarsh - Special Advisor',
    marginTop: 17,
    imageSrc: '/assets/svg/Team/david.svg',
    description: 'David spent 14 years with H David spent 14 years with HR.com serving as the VP of Sales and then the VP of Research & Revenue. HR.com is the largest social network and online community of Human Resource executives trusted by more than 1 million HR professionals worldwide. 6 years of marketing consulting with a variety of HR service providers.'
  },
  {
    name: 'Tomás P. Quevedo - CTO',
    marginTop: 47,
    imageSrc: '/assets/svg/Team/tomas2.png',
    description: 'Tomas Perez-Quevedo is a Peruvian-born innovator and a performance-driven Entrepreneur in the technology sector. Tomas is a very successful Investor with a global company that has been expanding and working within the industry for the past 15 years. As a founder and managing president of TPQ Global Business, he has partnered with many companies in the areas of technology and software development. Additionally he has vast knowledge and extensive experience in agriculture and health driven products. His investing style of discipline, patience and value has consistently outperformed the market for decades.'
  },
  {
    name: 'Heather Stephens - Director of Financial Services',
    marginTop: 8,
    imageSrc: '/assets/svg/Team/heather.png',
    description: 'Heather specializes in corporate finance and business structure. She spent 15 years in human resources and that grew into her passion for entrepreneurship and business operations. Heather earned her education at San Diego State University, where she honed her financial acumen and built a strong foundation for her professional career. Her expertise in corporate finance and business structure has helped numerous clients navigate complex financial challenges and achieve long-term success. Heather is a trusted partner to her clients, providing personalized financial guidance and support throughout their business ventures. Her passion for entrepreneurship and business operations makes her a valuable asset to any organization seeking to achieve financial success.'
  },
];

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    paddingLeft: '2%',
    paddingRight: '2%',
    marginTop: '0%',
    flexWrap: 'wrap',
    ['@media (min-width: 768px)']: {
      gap: 2,
    },
    ['@media (min-width: 960px)']: {
      gap: 0,
    },
  },
}));

function TeamPage(): JSX.Element {
  const { classes } = useStyles();
  return (
    <div>
      <Navbar />
      <TeamInfo />
      <div className={classes.container}>
        {people.map((person) => (
          <Card
            key={person.name}
            name={person.name}
            imageSrc={person.imageSrc}
            description={person.description}
            onClick={() => console.log(`Clicked on ${person.name}`)}
            marginTop={person.marginTop} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default TeamPage;
