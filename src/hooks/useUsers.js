import { useReducer, useEffect } from "react";

const initialState = {
  get: {
    loading: false,
    error: "",
    list: [],
  },
  update: {
    loading: false,
    error: "",
  },
  delete: {
    loading: false,
    error: "",
  },
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    // GET
    case "GET_USERS":
      return {
        ...state,
        get: {
          ...state.get,
          loading: true,
        },
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        get: {
          loading: false,
          list: payload,
          error: null,
        },
      };
    case "GET_USERS_FAILURE":
      return {
        ...state,
        get: {
          ...state.get,
          loading: false,
          error: payload.error,
        },
      };

    //
    case "UPDATE_USER":
      return {
        ...state,
        edit: {
          ...state.edit,
          loading: true,
        },
      };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        get: {
          ...state.get,
          list: [],
        },
        edit: {
          ...state.edit,
          loading: false,
          success: true,
        },
      };
    case "UPDATE_USER_FAILURE":
      return {
        ...state,
        edit: {
          loading: false,
          error: payload.error,
        },
      };

    // DELETE
    case "DELETE_MEMBER":
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
        },
      };
    case "DELETE_MEMBER_SUCCESS":
      return {
        ...state,
        get: {
          ...state.get,
          list: state.get.list.filter((member) => member._id !== payload._id),
        },
      };
    case "DELETE_MEMBER_FAILURE":
      return {
        ...state,
        create: {
          loading: false,
          error: payload.error,
        },
      };
    default:
      return state;
  }
};

export function useUsers() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log("useEffect");
    getUsers();
  }, []);

  const getUsers = () => {
    dispatch({ type: "GET_USERS" });
    fetch("https://5edf8f109ed06d001696d4c3.mockapi.io/api/fabbi/users")
      .then((response) => response.json())
      .then((users) => {
        dispatch({ type: "GET_USERS_SUCCESS", payload: users });
      })
      .catch((error) => {
        dispatch({ type: "GET_USERS_FAILURE", payload: error });
      });
  };

  // const updateUser = (userId, data) => {
  //   dispatch({ type: "UPDATE_USER" });
  //   fetch(
  //     `https://5edf8f109ed06d001696d4c3.mockapi.io/api/fabbi/users/${userId}`,
  //     {
  //       method: "PUT",
  //       body: data,
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log("new", data))
  //     .catch((error) => {
  //       console.log("error", error);

  //       dispatch({ type: "UPDATE_USER_FAILURE", payload: error });
  //     });
  // };

  return {
    users: state,
    getUsers,
    //updateUser,
  };
}
