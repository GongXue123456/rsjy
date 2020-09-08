// const resourcePath = "http://139.155.11.121:8089/qy/";
const resourcePath = process.env.NODE_ENV=="production"?`http://${location.hostname}/qy/`:process.env.VUE_APP_RESOURCE_PATH;
export default {
  resourcePath
};
