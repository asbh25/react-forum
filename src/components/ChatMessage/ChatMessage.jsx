import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: 'auto',
  },
}));

const getDateFrom = milliseconds => {
  const t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(milliseconds / 1000);
  return t.toDateString();
};

export const ChatMessage = ({ message }) => {
  const { text, photoURL, createdAt } = message;
  const [date] = useState(getDateFrom(createdAt));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Comment from an amazing user"
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}