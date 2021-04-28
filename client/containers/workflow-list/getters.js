// Copyright (c) 2021 Uber Technologies Inc.
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import { ROUTE_PARAMS_DOMAIN, ROUTE_QUERY } from '../route/getter-types';
import {
  FILTER_BY_START_TIME,
  FILTER_BY_CLOSE_TIME,
  FILTER_MODE_ADVANCED,
  FILTER_MODE_BASIC,
  STATE_ALL,
  STATE_CLOSED,
  STATE_OPEN,
  STATUS_ALL,
  STATUS_LIST,
  STATUS_OPEN,
} from './constants';
import {
  WORKFLOW_LIST_FETCH_WORKFLOW_LIST_URL,
  WORKFLOW_LIST_FILTER_BY,
  WORKFLOW_LIST_FILTER_MODE,
  WORKFLOW_LIST_FILTER_MODE_BUTTON_LABEL,
  WORKFLOW_LIST_QUERY_STRING,
  WORKFLOW_LIST_RANGE,
  WORKFLOW_LIST_STATE,
  WORKFLOW_LIST_STATUS,
  WORKFLOW_LIST_STATUS_NAME,
  WORKFLOW_LIST_WORKFLOW_ID,
  WORKFLOW_LIST_WORKFLOW_NAME,
} from './getter-types';
import { getFetchWorkflowListUrl } from './helpers';

const getters = {
  [WORKFLOW_LIST_FETCH_WORKFLOW_LIST_URL]: (_, getters) => {
    const domain = getters[ROUTE_PARAMS_DOMAIN];
    const filterMode = getters[WORKFLOW_LIST_FILTER_MODE];
    const state = getters[WORKFLOW_LIST_STATE];

    return getFetchWorkflowListUrl({
      domain,
      filterMode,
      state,
    });
  },
  [WORKFLOW_LIST_FILTER_BY]: (_, getters) => {
    const statusName = getters[WORKFLOW_LIST_STATUS_NAME];

    return [STATUS_ALL, STATUS_OPEN].includes(statusName)
      ? FILTER_BY_START_TIME
      : FILTER_BY_CLOSE_TIME;
  },
  [WORKFLOW_LIST_FILTER_MODE]: (_, getters) =>
    getters[ROUTE_QUERY].filterMode || FILTER_MODE_BASIC,
  [WORKFLOW_LIST_FILTER_MODE_BUTTON_LABEL]: (_, getters) =>
    getters[WORKFLOW_LIST_FILTER_MODE] === 'advanced' ? 'basic' : 'advanced',
  [WORKFLOW_LIST_QUERY_STRING]: (_, getters) =>
    getters[ROUTE_QUERY].queryString || '',
  [WORKFLOW_LIST_RANGE]: (_, getters) => getters[ROUTE_QUERY].range,
  [WORKFLOW_LIST_STATE]: (_, getters) => {
    const statusName = getters[WORKFLOW_LIST_STATUS_NAME];

    if (!statusName || statusName == STATUS_ALL) {
      return STATE_ALL;
    }

    return statusName === STATUS_OPEN ? STATE_OPEN : STATE_CLOSED;
  },
  [WORKFLOW_LIST_STATUS]: (_, getters) => {
    const { status } = getters[ROUTE_QUERY];

    return !status
      ? STATUS_LIST[0]
      : STATUS_LIST.find(item => item.value === status);
  },
  [WORKFLOW_LIST_STATUS_NAME]: (_, getters) =>
    getters[WORKFLOW_LIST_STATUS].value,
  [WORKFLOW_LIST_WORKFLOW_ID]: (_, getters) => getters[ROUTE_QUERY].workflowId,
  [WORKFLOW_LIST_WORKFLOW_NAME]: (_, getters) =>
    getters[ROUTE_QUERY].workflowName,
};

export default getters;