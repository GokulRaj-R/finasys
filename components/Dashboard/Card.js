import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import web3 from '../../ethereum/web3';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    '& .MuiCardMedia-root': {
      height: '100',
    },
  },
});

// MuiCardMedia-root makeStyles-media-16 MuiCardMedia-media MuiCardMedia-img
const Cardd = ({ img, topic, text, linkTo }) => {
  const styles = useStyles();
  const classes = useStyles();
  let accounts = [];

  const getAccounts = async () => {
    accounts = await web3.eth.getAccounts();
  };

  if (linkTo === 'userProfile') {
    getAccounts();
    linkTo = `/user/${accounts[0]}`;
  }

  return (
    <Link href={linkTo}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={img}
            className={styles.media}

            // src={require(`../../assets/images/${img}`)}
            // image={require(`../../assets/images/showAllLoans.png`)}
            // title=""
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {topic}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Cardd;
