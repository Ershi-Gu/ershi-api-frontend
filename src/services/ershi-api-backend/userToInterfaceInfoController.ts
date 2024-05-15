// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUserToInterfaceInfo POST /api/usertointerfaceinfo/add */
export async function addUserToInterfaceInfoUsingPost(
  body: API.UserToInterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/usertointerfaceinfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUserToInterfaceInfo POST /api/usertointerfaceinfo/delete */
export async function deleteUserToInterfaceInfoUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/usertointerfaceinfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserToInterfaceInfoVOById GET /api/usertointerfaceinfo/get/vo */
export async function getUserToInterfaceInfoVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserToInterfaceInfoVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserToInterfaceInfoVO_>('/api/usertointerfaceinfo/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserToInterfaceInfoByPage POST /api/usertointerfaceinfo/list/page */
export async function listUserToInterfaceInfoByPageUsingPost(
  body: API.UserToInterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserToInterfaceInfo_>('/api/usertointerfaceinfo/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listUserToInterfaceInfoVOByPage POST /api/usertointerfaceinfo/list/page/vo */
export async function listUserToInterfaceInfoVoByPageUsingPost(
  body: API.UserToInterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserToInterfaceInfoVO_>(
    '/api/usertointerfaceinfo/list/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** updateUserToInterfaceInfo POST /api/usertointerfaceinfo/update */
export async function updateUserToInterfaceInfoUsingPost(
  body: API.UserToInterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/usertointerfaceinfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
