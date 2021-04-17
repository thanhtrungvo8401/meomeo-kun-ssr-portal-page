import { makeStyles, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../components/theme";
import { serviceGetSetVocas } from "../../service/setVocaService";
import { CREATE_REMEMBER_TYPE, storageKey } from "../../utils/Constant";
import { localStorageHelper } from "../../utils/storageHelper";

const step2Styles = makeStyles((theme) => ({
  root: {},
}));

export default function Step2({ object, actionUpdate }) {
  const isDefaultCenter =
    object.type === CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET;
  const classes = step2Styles();
  return (
    <div className={classes.root}>
      {!isDefaultCenter && (
        <FromYourOwnVocas object={object} actionUpdate={actionUpdate} />
      )}
      {isDefaultCenter && <Typography>From default center </Typography>}
    </div>
  );
}

function FromYourOwnVocas({ object, actionUpdate }) {
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
  const { list } = useSelector((state) => state.setVocas);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.id) {
      dispatch(serviceGetSetVocas(user.id));
    }
  }, [user.id]);
  useEffect(() => {
    actionUpdate({ ...object, isValidStep: false });
  }, []);
  return (
    <React.Fragment>
      <Typography variant="subtitle2">
        Select one set that you want to learn
      </Typography>
      <Autocomplete
        id="set-voca-select"
        getOptionLabel={(option) => option.setName}
        options={list}
        style={{ width: "100%", marginTop: theme.spacing(1) }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter the group's name"
            variant="outlined"
          />
        )}
        onChange={(event, value, reason) => {
          const updateObject = Boolean(value)
            ? { ...object, setVoca: value, isValidStep: true }
            : { ...object, setVoca: value, isValidStep: false };
          actionUpdate(updateObject);
        }}
      />
    </React.Fragment>
  );
}