import { applyMiddleware } from "redux";
import { combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducer/CarouselReducer/CarouselReducer";
import { ManangerFilmReducer } from "./reducer/ManagerFilmReducer.js/ManagerFilmReducer";
import { ManagerCinema } from "./reducer/ManagerCinema/ManagerCinema";
import { AuthReducer } from "./reducer/AuthReducer/AuthReducer";
import { BookingTicketReducer } from "./reducer/BookingTicketReducer/BookingTicketReducer";
import { LoadingReducer } from "./reducer/LoadingReducer/LoadingReducer";
const rootReducer = combineReducers({
  // State ung dung
  CarouselReducer: CarouselReducer,
  ManangerFilmReducer: ManangerFilmReducer,
  ManagerCinema: ManagerCinema,
  AuthReducer: AuthReducer,
  BookingTicketReducer: BookingTicketReducer,
  LoadingReducer: LoadingReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
