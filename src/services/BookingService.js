import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import axios from "../util/axiosCustomize";

export const getListPhongVe = (maPV) => {
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maPV}`
  );
};

export const postDatVe = (thongTinDatVe = new ThongTinDatVe()) => {
  return axios.post(
    `https://movieapi.cyberlearn.vn/api/QuanLyDatVe/DatVe`,
    thongTinDatVe
  );
};

export const postThongTinNguoiDung = () => {
  return axios.post(
    "https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan"
  );
};

export const postTaoLichChieu = (maPhim, ngayChieuGioChieu, maRap, giaVe) => {
  return axios.post(
    "https://movieapi.cyberlearn.vn/api/QuanLyDatVe/TaoLichChieu",
    {
      maPhim,
      ngayChieuGioChieu,
      maRap,
      giaVe,
    }
  );
};
