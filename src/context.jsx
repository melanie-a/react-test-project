import { createContext, useReducer } from "react";

const initialState = {
  theme: "light",
  // user: {},
  isLoggedIn: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "switchTheme":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "setUser":
    // return { ...state, user: action.payload };
    case "logout":
      return { ...state, isLoggedIn: false };
    case "login":
      return { ...state, isLoggedIn: true };
    default:
      throw Error("Unknown action in context reducer");
  }
};

const Context = createContext({ context: initialState, dispatch: () => {} });

const ContextProvider = ({ children }) => {
  const [context, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ context, dispatch }}>
      {children}
    </Context.Provider>
  );
}; // Initialisation du contexte pour qu'il fonctionne bien avec React

export { Context, ContextProvider };
