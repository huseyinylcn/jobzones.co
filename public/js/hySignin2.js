let record = () => {
  return new Promise((resolve, reject) => {
    fetch("/signin/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        typeID: SignTypeID.value,
        username: SignUsername.value.toLowerCase(),
        email: Signemail.value,
        password: Signpassword.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        resolve({ result: 0, message: `frontend fetch errror ${err}` });
      });
  }).catch((err) => {
    return { result: 0, message: `frontend fetch errror ${err}` };
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
        resolve({ result: 0, message: `frontend fetch errror ${err}` });
      });
  }).catch((err) => {
    return { result: 0, message: `frontend fetch errror ${err}` };
  });
};
