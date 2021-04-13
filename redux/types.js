// REDUX ACTION TYPES

export const SET_HISTORY = "SET_HISTORY";
export const RESET_HISTORY = "RESET_HISTORY";

export const SET_COMPONENT_LOADING = "SET_COMPONENT_LOADING";
export const CLOSE_COMPONENT_LOADING = "CLOSE_COMPONENT_LOADING";

export const SHOW_LOGIN_FORM = "SHOW_LOGIN_FORM";
export const CLOSE_LOGIN_FORM = "CLOSE_LOGIN_FORM";
export const SET_IS_LOGINED = "SET_IS_LOGINED";
export const SET_USER_LOGIN = "SET_USER_LOGIN";
export const SET_USER_SIGNUP = "SET_USER_SIGNUP";

export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

export const SET_OPEN_TOAST = "SET_OPEN_TOAST";
export const SET_CLOSE_TOAST = "SET_CLOSE_TOAST";

export const SET_ERROR = "SET_ERROR";
export const RESET_ERROR = "RESET_ERROR";

export const SET_VOCA = {
  GET__SET_VOCAS_LIST: "SET_VOCA.GET_SET_VOCAS_LIST",
  SET__SET_VOCAS_OBJECT: "SET_VOCA.SET_VOCA_OBJECT",
  ADD__SET_VOCAS_TO_LIST: "SET_VOCA.ADD_SET_VOCAS_TO_LIST",
  REMOVE__SET_VOCAS_FROM_LIST: "SET_VOCA.REMOVE_SET_VOCAS_FROM_LIST",
  RESET__SET_VOCAS_LIST: "SET_VOCA.RESET_SET_VOCAS_LIST",
  SET__SET_VOCAS_EDITING: "SET_VOCA.SET__SET_VOCAS_EDITING",
  SET__SET_VOCAS_EDITING_FOR_LIST: "SET_VOCA.SET__SET_VOCAS_EDITING_FOR_LIST",
  RESET__SET_VOCAS_LIST_EDITING: "SET_VOCA.RESET__SET_VOCAS_LIST_EDITING",
  UPDATE_VALUE_SETVOCAS_AFTER_UPDATE:
    "SET_VOCA.UPDATE_VALUE_SETVOCAS_AFTER_UPDATE",
};

export const VOCABULARY = {
  SET_LIST: "VOCABULARY.SET_LIST",
  ADD_VOCA_TO_LIST: "VOCABULARY.ADD_VOCA_TO_LIST",
  UPDATE_VOCA_IN_LIST: "VOCABULARY.UPDATE_VOCA_IN_LIST",
  REMOVE_VOCA_FROM_LIST: "VOCABULARY.REMOVE_VOCA_FROM_LIST",
  SET_VOCA_OBJECT: "VOCABULARY.SET_VOCA_OBJECT",
  SET_IS_SHOW_VOCA_MODAL: "VOCABULARY.SET_IS_SHOW_VOCA_MODAL",
};

export const REMEMBER_GROUP = {
  SET_LIST: "REMEMBER_GROUP.SET_LIST",
  ADD_REMEMBER_INTO_LIST: "REMEMBER_GROUP.ADD_REMEMBER_INTO_LIST",
  UPDATE_REMEMBER_IN_LIST: "REMEMBER_GROUP.UPDATE_REMEMBER_IN_LIST",
  REMOVE_REMEMBER_FROM_LIST: "REMEMBER_GROUP.REMOVE_REMEMBER_FROM_LIST",
  SET_REMEMBER_GROUP: "REMEMBER_GROUP.SET_REMEMBER_GROUP_OBJECT_VALUE",
  SET_CREATE_REMEMBER_OBJECT: "REMEMBER_GROUP.SET_CREATE_REMEMBER_OBJECT",
  SET_IS_CREATING: "REMEMBER_GROUP.SET_IS_CREATING",
};
