import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../components/theme";
import { serviceFetVocaBySetId } from "../../service/vocaService";
import { CREATE_REMEMBER_TYPE, storageKey } from "../../utils/Constant";
import { localStorageHelper } from "../../utils/storageHelper";

const step2Styles = makeStyles((theme) => ({
  root: {},
  vocasCover: {
    maxHeight: "18rem",
    overflowY: "scroll",
  },
}));

export default function Step3({ object, actionUpdate }) {
  const { type, level } = object;
  const isDefaultCenter = type === CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET;
  const classes = step2Styles();
  return (
    <div className={classes.root}>
      {!isDefaultCenter && (
        <VocasFromYourOwnSet object={object} actionUpdate={actionUpdate} />
      )}
      {isDefaultCenter && (
        <LessonFromYourLevel object={object} actionUpdate={actionUpdate} />
      )}
    </div>
  );
}

function VocasFromYourOwnSet({ object, actionUpdate }) {
  const classes = step2Styles();
  const dispatch = useDispatch();
  const { setVoca } = object;
  const vocas = useSelector((state) => state.vocas).list;
  useEffect(() => {
    if (setVoca.id) {
      dispatch(serviceFetVocaBySetId(setVoca.id));
    }
  }, [setVoca.id]);

  useEffect(() => {
    if (vocas.length) {
      actionUpdate({ ...object, vocas: vocas });
    }
  }, [vocas]);
  return (
    <React.Fragment>
      <Typography
        variant="subtitle2"
        style={{ marginBottom: theme.spacing(1) }}
      >
        These vocabularies will be added into your remember group
      </Typography>
      <div className={classes.vocasCover}>
        <List>
          {vocas.map((el, index) => (
            <ListItem
              key={el.id}
              button
              divider={index !== vocas.length - 1}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText
                secondary={el.voca}
                style={{ width: "calc(50% - 0.5rem)", marginRight: "1rem" }}
              />
              <ListItemText
                secondary={el.meaning}
                style={{ width: "calc(50% - 0.5rem)" }}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </React.Fragment>
  );
}

function LessonFromYourLevel({ object, actionUpdate }) {
  const { level } = object;
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
  const { list } = useSelector((state) => state.setVocas);
  useEffect(() => {
    actionUpdate({ ...object, isValidStep: false });
    if (user.id) {
      // dispatch(); fetSetVoca with Level in name
    }
  }, []);
  return (
    <React.Fragment>
      {/* Title Page */}
      <Typography
        variant="subtitle2"
        style={{ marginBottom: theme.spacing(1) }}
      >
        Please select the lesson that you want to learn from the following list
        ({level})
      </Typography>
      {/* Select Option */}
      <Autocomplete
        id="set-voca-from-default-select"
        getOptionLabel={(option) => option.setName}
        options={list}
        style={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label="Enter the lesson" variant="outlined" />
        )}
        onChange={(event, value, reason) => {
          const updateObject = Boolean(value)
            ? { ...object, setVoca: value, isValidStep: true }
            : { ...object, setVoca: value, isValidStep: false };
          actionUpdate(updateObject);
        }}
      ></Autocomplete>
    </React.Fragment>
  );
}