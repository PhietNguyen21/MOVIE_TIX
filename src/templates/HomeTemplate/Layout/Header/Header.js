import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Drawer, Radio, Select, Space } from "antd";
import { useTranslation } from "react-i18next";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Profile from "../Profile/Profile";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  HambergerMenu,
  User,
} from "iconsax-react";
import { DANG_XUAT } from "../../../../redux/actions/types/AuthType";
import {
  LeftSquareOutlined,
  RightSquareOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { USER_LOGIN } from "../../../../types/configType";
import {
  DIS_LOADING,
  LOADING,
} from "../../../../redux/actions/types/LoadingType";

const Header = () => {
  // const [activeNav, setActiveNav] = useState(1);
  const navigate = useNavigate();
  const headerRef = useRef(null);
  // DRAWER
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // HOOK DA NGON NGU
  const { t, i18n } = useTranslation();
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  const dispatch = useDispatch();
  // LAY USER DANG NHAP
  const userLOGIN = useSelector((state) => state.AuthReducer.user);

  // console.log(userLOGIN);
  const renderCustomer = () => {
    if (_.isEmpty(userLOGIN)) {
      return (
        <>
          <button
            onClick={() => {
              navigate("/user/login");
            }}
            className="self-center dark:bg-gray-900 px-8 py-3 rounded"
          >
            {t("Sign in")}
          </button>
          <button
            onClick={() => {
              navigate("/user/register");
            }}
            className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900 mx-2"
          >
            {t("Sign up")}
          </button>
        </>
      );
    } else {
      return <Profile />;
    }
  };

  const renderCustomerHamber = () => {
    if (_.isEmpty(userLOGIN)) {
      return (
        <>
          <button
            onClick={() => {
              navigate("/user/login");
            }}
            className="self-center px-4 py-2 rounded font-semibold bg-violet-400 text-gray-900"
          >
            {t("Sign in")}
          </button>
          <div> </div>
        </>
      );
    } else {
      return <Profile onClose={onClose} />;
    }
  };

  const dataLanguage = [
    {
      label: <>VI</>,
      value: "VI",
    },
    {
      label: <>EN</>,
      value: "EN",
    },
    {
      label: <>CHI</>,
      value: "CHI",
    },
  ];
  const dataNav = [
    {
      label: (
        <a
          onClick={async () => {
            dispatch({
              type: LOADING,
            });
            await navigate("/");
            setTimeout(() => {
              dispatch({
                type: DIS_LOADING,
              });
            }, [1500]);
          }}
        >
          {t("header.Home")}
        </a>
      ),
      value: <></>,
    },
    {
      label: <a href="#news">{t("header.News")}</a>,
      value: <></>,
    },
    {
      label: <a href="#ungdung">{t("header.UngDung")}</a>,
      value: <></>,
    },
    {
      label: <NavLink>Đăng xuất</NavLink>,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      let top = window.pageYOffset;
      if (top > 110) {
        headerRef.current.className = "header headerScroll";
      } else {
        headerRef.current.className = "header";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="bg-black">
      <header className="header" ref={headerRef}>
        <div className="header-content">
          <div className="logo">
            <img
              onClick={() => {
                dispatch({
                  type: LOADING,
                });
                navigate("/");
                setTimeout(() => {
                  dispatch({
                    type: DIS_LOADING,
                  });
                }, [1000]);
              }}
              src="/image/logoTixLoading.png"
              alt=""
              style={{
                cursor: "pointer",
                width: "85px",
                height: "75px",
                marginLeft: 10,
              }}
            />
          </div>
          <ul className="listNav" id="listNav">
            {dataNav.slice(0, 3).map((item, index) => {
              return (
                <li key={index} className={"item-nav font-bold"}>
                  {item.label}
                </li>
              );
            })}
          </ul>
          <div className="header-right  hidden lg:block">
            {renderCustomer()}
            <Select
              defaultValue={"VI"}
              onChange={handleChange}
              options={dataLanguage.map((item, index) => {
                return {
                  label: item.label,
                  value: item.value,
                  key: index,
                };
              })}
            />
          </div>
        </div>
      </header>

      <div className="hamBerGer">
        <Space>
          <HambergerMenu
            className="cursor-pointer"
            onClick={showDrawer}
            size="32"
            color="#FF8A65"
          />
        </Space>
        <Drawer
          width={250}
          style={{ padding: "0" }}
          title={
            <div className="renderCustomer flex items-center">
              {renderCustomerHamber()} <b>{userLOGIN.hoTen}</b>
            </div>
          }
          placement={"right"}
          closable={false}
          onClose={onClose}
          open={open}
          key={"right"}
        >
          <div
            onClick={() => {
              onClose();
            }}
            className="item-hamber cursor-pointer text-xl w-full"
          >
            <p
              onClick={() => {
                dispatch({
                  type: LOADING,
                });
                onClose();

                setTimeout(() => {
                  dispatch({
                    type: DIS_LOADING,
                  });
                }, [1000]);
              }}
              className="pl-6"
            >
              {" "}
              {t("header.Home")}
            </p>
          </div>
          <div
            onClick={(e) => {
              onClose();
            }}
            className="item-hamber cursor-pointer text-xl"
          >
            <p className="pl-6"> {t("header.News")}</p>
          </div>
          <div
            onClick={(e) => {
              onClose();
            }}
            className="item-hamber cursor-pointer text-xl"
          >
            <p className="pl-6">{t("header.UngDung")}</p>
          </div>
          {localStorage.getItem(USER_LOGIN) ? (
            <div
              onClick={() => {
                dispatch({
                  type: LOADING,
                });
                dispatch({
                  type: DANG_XUAT,
                });
                navigate("/");
                onClose();
                setTimeout(() => {
                  dispatch({
                    type: DIS_LOADING,
                  });
                }, [1000]);
              }}
              className="item-hamber cursor-pointer text-xl"
            >
              <p className="pl-6">{t("Dangxuat")}</p>
            </div>
          ) : (
            ""
          )}
          {!localStorage.getItem(USER_LOGIN) ? (
            <div className="rounded-full icon-close" onClick={onClose}>
              {" "}
              <ArrowCircleRight
                size="26"
                className="item-icon"
                color="#FF8A65"
              />
            </div>
          ) : (
            ""
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
