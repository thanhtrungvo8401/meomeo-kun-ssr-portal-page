import { makeStyles } from "@material-ui/core"

const useStyles = (center) => makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: center ? "center" : "flex-end"
  }
}))

export default function ActionsBtnGroup({ children, center, hidden }) {
  const classes = useStyles(center)();
  return <div className={`${classes.root} ${hidden ? 'hide' : ''}`} >
    {children}
  </div>
}