import * as types from './actionTypes';

export function createText(text) {
  return { type: types.CREATE_TEXT, text };
}
