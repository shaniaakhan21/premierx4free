import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: '4% 1.5%',
    [theme.breakpoints.up('sm')]: {
      width: '45%',
      padding: '2% 1%',
    },
    [theme.breakpoints.up('md')]: {
      width: '20%',
      padding: '2% 1%',
    },
  },
  image: {
    width: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  name: {
    marginTop: theme.spacing(2),
    fontWeight: 800,
    fontSize: '24px',
    textAlign: 'center',
    fontFamily: 'Roboto,"Segoe UI",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    color: '#136DA7',
  },
  text: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
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
  description:string;
  onClick: () => void;
}

const Card: React.FC<Props> = ({ imageSrc, name, description,onClick }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick();
  };

  return (
    <div className={classes.container}>
      <img src={imageSrc} alt={name} className={classes.image} />
      <div className={classes.name}>{name}</div>
      {isOpen && (
        <div className={classes.text}>
          <p style={{ fontSize: '10px', textAlign: 'justify'}}>{description}</p>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick}
      >
        {isOpen ? 'CLOSE PROFILE' : 'READ PROFILE'}
      </Button>
    </div>
  );
};

export default Card;