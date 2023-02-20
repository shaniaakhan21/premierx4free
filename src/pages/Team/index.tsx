import Footer from '../../components/Footer';
import TeamInfo from './components/TeamInfo';
import Card from './components/Card';
import { makeStyles } from '@material-ui/core/styles';

const people = [
	{ name: 'Randy Case - CEO', imageSrc: '/assets/images/Team/Ellipse-1.png' },
	{ name: 'Mark - COO', imageSrc: '/assets/images/Team/Ellipse2.png' },
	{ name: 'David Whitmarsh Special Advisor', imageSrc: '/assets/images/Team/Ellipse3.png' },
	{ name: 'Tomás P. Quevedo', imageSrc: '/assets/images/Team/Ellipse4.png' },
  ];

const useStyles = makeStyles(() => ({
	container: {
	  display: 'flex',
	  flexDirection: 'row',
	  justifyContent: 'center',
	  alignItems: 'center',
	  gap: 16,
	  paddingLeft:'2%',
	  paddingRight:'2%',
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
						onClick={() => console.log(`Clicked on ${person.name}`)}
				/>
				))}

			</div>

			<Footer />
		</div>
	)
}

export default TeamPage