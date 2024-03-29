import { actionSetHistory } from "redux/actions/historyActions";
import { actionCloseLogin, actionShowLogin } from "redux/actions/loginActions";
import { toast } from "components/atoms/toast-component";
import { storeClient } from "redux/store";
import { codeToMessages } from "utils/CodeToMessages";
import { constAuth } from "utils/Constant";
import { getCookie } from "utils/Cookies";

export const navigate = (url) => {
  if (!isServer) {
    storeClient.dispatch(actionSetHistory(url));
  }
};

export const showLoginForm = () => {
  if (!isServer) {
    storeClient.dispatch(actionShowLogin());
  }
};

export const closeLoginForm = () => {
  if (!isServer) {
    storeClient.dispatch(actionCloseLogin());
  }
};

export const handleErrorAPI = (err, isToast = false) => {
  const object = err.response || {};
  const errorCodes = object.data ? object.data.errorCodes || [] : [];
  if (isToast) {
    let toastError = "";
    errorCodes.forEach((ob) => {
      if (ob.field === "announceField") {
        toastError = codeToMessages(ob.code);
      }
    });
    if (toastError) toast.error(toastError);
  }
  const errorCodesObject = {};
  errorCodes.forEach((ob) => {
    errorCodesObject[ob.field] = ob.code;
  });
  if (!isPro) {
    console.log(err);
  }
  return {
    status: object.status,
    message: object.data ? object.data.message || "" : "",
    errorCodesObject: errorCodesObject,
    details: object.data ? object.data.details || "" : "",
  };
};

export const isLogined = () => {
  const jwt = !isServer && getCookie(constAuth.JWT);
  return Boolean(jwt);
};

export const removeGmailTag = (email = "") => {
  if (!email) return "NULL";
  const index = email.indexOf("@");
  return email.slice(0, index);
};

export const randomList = (list = []) => {
  const copList = [...list];
  const randList = [];
  while (copList.length > 0) {
    const rand = getRandom(0, copList.length - 1);
    randList.push(copList[rand]);
    copList.splice(rand, 1);
  }
  return randList;
}

export const isServer = typeof window === "undefined";

export const isPro = process.env.NEXT_PUBLIC_ENV === "PRODUCTION";

export const getRandom = (min, max) => Math.round(Math.random() * (max - min));

export const isEmptyArr = array => array.length === 0;

export const getWidth = (!isServer && window.innerWidth) || 0;

export const isMobile = !isServer && window.innerWidth < 960;

export const sortAscBaseOnId = (a, b) => a.id > b.id ? 1 : -1;
