import React, { useReducer, createContext, useMemo } from "react";
import { Site } from "./common/types";

interface Action {}

class ChangeSite implements Action {
  type: "CHANGE_SITE" = "CHANGE_SITE";
  payload!: Site;
}

const initialState = {
  show_archived: false,
  site: {} as Site,
  setSite: (site: any) => {},
};

const AppContext = createContext({ ...initialState });

function appReducer(state: any, action: any) {
  switch (action.type) {
    case "TOGGLE_SHOW_ARCHIVED":
      return {
        ...state,
        show_archived: action.flag,
      };
    case "CHANGE_SITE":
      let changeSiteAction = action as ChangeSite;
      let site = {
        name: changeSiteAction.payload.name,
        _id: changeSiteAction.payload._id,
      };
      localStorage.setItem("CURRENT_SITE", JSON.stringify(site));
      return {
        ...state,
        site,
      };
    default:
      return state;
  }
}

function ContextProvider(props: any) {
  const [state, dispatch] = useReducer(appReducer, { ...initialState });

  function setSite(site: Site) {
    let changeSiteAction = new ChangeSite();
    changeSiteAction.payload = site;
    dispatch(changeSiteAction);
  }

  useMemo(() => {
    if (localStorage.getItem("CURRENT_SITE")) {
      setSite(JSON.parse("" + localStorage.getItem("CURRENT_SITE")));
    }
    console.log("state.show_archived", state.show_archived);
  }, [state.show_archived]);

  return (
    <AppContext.Provider
      value={{
        show_archived: state.show_archived,
        site: state.site as Site,
        setSite,
      }}
      {...props}
    />
  );
}

export { AppContext, ContextProvider };
