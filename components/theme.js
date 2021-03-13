import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fafbfc",
    },
    secondary: {
      main: "#3f6ad8",
    },
    text: {
      primary: "#495057",
      secondary: "#757575",
    },
    info: {
      main: "#3c763d",
    },
    error: {
      main: red.A400,
    }
  },
});

export default theme;
