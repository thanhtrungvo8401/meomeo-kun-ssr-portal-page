import { API } from "../api/Api";
import { actionSetError } from "../redux/actions/errorActions";
import {
  actionAddGroupVocasItem,
  actionRemoveGroupVocasItem,
  actionSetGroupVocasList,
} from "../redux/actions/setVocasActions";
import { enpoint_setVoca } from "../utils/API_URL";
import { handleErrorAPI } from "../utils/Helper";

export const serviceCreateSetVoca = (setVoca) => {
  return (dispatch) => {
    API.post(enpoint_setVoca.createSetVocas(), setVoca)
      .then((res) => {
        const newSetVoca = res.data;
        dispatch(actionAddGroupVocasItem(newSetVoca));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceGetSetVocas = (authId) => {
  return (dispatch) => {
    API.get(enpoint_setVoca.getSetVocasByAuthId(authId))
      .then((res) => {
        const listSetVocas = res.data;
        dispatch(actionSetGroupVocasList(listSetVocas));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceGetSetVocaDetail = (id) => {
  return (dispatch) => {
    API.get(enpoint_setVoca.getSetVocaDetailById(id))
      .then((res) => {
        const setVoca = res.data;
        console.log(setVoca);
      })
      .catch((err) => {
        const object = handleErrorAPI(err);
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceDeleteSetVocas = (id) => {
  return (dispatch) => {
    API.delete(enpoint_setVoca.deleteById(id))
      .then((res) => {
        const deletedItem = res.data;
        dispatch(actionRemoveGroupVocasItem(deletedItem));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};
