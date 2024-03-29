export const appUrl = {
  donate: () => ({ url: "/donate", title: "Donate" }),
  rememberVoca: () => ({ url: "/remember-vocas", title: "Ghi nhớ từ vựng" }),
  rememberVocaWithId: (id) => ({ url: `/remember-vocas/${id}`, title: '' }),
  myVoca: () => ({ url: `/my-vocas`, title: "Từ vựng của tôi" }),
  setVocaDetail: (setId) => ({ url: `/my-vocas/${setId}`, title: "" }),
  testVoca: () => ({ url: `/test-vocas`, title: "Kiểm tra kiến thức" }),
  dashboard: () => ({ url: "/", title: "Meomeo-kun" }),
  signUp: () => ({ url: "/sign-up", title: "Đăng kí" }),
};
