import {
  ADD_VOCABULARY_INTO_LIST,
  REMOVE_VOCABULARY_FROM_LIST,
  SET_SHOW_CREATE_VOCABULARY_FORM,
  SET_VOCABULARY_EDITING,
  SET_VOCABULARY_LIST,
  SET_VOCABULARY_LIST_EDITING_ITEM,
  RESET_VOCABULARY_LIST_EDITING,
  SET_VOCABULARY_OBJECT,
} from "../types";

export const actionSetVocabularyList = (vocaList) => {
  return {
    type: SET_VOCABULARY_LIST,
    payload: vocaList,
  };
};

export const actionSetVocabularyObject = (voca) => {
  return {
    type: SET_VOCABULARY_OBJECT,
    payload: voca,
  };
};

export const actionSetVocabularyEditing = (voca) => {
  return {
    type: SET_VOCABULARY_EDITING,
    payload: voca,
  };
};

export const actionAddVocabularyToList = (voca) => {
  return {
    type: ADD_VOCABULARY_INTO_LIST,
    payload: voca,
  };
};

export const actionRemoveVocabularyFromList = (vocaId) => {
  return {
    type: REMOVE_VOCABULARY_FROM_LIST,
    payload: vocaId,
  };
};

export const actionSetShowCreateVocaForm = () => {
  return {
    type: SET_SHOW_CREATE_VOCABULARY_FORM,
  };
};

export const actionSetVocaListEditingItem = (vocaId) => {
  return {
    type: SET_VOCABULARY_LIST_EDITING_ITEM,
    payload: vocaId,
  };
};

export const actionResetVocaListEditing = () => {
  return {
    type: RESET_VOCABULARY_LIST_EDITING,
  };
};
