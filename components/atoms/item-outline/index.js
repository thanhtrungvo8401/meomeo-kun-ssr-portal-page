import { makeStyles } from "@material-ui/core"
import { constantApp } from "utils/Constant";
const useStyles = (center) => makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: center ? "center" : "flex-start",
    boxSizing: "border-box",
    transition: `all ${constantApp.animationDuration}ms ease-in`,
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.light}`,
    overflow: "hidden",
    width: "100%",
    "&:hover": {
      boxShadow: constantApp.BOXSHADOW,
      border: `1px solid ${theme.palette.primary.main}`,
    },
    "&.active-item": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      transition: `all ${constantApp.animationDuration}ms ease-in`,
    }
  }
}))

export default function ItemOutline({ center, children, onClick, styles, isActive }) {
  return <div
    style={styles}
    className={`${useStyles(center)().root} ${isActive ? 'active-item' : null}`}
    onClick={() => onClick && onClick()}
  >
    {children}
  </div>
}