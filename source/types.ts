import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {AxiosInstance} from 'axios';

export interface Brand {
  id: string,
  title: string,
  main: boolean,
}

export interface BrandInServerFormat {
  _id: string,
  title: string,
  main: boolean,
}

export interface NormalizedBrands {[id: string]: Brand}

export interface State {
  brands: NormalizedBrands,
  isFetching: boolean,
  error: string,
}

export enum ActionType {
  SET_BRAND = 'setBrand',
  DELETE_BRAND = 'deleteBrand',
  SET_BRANDS = 'setBrands',
  SET_FETCHING_STATUS = 'setFetchingStatus',
  SET_ERROR = 'setError',
}

export interface SetBrandAction {
  type: ActionType.SET_BRAND,
  payload: Brand,
}

export interface DeleteBrandAction {
  type: ActionType.DELETE_BRAND,
  payload: string,
}

export interface SetBrandsAction {
  type: ActionType.SET_BRANDS,
  payload: Brand[],
}

export interface SetFetchingStatusAction {
  type: ActionType.SET_FETCHING_STATUS,
  payload: boolean,
}

export interface SetErrorAction {
  type: ActionType.SET_ERROR,
  payload: string,
}

export type Action = (
  SetBrandAction |
  DeleteBrandAction |
  SetBrandsAction |
  SetFetchingStatusAction |
  SetErrorAction
);

export type AsyncAction = ThunkAction<void, {}, AxiosInstance, AnyAction>

export enum ServerURL {
  BRAND = '/brand',
  BRANDS = '/brands',
}
