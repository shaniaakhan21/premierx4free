import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width:'20%',
    padding:'4% 1.5%',
  },
  image: {
    width:'100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  name: {
    marginTop: theme.spacing(2),
    fontWeight: 800,
    fontSize: '27px',
    textAlign: 'center',
    fontFamily: 'Roboto,"Segoe UI",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    color: '#136DA7',
  },
  button: {
    marginTop: theme.spacing(2),
    padding: '4% 17%',
    background: '#00B0F0',
  },
}));

interface Props {
  imageSrc: string;
  name: string;
  onClick: () => void;
}

const Card: React.FC<Props> = ({ imageSrc, name, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img src={imageSrc} alt={name} className={classes.image} />
      <div className={classes.name}>{name}</div>
      <Button variant="contained" color="primary" className={classes.button} onClick={onClick}>
        READ PROFILE
      </Button>
    </div>
  );
};

export default Card;
