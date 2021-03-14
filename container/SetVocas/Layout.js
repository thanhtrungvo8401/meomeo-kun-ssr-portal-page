import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionGroup from "../../components/ActionGroup";
import ParagraphTitle from "../../components/ParagraphTitle";
import ParagraphBody from "../../components/ParagraphBody";
import Voca from "../../components/Voca";
import {
  actionResetVocaListEditing,
  actionSetShowCreateVocaForm,
} from "../../redux/actions/vocaActions";

const useStyles = makeStyles((theme) => {
  return {
    setVocas: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      alignItems: "flex-start",
      [theme.breakpoints.up("md")]: {
        justifyContent: "space-between",
      },
    },
  };
});

function Layout(props) {
  const classes = useStyles();
  const { listVocas, voca, ERROR } = props;
  const isShowCreateForm = useSelector((state) => state.vocas).listEditing[
    listVocas.length
  ];
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleOnShowCreateForm = () => {
    dispatch(actionSetShowCreateVocaForm());
  };
  const handleOnCloseShowCreateForm = () => {
    dispatch(actionResetVocaListEditing());
  };
  return (
    <React.Fragment>
      <ParagraphTitle>A vocabulary example</ParagraphTitle>
      <ParagraphBody>
        <Voca isExample={true} voca={{}} />
      </ParagraphBody>
      <ParagraphTitle>Your vocabularies</ParagraphTitle>
      {Boolean(listVocas.length || isShowCreateForm) && (
        <ParagraphBody>
          <div className={classes.setVocas}>
            {listVocas.map((voca, index) => {
              return (
                <Voca
                  key={index}
                  voca={voca}
                  ERROR={ERROR}
                  handleOnRemoveVocaById={props.handleOnRemoveVocaById}
                  // handleOnChange={props.handleOnChangeUpdate}
                  // handleOnSubmit={props.handleOnSubmitUpdate}
                />
              );
            })}
            {isShowCreateForm && (
              <Voca
                handleOnChange={props.handleOnChangeCreate}
                handleOnSubmit={props.handleOnSubmitCreate}
                closeCreateForm={handleOnCloseShowCreateForm}
                voca={voca}
                ERROR={ERROR}
                isCreate={true}
              />
            )}
          </div>
        </ParagraphBody>
      )}
      <ActionGroup>
        {!isShowCreateForm && (
          <Button
            color="primary"
            variant="contained"
            onClick={handleOnShowCreateForm}
          >
            Create (+)
          </Button>
        )}
      </ActionGroup>
    </React.Fragment>
  );
}

export default Layout;
