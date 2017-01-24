const Request = (method, path, params, data) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, path, true);
  xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.send(JSON.stringify(data));

  return new Promise((resolve, reject) => {
    xhr.onloadend = function (response) {
      if (response.target.status === 400) {
        reject(JSON.parse(xhr.responseText));
      } else if (response.target.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      }
    };
  })
};

export default Request;
