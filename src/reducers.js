import { 
  REQUEST_DECKLIST_FAILED, 
  REQUEST_DECKLIST_PENDING, 
  REQUEST_DECKLIST_SUCCESS, 
  INITIAL_DECKLIST,
  UPDATE_DECKLIST,
  REQUEST_MENU_STATUS, 
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAILURE,
  REQUEST_USER_PENDING, 
  REQUEST_USER_SIGNOUT,
  UPDATE_USER,
  REQUEST_SIDEBAR_STATUS, 
  profile } 
from "./constants";

const initialStateActiveDecklist = { 
    isPending: false, 
    decklist: [], 
    sideboard: [],
    deckDetails: {},
    authorised: false,
    error: ''
}

export const requestDecklist = (state=initialStateActiveDecklist, action) => { 
    switch(action.type) { 
        case REQUEST_DECKLIST_PENDING: 
          return { ...state, isPending: true }
        case REQUEST_DECKLIST_SUCCESS: 
          return { ...state, deckDetails: action.payload[0], decklist: action.payload[1], sideboard: action.payload[2], authorised: action.payload[3], isPending: false }
        case REQUEST_DECKLIST_FAILED: 
          return { ...state, error: action.payload, isPending: false }
        case UPDATE_DECKLIST: 
           return { ...state, decklist: action.payload[0], sideboard: action.payload[1] }
        case INITIAL_DECKLIST: 
           return { ...state, isPending: false, decklist: [], sideboard: [], deckDetails: {}, authorised: false, error: ''}
        default: 
          return state;
    }
}

const initialLoginStatus = { 
  isSignedIn: false,
  userId: 0,
  username: "GUEST",
  profile: profile,
  error: "",
  errorRegister: false,
  isPendingLogin: false
}

export const loginStatus = (state=initialLoginStatus, action) => { 
  switch(action.type) { 
    case REQUEST_USER_SUCCESS: 
       return { 
          ...state, 
          isSignedIn: true, 
          username: action.payload.username,
          userId: action.payload.userID,
          profile: action.payload.profile,
          isPendingLogin: false
        }
    case REQUEST_USER_PENDING: 
       return { 
            ...state, 
            isPendingLogin: true
          }
    case REQUEST_USER_FAILURE: 
       return { 
          ...state, 
          isSignedIn: false, 
          error: action.payload.error,
          isPendingLogin: false
         }
    case REQUEST_USER_SIGNOUT:
        return { 
          ...state,
          isSignedIn: false,
          userId: 0,
          username: "GUEST",
          profile: profile,
          error: "",
          isPending: false
        }
    case UPDATE_USER: 
        return { 
          ...state,  
          username: action.payload.username,
          profile: action.payload.profile,
        }
    default: 
       return state
  }
}

const initialStateMenuStatus = { 
    menuStatus: false
}



export const menuStatus = (state=initialStateMenuStatus, action) => { 
  switch(action.type) { 
    case REQUEST_MENU_STATUS: 
       return { ...state, menuStatus:action.payload }
    default: 
       return state
  }
}

const initialStateSidebarStatus = { 
  sidebarStatus: true
}

export const sidebarStatus = (state=initialStateSidebarStatus, action) => { 
    switch(action.type) { 
      case REQUEST_SIDEBAR_STATUS: 
         return { ...state, sidebarStatus: action.payload }
      default: 
          return state
  }
}

