import { TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import theme from "components/theme";
import ListVocabularies from "components/molecules/list-vocabularies";
import { serviceGetCenterSetVocas } from "service/setVocaService";
import { serviceFetVocaBySetId } from "service/vocaService";
import {
  CREATE_REMEMBER_TYPE,
  ROLE_NAME,
  storageKey,
} from "utils/Constant";
import { localStorageHelper } from "utils/storageHelper";

export default function Step3({ object, actionUpdate }) {
  const { type } = object;
  const isDefaultCenter = type === CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET;
  return (
    <div>
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
  const dispatch = useDispatch();
  const { setVoca } = object;
  const vocas = useSelector((state) => state.vocas).list;
  useEffect(() => {
    if (setVoca.id) dispatch(serviceFetVocaBySetId(setVoca.id));
  }, [setVoca.id]);

  useEffect(() => {
    if (vocas.length) actionUpdate({ ...object, vocas: vocas });
  }, [vocas]);
  return (
    <React.Fragment>
      <Typography
        variant="subtitle2"
        style={{ marginBottom: theme.spacing(1) }}
      >
        Bên dưới là những từ bạn sẽ học
      </Typography>
      <ListVocabularies vocas={vocas} />
    </React.Fragment>
  );
}

function LessonFromYourLevel({ object, actionUpdate }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
  const { level } = object;
  const { list } = useSelector((state) => state.setVocas);

  useEffect(() => {
    actionUpdate({ ...object, isValidStep: false });
    if (user.center) {
      dispatch(
        serviceGetCenterSetVocas(
          user.center && user.center.id,
          ROLE_NAME.ASSISTANT,
          {
            filters: { setName: `like-start<!>${level}--Bai` },
            limit: 100,
            sortBy: "setName",
            order: "ASC",
          }
        )
      );
    }
  }, []);
  return (
    <React.Fragment>
      {/* Title Page */}
      <Typography variant="subtitle2" style={{ marginBottom: theme.spacing(1) }}>
        Hãy chọn bài học mà bạn muốn từ danh sách ứng với trình độ
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
          actionUpdate({
            ...object,
            setVoca: value,
            isValidStep: Boolean(value),
          });
        }}
      ></Autocomplete>
    </React.Fragment>
  );
}
