import React, { useState } from 'react';
import { Button } from '@mui/material';
import { makeStyles } from "../../../utils/makeStyles";

const useStyles = makeStyles<{ marginTop: number }>()((theme, { marginTop }) => ({
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
    fontSize: '20px',
    textAlign: 'center',
    fontFamily: 'Nunito Sans',
    color: '#136DA7',
    ['@media screen and (max-width: 768px)']: {
      marginBottom: '2%',
    },
  },
  text: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  button: {
    padding: '4% 17%',
    background: '#64B5F6',
    borderRadius: 0,
    boxShadow: 'none',
    ['@media screen and (max-width: 768px)']: {
      padding: '3% 12%',
    },
  },

  buttonMargin: {
    marginTop: marginTop,
  },
}));

interface Props {
  imageSrc: string;
  name: string;
  description: string;
  onClick: () => void;
  marginTop: number;
}

const Card: React.FC<Props> = ({ imageSrc, name, description, onClick, marginTop }) => {
  const { classes } = useStyles({ marginTop });
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
          <p style={{ fontSize: '10px', textAlign: 'justify' }}>{description}</p>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        className={`${classes.button} ${classes.buttonMargin}`}
        onClick={handleClick}
      >
        {isOpen ? 'CLOSE PROFILE' : 'READ PROFILE'}
      </Button>
    </div>
  );
};

export default Card;
