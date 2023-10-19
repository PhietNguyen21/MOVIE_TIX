import { GP00 } from "../types/configType";
import axios from "../util/axiosCustomize";

// LIST BANNER
export const getListBanner = () => {
  return axios.get(
    "https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner"
  );
};

// LIST FILM

export const getListFilm = (tenPhim = "") => {
  if (tenPhim.trim() !== "") {
    return axios.get(
      `https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP00&tenPhim=${tenPhim}`
    );
  }
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GP00}`
  );
};

export const postThemFilm = (
  tenPhim,
  trailer,
  moTa,
  ngayKhoiChieu,
  sapChieu,
  dangChieu,
  hot,
  danhGia,
  hinhAnh,
  maNhom
) => {
  const data = new FormData();
  data.append("tenPhim", tenPhim);
  data.append("trailer", trailer);
  data.append("moTa", moTa);
  data.append("ngayKhoiChieu", ngayKhoiChieu);
  data.append("sapChieu", sapChieu);
  data.append("dangChieu", dangChieu);
  data.append("hot", hot);
  data.append("danhGia", danhGia);
  data.append("File", hinhAnh);
  data.append("maNhom", maNhom);
  return axios.post(
    "https://movieapi.cyberlearn.vn/api/QuanLyPhim/ThemPhimUploadHinh",
    data
  );
};

export const getLayThongTinPhim = (maPhim) => {
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`
  );
};

export const postCapNhatPhim = (
  maPhim,
  tenPhim,
  trailer,
  moTa,
  ngayKhoiChieu,
  sapChieu,
  dangChieu,
  hot,
  danhGia,
  hinhAnh,
  maNhom
) => {
  const data = new FormData();
  data.append("maPhim", maPhim);
  data.append("tenPhim", tenPhim);
  data.append("trailer", trailer);
  data.append("moTa", moTa);
  data.append("ngayKhoiChieu", ngayKhoiChieu);
  data.append("sapChieu", sapChieu);
  data.append("dangChieu", dangChieu);
  data.append("hot", hot);
  data.append("danhGia", danhGia);
  data.append("File", hinhAnh);
  data.append("maNhom", maNhom);
  return axios.post(
    "https://movieapi.cyberlearn.vn/api/QuanLyPhim/CapNhatPhimUpload",
    data
  );
};

export const deletePhim = (maPhim) => {
  return axios.delete(
    `https://movieapi.cyberlearn.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`
  );
};
