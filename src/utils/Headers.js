import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });
function get_method() {
  const config = {
    withCredentials: true,
    "Authorization": "Bearer " + cookies.get('token'),
    "Cookie": cookies.get('token'),
  };
  return config;
}
function others_method() {

  const config = {
    withCredentials: true,

    headers: {
      "Authorization": "Bearer " + cookies.get('token'),
      "Content-Type": "application/json",
      "Cookie": cookies.get('token'),
    },
  };
  return config;
}
function others_multiform_method() {
  const config = {
    withCredentials: true,

    headers: {
      "Authorization": "Bearer " + cookies.get('token'),
      "Content-Type": "multipart/form-data",
      "Cookie": cookies.get('token'),
    },
  };
  return config;
}

export { get_method, others_method, others_multiform_method };
