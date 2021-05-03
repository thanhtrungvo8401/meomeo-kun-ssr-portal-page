import { makeStyles } from "@material-ui/core";
import Step2StudyUI from "./Step2StudyUI";
import { bgStepXStudy } from "./StudyModal";

const useStyles = makeStyles((theme) => ({
  step2Study: bgStepXStudy,
}));

export default function Step2Study({ study, hidden, actionUpdateBg }) {
  const classes = useStyles();
  return (
    <div hidden={hidden} className={classes.step2Study}>
      <Step2StudyUI actionUpdateBg={actionUpdateBg} study={study} />
    </div>
  );
}
