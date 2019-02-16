import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: '',
}

export function errorMsg(msg) {
  return {
    type: ERROR_MSG,
    payload: msg,
  }
}

export function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo,
  }
}

export function register({user, pwd, repeatpwd, type}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必需输入')
  }

  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }

  return (dispatch) => {
    axios.post('/user/register', {user, pwd, type})
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(registerSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必需输入')
  }
  return (dispatch) => {
    axios.post('/user/login', {user, pwd})
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(loginSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export default function user(state = initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload,
      }
    case LOAD_DATA: 
      return { ...state, ...action.payload }
    case ERROR_MSG:
      return {
        ...state,
        msg: action.payload,
        isAuth: false,
      }
    default:
      return state
  }
}
  
