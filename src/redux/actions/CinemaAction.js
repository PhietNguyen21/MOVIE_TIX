import {
  getListCinema,
  getThongTinLichChieu,
  getThongTinPhim,
} from "../../services/ManagerCinemaService";
import { GET_THONG_TIN_PHIM } from "../../types/configType";
import { GET_LICH_CHIEU, GET_LIST_CINEMA } from "./types/CinemaType";
import { DIS_LOADING, LOADING } from "./types/LoadingType";

export const getListCinemaActions = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getListCinema();
      if (res && res.content.length > 0) {
        // console.log(res);
        dispatch({
          type: GET_LIST_CINEMA,
          heThongRapChieu: res.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getThongTinPhimAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: LOADING,
      });
      const res = await getThongTinPhim(id);
      if (res && res.statusCode === 200) {
        // console.log(res);
        dispatch({
          type: GET_THONG_TIN_PHIM,
          filmDetail: res.content,
        });
      }

      setTimeout(() => {
        dispatch({
          type: DIS_LOADING,
        });
      }, [2000]);
    } catch (error) {}
  };
};

export const getThongTinLichChieuAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const res = await getThongTinLichChieu(maPhim);
      if (res && res.statusCode === 200) {
        console.log(res);
        dispatch({
          type: GET_LICH_CHIEU,
          data: res.content,
        });
      } else {
        console.log("Error", res.content);
      }
    } catch (error) {
      console.log("Errrr", error);
    }
  };
};
