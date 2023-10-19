import { PlusOutlined } from "@ant-design/icons";

import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import moment from "moment/moment";
import {
  deletePhimAction,
  getLayThongTinPhimAcion,
  getListFilmAction,
  postCapNhatFilmAction,
  postCapNhatPhimAction,
} from "../../../../redux/actions/FilmAction";
import { useDispatch, useSelector } from "react-redux";
import { GP00 } from "../../../../types/configType";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "autoprefixer";
import {
  deletePhim,
  postCapNhatPhim,
} from "../../../../services/MangerFilmServices";
import { toast } from "react-toastify";
import _ from "lodash";
import { LOADING } from "../../../../redux/actions/types/LoadingType";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const DeleteFilm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // lay Action thanh cong hay that bai

  const { thongTinPhim } = useSelector((state) => state.ManangerFilmReducer);
  //   console.log(thongTinPhim);
  const { maPhim } = params;
  useEffect(() => {
    //lay id ra trong day de luon dung maPhim

    dispatch(getLayThongTinPhimAcion(maPhim));
  }, []);

  useEffect(() => {
    setPreviewImg(thongTinPhim.hinhAnh);
  }, [thongTinPhim.hinhAnh]);
  // console.log({ thongTinPhim });
  const [preViewImg, setPreviewImg] = useState(null);

  //   console.log(thongTinPhim);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null,
      maNhom: GP00,
    },

    onSubmit: async (value) => {
      await dispatch({
        type: LOADING,
      });
      const res = await deletePhim(maPhim);
      if (res && res.statusCode === 200) {
        console.log(res);
        toast.success(res.message);
        navigate("/admin/filmAdmin");
      } else {
        console.log(res);
        toast.error(res.content);
      }
    },
  });

  const handleChangeIMG = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    //  khong co hinh tra ve preview IMG
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif" ||
      file?.type === "image/png"
    ) {
      // Day file anh len formik
      await formik.setFieldValue("hinhAnh", file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        setPreviewImg(e.target.result);
      };
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl mb-2">Bạn có chắc muốn xoá Film:</h1>
      <Form
        onFinish={formik.handleSubmit}
        disabled
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item label="Ten Phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mo ta">
          <TextArea
            name="moTa"
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item
          label="Ngay chieu"
          style={{
            cursor: "pointer",
          }}
        >
          <DatePicker
            defaultValue={moment(formik.values.ngayKhoiChieu)}
            style={{
              cursor: "pointer",
            }}
            name="ngayKhoiChieu"
            format={"DD/MM/YYYY"}
          />
        </Form.Item>

        <Form.Item label="Dang chieu">
          <Switch
            name="dangChieu"
            checked={formik.values.dangChieu}
            style={{ backgroundColor: "green" }}
            onChange={(value, e) => {
              formik.setFieldValue(e.target.name, value);
            }}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            checked={formik.values.hot}
            name="hot"
            style={{ backgroundColor: "green" }}
            onChange={(value, e) => {
              formik.setFieldValue(e.target.name, value);
            }}
          />
        </Form.Item>
        <Form.Item label="Sap chieu" valuePropName="checked">
          <Switch
            name="sapChieu"
            checked={formik.values.sapChieu}
            style={{ backgroundColor: "green" }}
            onChange={(value, e) => {
              formik.setFieldValue(e.target.name, value);
            }}
          />
        </Form.Item>

        <Form.Item label="So sao">
          <InputNumber
            value={formik.values.danhGia}
            name="danhGia"
            onChange={(value) => {
              formik.setFieldValue("danhGia", value);
            }}
            min={0}
            max={10}
          />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <input
            name="hinhAnh"
            type="file"
            id="uploadIMG"
            onChange={handleChangeIMG}
            hidden
            disabled
          />

          <label
            className="bg-blue-400 opacity-40 cursor-no-drop p-2 border-blue-400 rounded cursor-pointer"
            htmlFor="uploadIMG"
          >
            Upload IMG
          </label>
          {preViewImg !== null ? (
            <div
              className="border-dotted border-2 p-4 text-center flex justify-center items-center mt-2 border-gray-400 rounded "
              style={{ height: 150 }}
            >
              <img
                src={preViewImg}
                alt="s"
                style={{ width: "100px", height: 100 }}
              />
            </div>
          ) : (
            <div
              className=" border-dotted border-2 text-center flex justify-center items-center mt-2 border-gray-400 rounded "
              style={{ height: 100 }}
            >
              Preview IMG ...
            </div>
          )}
        </Form.Item>
        <Form.Item label="Button">
          <Button size="large" disabled={false} htmlType="submit">
            Delete
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default DeleteFilm;
