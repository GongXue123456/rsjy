import request from "@/utils/request";

export function fetchList(params) {
  return request({
    url: "/app/company/list",
    method: "get",
    params,
    showLoading: false
  });
}

export function getDetail(query) {
  return request({
    url: "/app/company/single",
    method: "get",
    params: {
      company_code: query.id
    },
    showLoading: false
  });
}

export function saveAdvice(data) {
  return request({
    url: "/app/company/advice/save",
    method: "post",
    data,
    showLoading: false
  });
}

export function getCam(params) {
  return request({
    url: "/app/company/ali/video",
    method: "get",
    params,
    showLoading: false
  });
}

export function getCapture(params) {
  return request({
    url: "/app/company/ali/video/capture",
    method: "get",
    params,
    showLoading: false
  });
}
export function getReviewPics(params) {
  return request({
    url: "/app/company/ali/pics/review",
    method: "get",
    params,
    showLoading: false
  });
}
