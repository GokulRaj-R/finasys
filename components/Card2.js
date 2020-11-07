import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  head: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 10,
  },
  subtitleLeft: {
    fontSize: 13,
    fontWeight: 500,
  },
  subtitleRight: {
    fontSize: 10,
  },
  body: {},
  type: {
    color: 'red',
    fontSize: 13,
  },
});

export default function ImgMediaCard({ card }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Details"
          height="140"
          image={`https://picsum.photos/500/600?random=${card.description}`}
          title="Document Description"
        />
        <CardContent>
          <Typography
            className={classes.subtitleLeft}
            variant="h4"
            component="p"
            display="inline"
          >
            Address:&nbsp;
          </Typography>
          <Typography
            className={classes.subtitleRight}
            variant="body1"
            component="p"
            display="inline"
          >
            {card.address}
          </Typography>
          <Typography
            style={{ paddingTop: '10px', textAlign: 'left' }}
            className={classes.body}
            variant="body2"
            component="p"
          >
            {card.description}
          </Typography>
          <Typography
            style={{ paddingTop: '10px', textAlign: 'left' }}
            className={classes.body}
            variant="body2"
            component="p"
          >
            Valuation: {card.valuation}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            Toast.fire({
              icon: 'success',
              title: 'Copied to clipboard',
            });
            navigator.clipboard.writeText(card.address);
          }}
        >
          copy address
        </Button>
      </CardActions>
    </Card>
  );
}
