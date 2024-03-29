import { Button, ButtonGroup, makeStyles, Typography } from "@material-ui/core";
import ActionsBtnGroup from "components/atoms/action-btns-group";
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import DividerItem from "components/atoms/devider-item";
import TitleBody from "components/atoms/title-body";
import TitleItem from "components/atoms/title-item";
import ListExpandItem from "components/molecules/list-expand-items";
import TestResultCover from "components/molecules/test-result-cover";
import { QA_TYPE, QUESTION_PER_VOCA } from "components/organisms/remember-vocas-[id]/step-6";
import AudioIcon from "components/atoms/audio-icon";
import GetTrueFalseIcon from "components/molecules/get-true-false-icon";
import React from "react";
import { SECONDS_TO_MILISECONDS, TO_PERCENT } from "utils/Constant";
const useStyles = makeStyles(theme => ({
  root: {
    "& .icon-cover": {
      display: "flex",
    }
  },
  summaryEl: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailEl: {
    width: "100%",
    "& .one-line": {
      display: "flex",
      justifyContent: 'space-between',
      width: "100%",
      alignItems: "center"
    },
    "& .left-part": {
      width: "5rem",
      width: '3.5rem',
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.secondary,
      fontSize: '1rem'
    }
  },
}))

const getDisplay = type => {
  switch (type) {
    case QA_TYPE.JP:
      return "VN";
    case QA_TYPE.MEANING:
      return "JP";
    case QA_TYPE.SOUND:
      return <AudioIcon small />;
    default:
      return null;
  }
}

export default function ResultsTesting({ results, time, exactNum, onFinish, onTryAgain }) {
  const classes = useStyles();
  const total = results.length * QUESTION_PER_VOCA;
  const listFields = [QA_TYPE.JP, QA_TYPE.MEANING, QA_TYPE.SOUND];
  const generateItems = results
    .map(oneVoca => {
      // {id, voca, meaning, JP:_, SOUND: _, MEANING: _}
      return {
        summaryEl: <div className={`${classes.summaryEl} ${classes.root}`} >
          <Typography color="textSecondary">{oneVoca.voca}</Typography>
          <div className="icon-cover" >
            {listFields.map((field, i) => {
              // JP, SOUND, MEANING: true | false
              return <GetTrueFalseIcon status={oneVoca[field].isExact} ml key={i} />
            })}
          </div>
        </div>,

        detailEl: <div className={`${classes.detailEl} ${classes.root}`} >
          {listFields.map((field, i) => {
            return <React.Fragment key={i}>
              <div className="one-line">
                <div className="left-part" color="textSecondary">
                  {/* // JP, SOUND, MEANING: display-name */}
                  <GetTrueFalseIcon status={oneVoca[field].isExact} mr />
                  {getDisplay(field)}
                </div>
                <Typography color="textSecondary">{oneVoca[field]['result']}</Typography>
              </div>
              {i !== listFields.length - 1 && <DividerItem isHasLine />}
            </React.Fragment>
          })}
        </div>
      }
    })
  return <section>
    <BodyTop>
      <TitleBody>Kết quả kiểm tra</TitleBody>
      <BodyMaxWidth>
        <TitleItem>Tóm tắt kết quả</TitleItem>
        <TestResultCover number={exactNum / total * TO_PERCENT} />
        <Typography style={{ textAlign: "center" }} variant="h6">
          Thời gian trung bình {(time / total / SECONDS_TO_MILISECONDS).toFixed(1)} (s)
        </Typography>
        <ActionsBtnGroup center={true} >
          <ButtonGroup color="primary" >
            <Button onClick={onTryAgain} >Thử lại</Button>
            <Button onClick={onFinish} >Kết thúc</Button>
          </ButtonGroup>
        </ActionsBtnGroup>
        <DividerItem />

        <TitleItem>Kết quả chi tiết</TitleItem>
        <ListExpandItem items={generateItems} />
      </BodyMaxWidth>
    </BodyTop>
  </section>
}
