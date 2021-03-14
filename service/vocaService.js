import { API } from "../api/Api";
import { toast } from "../components/Toast";
import { actionSetError } from "../redux/actions/errorActions";
import {
  actionAddVocabularyToList,
  actionRemoveVocabularyFromList,
  actionResetVocaListEditing,
  actionSetVocabularyList,
  actionSetVocabularyObject,
} from "../redux/actions/vocaActions";
import { enpoint_voca } from "../utils/API_URL";
import { appUrl } from "../utils/APP_URL";
import { codeToMessages, constCODE } from "../utils/CodeToMessages";
import { handleErrorAPI, navigate } from "../utils/Helper";

export const serviceFetVocaBySetId = (setId) => {
  return (dispatch) => {
    API.get(enpoint_voca.fetVocas(setId))
      .then((res) => {
        const listVoca = res.data;
        dispatch(actionSetVocabularyList(listVoca));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        const status = object.status;
        if (status === 400) {
          navigate(appUrl.studyRoom());
        }
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceCreateVoca = (voca) => {
  return (dispatch) => {
    API.post(enpoint_voca.create(), voca)
      .then((res) => {
        const voca = res.data;
        dispatch(actionAddVocabularyToList(voca));
        dispatch(actionResetVocaListEditing());
        dispatch(actionSetVocabularyObject({}));
        toast.success(codeToMessages(constCODE.CREATE_VOCA_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceDeleteVocaById = (id) => {
  return (dispatch) => {
    API.delete(enpoint_voca.delete(id))
      .then((res) => {
        dispatch(actionRemoveVocabularyFromList(id));
        toast.success(codeToMessages(constCODE.DELETE_SET_VOCAS_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
