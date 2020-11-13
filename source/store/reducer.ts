import {
  State,
  Action,
  ActionType,
  SetBrandAction,
  SetErrorAction,
  SetBrandsAction,
  DeleteBrandAction,
  SetFetchingStatusAction,
} from '../types';

import {normalizeBrands, updateBrand, deleteBrand} from '../utils';

const initialState: State = {
  brands: {},
  isFetching: false,
  error: '',
};

const reducer = (state = initialState, action: Action): State => {
  const {brands} = state;
  const {type} = action;

  switch (type) {
    case ActionType.SET_BRAND:
      const {payload: brand} = <SetBrandAction> action;
      return {...state, brands: updateBrand(brands, brand)};
    case ActionType.DELETE_BRAND:
      const {payload: id} = <DeleteBrandAction> action;
      return {...state, brands: deleteBrand(brands, id)};
    case ActionType.SET_BRANDS:
      const {payload: newBrands} = <SetBrandsAction> action;
      return {...state, brands: normalizeBrands(newBrands)};
    case ActionType.SET_FETCHING_STATUS:
      const {payload: isFetching} = <SetFetchingStatusAction> action;
      return {...state, isFetching};
    case ActionType.SET_ERROR:
      const {payload: error} = <SetErrorAction> action;
      return {...state, error};
    default:
      return state;
  }
};

export default reducer;
