let record = () => {
  console.log(globalEmpcandi)
  return new Promise((resolve, reject) => {
    fetch("/signin/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        type: globalEmpcandi,
        username: SignUsername.value.toLowerCase(),
        email: Signemail.value,
        password: Signpassword.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        resolve(data);
      })
      .catch((err) => {
        console.log(err)
        resolve({ result: 0, message: `frontend fetch errro1r ${err}` });
      });
  }).catch((err) => {
    return { result: 0, message: `frontend fetch errror2 ${err}` };
  });
};

let verify = (code) => {
  return new Promise((resolve, reject) => {
    fetch("/signin/verify", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        resolve({ result: 0, message: `frontend fetch errror3 ${err}` });
      });
  }).catch((err) => {
    return { result: 0, message: `frontend fetch errror4 ${err}` };
  });
};
