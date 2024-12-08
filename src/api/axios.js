import axios from "axios";

const baseURL = "https://api.edamam.com/api/recipes/v2";

function fetchData(url) {
  const instance = axios.create();
  // In the case of the url fetch link (E.g. next page data fetch link)
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return instance.get(url); // if the url already contains https:// or http://
  } else {
    // In the case of normal fetch with base url
    instance.defaults.baseURL = baseURL;
    return instance.get(url); // if the url is relative
  }
}

export default fetchData;
