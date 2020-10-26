import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import web3 from '../../ethereum/web3';

import auction from '../../assets/images/auction.jpg';
import newDoc from '../../assets/images/newDoc.png';
import newLoan from '../../assets/images/newLoan.png';
import showAllLoans from '../../assets/images/showAllLoans.png';
import verify from '../../assets/images/verify.png';
import profile from '../../assets/images/profile.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const Cardd = ({ img, topic, text, linkTo }) => {
  const classes = useStyles();
  const images = [showAllLoans, auction, profile, newLoan, newDoc, verify];
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
            height="140"
            image={`url(${img})`}
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
