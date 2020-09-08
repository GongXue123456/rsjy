import request from "@/utils/requestForm";

export function uploadImg(data) {
  return request({
    url: "/app/file/upload",
    method: "post",
    data,
    showLoading: false
  });
}
