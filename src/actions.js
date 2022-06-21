import {
  REQUEST_DECKLIST_FAILED,
  REQUEST_DECKLIST_PENDING,
  REQUEST_DECKLIST_SUCCESS,
  INITIAL_DECKLIST,
  UPDATE_DECKLIST,
  REQUEST_MENU_STATUS,
  REQUEST_USER_PENDING,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAILURE,
  REQUEST_USER_SIGNOUT,
  UPDATE_USER
} from "./constants";

export const requestDecklist = (deckId, userId) => (dispatch) => {
  const token = window.localStorage.getItem("token");
  dispatch({ type: REQUEST_DECKLIST_PENDING });
  fetch(
    `${process.env.REACT_APP_API_URL}/requestdeck/${deckId}/${userId}`,
    {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => dispatch({ type: REQUEST_DECKLIST_SUCCESS, payload: data }))
    .catch((error) =>
      dispatch({ type: REQUEST_DECKLIST_FAILED, payload: error })
    );
};

export const clearDecklist = () => {
  return { type: INITIAL_DECKLIST };
};

export const updateDecklist = (appendedDecklist, appendedSideboard) => {
  return {
    type: UPDATE_DECKLIST,
    payload: [appendedDecklist, appendedSideboard],
  };
};

export const requestUserGoogle = (res) => (dispatch) => {
  dispatch({ type: REQUEST_USER_PENDING });
  if (res) {
    const token = res.tokenId;
    fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.success && user.userID) {
          saveAuthTokenInSession(user.token);
          fetchProfile(dispatch, user.token, user);
        }
      })
      .catch((error) => {
        dispatch({ type: REQUEST_USER_FAILURE, payload: error });
      });
  }
};

export const signoutUser = () => {
  localStorage.removeItem("token");
  return { type: REQUEST_USER_SIGNOUT };
};

const saveAuthTokenInSession = (token) => {
  window.localStorage.setItem("token", token);
};

const fetchProfile = (dispatch, token, data) => {
  if (data && data.userID) {
    fetch(
      `${process.env.REACT_APP_API_URL}/profile/${data.userID}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((response) => response.json())
      .then((user) => {
        dispatch({ type: REQUEST_USER_SUCCESS, payload: user });
      })
      .catch((err) =>
        dispatch({ type: REQUEST_USER_FAILURE, payload: { error: err } })
      );
  }
};

export const requestUserWithToken = () => (dispatch) => {
  const token = window.localStorage.getItem("token");
  dispatch({ type: REQUEST_USER_PENDING });
  fetch(`${process.env.REACT_APP_API_URL}/signin`, {
    method: "post",
    headers: {
      "content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      fetchProfile(dispatch, token, data);
    })
    .catch((err) =>
      dispatch({ type: REQUEST_USER_FAILURE, payload: { error: err } })
    );
};

export const requestUser = (signinValues) => (dispatch) => {
  dispatch({ type: REQUEST_USER_PENDING });
  fetch(`${process.env.REACT_APP_API_URL}/signin`, {
    method: "post",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      email: signinValues.email,
      password: signinValues.password,
    }),
  })
    .then((response) => response.json())
    .then((user) => {
      if (user.success && user.userID) {
        saveAuthTokenInSession(user.token);
        fetchProfile(dispatch, user.token, user);
      } else {
        dispatch({
          type: REQUEST_USER_FAILURE,
          payload: { error: user, errorRegister: false },
        });
      }
    })
    .catch((err) =>
      dispatch({
        type: REQUEST_USER_FAILURE,
        payload: { error: err, errorRegister: false },
      })
    );
};

export const registerUser = (registerValues) => (dispatch) => {
  dispatch({ type: REQUEST_USER_PENDING });
  fetch(`${process.env.REACT_APP_API_URL}/register`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: registerValues.username,
      email: registerValues.email,
      password: registerValues.password,
    }),
  })
    .then((response) => response.json())
    .then((user) => {
      if (user.success && user.userID) {
        saveAuthTokenInSession(user.token);
        fetchProfile(dispatch, user.token, user);
      } else {
        dispatch({
          type: REQUEST_USER_FAILURE,
          payload: { error: user, errorRegister: true },
        });
      }
    });
};

export const updateUser = (user) => {
  return { type: UPDATE_USER, payload: user };
};

export const setMenuStatus = (status) => {
  return { type: REQUEST_MENU_STATUS, payload: status };
};
