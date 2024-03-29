import { Avatar, Container, makeStyles, Typography } from "@material-ui/core";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import InputsGroup from "components/molecules/inputs-group";
import theme from "components/theme";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.main,
  },
}));

const inputFields = ["email", "password", "confirmPassword"];
const inputTypes = {
  email: "input",
  password: "input",
  confirmPassword: "input",
};
const inputLabels = {
  email: "Email Address",
  password: "Password",
  confirmPassword: "Confirm Password",
};
const inputRequired = ["email", "password", "confirmPassword"];
const submitTitle = "Sign Up";

export default function SignUpUI(props) {
  const classes = useStyles();
  const { user, ERROR } = props;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GroupAddOutlinedIcon style={{ color: theme.palette.white.main }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <InputsGroup
          ERROR={ERROR}
          inputFields={inputFields}
          inputTypes={inputTypes}
          inputLabels={inputLabels}
          inputRequired={inputRequired}
          submitTitle={submitTitle}
          object={user}
          handleOnChange={props.handleOnChange}
          handleOnSubmit={props.handleOnSubmit}
        />
      </div>
    </Container>
  );
}