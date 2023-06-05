import Footer from '../../components/Footer';
import TeamInfo from './components/TeamInfo';
import Card from './components/Card';
import Navbar from '../../components/Navbar';
import { makeStyles } from '../../utils/makeStyles';
import { useTranslation } from "react-i18next";

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
  const [tr] = useTranslation();

  const t = (key: string) => tr(`team.${key}`);

  const people = [
    {
      name: 'Randy Case - CEO',
      marginTop: 47,
      imageSrc: '/assets/svg/Team/randy.svg',
      description: t('randy-description')
    },
    {
      name: 'Marks Peters - COO',
      marginTop: 47,
      imageSrc: '/assets/svg/Team/mark.svg',
      description: t('mark-description')
    },
    {
      name: 'David Whitmarsh - Special Advisor',
      marginTop: 17,
      imageSrc: '/assets/svg/Team/david.svg',
      description: t('david-description')
    },
    {
      name: 'Tomás P. Quevedo - CTO',
      marginTop: 47,
      imageSrc: '/assets/svg/Team/tomas2.png',
      description: t('tomas-description')
    },
    {
      name: 'Heather Stephens - Director of Financial Services',
      marginTop: 8,
      imageSrc: '/assets/svg/Team/heather.png',
      description: t('heather-description')
    },
  ];

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
