export const enpoint_auth = {
  sign_up: () => "/students",
  login: () => "/authenticate/login",
  logout: () => "/authenticate/logout",
};

export const enpoint_setVoca = {
  createSetVocas: () => "/set-vocas",
  updateSetVocas: (id) => `/set-vocas/${id}`,
  getSetVocasByAuthId: (authId) => `/users/${authId}/set-vocas`,
  getSetVocaDetailById: (id) => `/set-vocas/${id}`,
  deleteById: (id) => `/set-vocas/${id}`,
};

export const enpoint_voca = {
  fetVocas: (setId) => `/set-vocas/${setId}/vocas`,
  create: () => `/vocas`,
  update: (id) => `/vocas/${id}`,
  delete: (id) => `/vocas/${id}`,
};

export const enpoint_user = {
  getProfile: () => "/my-profile",
};
