import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { codeToMessages, constCODE } from "utils/CodeToMessages";

import { Button, makeStyles, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";
import { actionResetError } from "redux/actions/errorActions";

const useStyles = makeStyles((theme) => {
  return {
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    formInModal: {
      width: "100%", // Fix IE 11 issue.
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    hidden: {
      display: "none",
    },
  };
});

export default function InputsGroup(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    inputFields,
    inputTypes,
    inputLabels,
    inputRequired,
    object,
    submitTitle,
    ERROR,
    isUsedInModal,
  } = props;
  const { handleOnChange, handleOnSubmit } = props;
  const [INTERACT, setINTERACT] = useState({});
  const isValidForm = validForm(object, inputRequired, ERROR);

  // UI INTERACT:
  const handleOnChangeF = (e) => {
    const target = e.target;
    setINTERACT({
      ...INTERACT,
      [target.name]: true,
    });
    handleOnChange(e);
  };
  const handleOnBlur = (e) => {
    setINTERACT({
      ...INTERACT,
      [e.target.name]: true,
    });
  };

  // Life Cycle Hook:
  useEffect(() => {
    // reset Error when new InputGroup is Loaded! => Change page!
    dispatch(actionResetError());
    return () => {
      setINTERACT({});
    };
  }, []);

  return (
    <form
      className={!isUsedInModal ? classes.form : classes.formInModal}
      onSubmit={(e) => {
        e && e.preventDefault && e.preventDefault();
        handleOnSubmit();
      }}
    >
      {inputFields.map((key) => {
        const value = object[key] || "";
        const isShowRequiredMsg =
          Boolean(!object[key]) &&
          Boolean(INTERACT[key]) &&
          inputRequired.includes(key);
        const isPassword = key.toLowerCase().includes("password");
        const ERR_MSG_CODE = Boolean(INTERACT[key]) && ERROR[key];
        switch (inputTypes[key]) {
          case "input":
            return (
              <React.Fragment key={key}>
                <TextField
                  color="primary"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleOnChangeF}
                  label={inputLabels[key]}
                  required={inputRequired.includes(key)}
                  type={isPassword ? "password" : "text"}
                  onBlur={(e) => handleOnBlur(e)}
                />
                {isShowRequiredMsg && (
                  <Alert severity="error">
                    {codeToMessages(constCODE.NOT_NULL)}
                  </Alert>
                )}
                {Boolean(ERR_MSG_CODE) && (
                  <Alert severity="error">
                    {codeToMessages(ERR_MSG_CODE, "usedForField")}
                  </Alert>
                )}
              </React.Fragment>
            );
          case "dropdown":
            break;
        }
      })}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={`${classes.submit} ${!Boolean(submitTitle) ? classes.hidden : ""
          }`}
        disabled={!isValidForm}
      >
        {submitTitle}
      </Button>
    </form>
  );
}

InputsGroup.propTypes = {
  object: PropTypes.object.isRequired,
  inputFields: PropTypes.array.isRequired,
  inputTypes: PropTypes.object.isRequired,
  inputLabels: PropTypes.object.isRequired,
  inputRequired: PropTypes.array.isRequired,
  submitTitle: PropTypes.string,
  handleOnChange: PropTypes.func.isRequired,
  ERROR: PropTypes.object,
};


export const validForm = (object = {}, inputRequired = [], ERROR = {}) => {
  if (Object.keys(ERROR).length) {
    return false;
  }
  for (const key of inputRequired) {
    if (!Boolean(object[key])) {
      return false;
    }
  }
  return true;
};
