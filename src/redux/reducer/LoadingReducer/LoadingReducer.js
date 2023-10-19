import { DIS_LOADING, LOADING } from "../../actions/types/LoadingType";

const stateDefault = {
  isLoading: false,
};

export const LoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case DIS_LOADING: {
      return { ...state, isLoading: false };
    }
    default:
      return { ...state };
  }
};
