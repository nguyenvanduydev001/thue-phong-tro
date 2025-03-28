export const path = {
  HOME: "/*",
  LOGIN: "login",
  CAN_HO_CHUNG_CU: "can-ho-chung-cu",
  MAT_BANG: "mat-bang",
  NHA_NGUYEN_CAN: "nha-nguyen-can",
  PHONG_TRO: "phong-tro",
};

export const formatVietnameseToString = (keyword) => {
  return keyword
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
};
