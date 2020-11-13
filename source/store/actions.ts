import {AxiosResponse, AxiosError} from 'axios';
import {ERROR_TIMEOUT} from '../const';

import {
  Brand,
  ServerURL,
  ActionType,
  AsyncAction,
  SetBrandAction,
  SetErrorAction,
  SetBrandsAction,
  DeleteBrandAction,
  SetFetchingStatusAction,
} from '../types';

import {
  convertBrandFromServerFormat,
  convertBrandsFromServerFormat,
} from '../adapters';

export const ActionCreator = {
  setBrand: (brand: Brand): SetBrandAction => ({
    type: ActionType.SET_BRAND,
    payload: brand,
  }),

  deleteBrand: (id: string): DeleteBrandAction => ({
    type: ActionType.DELETE_BRAND,
    payload: id,
  }),

  setBrands: (brands: Brand[]): SetBrandsAction => ({
    type: ActionType.SET_BRANDS,
    payload: brands,
  }),

  setFetchingStatus: (isFetching: boolean): SetFetchingStatusAction => ({
    type: ActionType.SET_FETCHING_STATUS,
    payload: isFetching,
  }),

  setError: (error: string): SetErrorAction => ({
    type: ActionType.SET_ERROR,
    payload: error,
  }),
};

let timeoutID: number;

// Экшены, работающие через middleware
export const AsyncActionCreator = {
  createBrand: (brand: Brand): AsyncAction => (dispatch, _, api) => {
    const promise = api.post(ServerURL.BRANDS, brand)
        .then(({data}: AxiosResponse): void => {
          const newBrand: Brand = convertBrandFromServerFormat(data);
          dispatch(ActionCreator.setBrand(newBrand));
        });

    dispatch(AsyncActionCreator._handleAPIPromise(promise));
  },

  updateBrand: (brand: Brand): AsyncAction => (dispatch, _, api) => {
    const {id} = brand;

    const promise = api.put(`${ServerURL.BRAND}/${id}`, brand)
        .then(({data}: AxiosResponse): void => {
          const newBrand: Brand = convertBrandFromServerFormat(data);
          dispatch(ActionCreator.setBrand(newBrand));
        });

    dispatch(AsyncActionCreator._handleAPIPromise(promise));
  },

  deleteBrand: (id: string): AsyncAction => (dispatch, _, api) => {
    const promise = api.delete(`${ServerURL.BRAND}/${id}`)
        .then((): void => {
          dispatch(ActionCreator.deleteBrand(id));
        });

    dispatch(AsyncActionCreator._handleAPIPromise(promise));
  },

  loadBrands: (): AsyncAction => (dispatch, _, api) => {
    const promise = api.get(ServerURL.BRANDS)
        .then(({data}: AxiosResponse): void => {
          const brands: Brand[] = convertBrandsFromServerFormat(data);
          dispatch(ActionCreator.setBrands(brands));
        });

    dispatch(AsyncActionCreator._handleAPIPromise(promise));
  },

  // Универсальная обработка любых запросов
  _handleAPIPromise: (promise: Promise<void>): AsyncAction => (dispatch) => {
    dispatch(ActionCreator.setFetchingStatus(true));

    promise
        .catch(({message}: AxiosError) => {
          dispatch(AsyncActionCreator._temporarilySetError(message));
        })
        .finally(() => dispatch(ActionCreator.setFetchingStatus(false)));
  },

  // Временная установка сообщения об ошибке
  _temporarilySetError: (error: string): AsyncAction => (dispatch) => {
    clearTimeout(timeoutID);
    dispatch(ActionCreator.setError(error));

    timeoutID = window.setTimeout(
        () => dispatch(ActionCreator.setError('')),
        ERROR_TIMEOUT,
    );
  },
};
