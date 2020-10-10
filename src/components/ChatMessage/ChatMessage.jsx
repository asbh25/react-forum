import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';

import "./ChatMessage.css";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
  },
}));

const getDateFrom = (milliseconds) => {
  const t = new Date(1970, 0, 1);
  t.setSeconds(milliseconds / 1000);
  return t.toDateString();
};

export const ChatMessage = ({ message, userId, removeComment }) => {
  const { text, photoURL, createdAt, uid } = message;
  const [date] = useState(getDateFrom(createdAt));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
          />
        }
        action={uid === userId && (
            <IconButton aria-label="delete" onClick={() => {removeComment(createdAt)}}>
              <DeleteIcon />
            </IconButton>
        )}
        title="Comment from an AMAZING USER"
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};
