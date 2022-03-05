import React, { createContext } from 'react';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:1337/api";
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";





const initialState = () => ({
    user: localStorage.getItem("strapi")
    ? JSON.parse(localStorage.getItem("strapi")).user
    : null,
    token: localStorage.getItem("strapi")
    ? JSON.parse(localStorage.getItem("strapi")).token
    : null,
    assets:{
      allAssets: null,
      asset: null,
    }
  })

// create context
export const generalContext = createContext({})

export const StateAndEndpointHOC = (props) => {
  const [state, setState] = React.useState(initialState);
  const endpoints = {
    login: async(params, callback)=> {
      try{
        const res = await axios.post('/auth/local', params)
        console.log('endpoint result--login', res)
        if(callback && typeof callback === 'function'){
          callback(res, null)
        }
        console.log(res.data.user);
        setState(() => ({...state, token: res?.data?.jwt, user: res.data.user }))
        localStorage.setItem('strapi', JSON.stringify({
          token: res?.data?.jwt,
          user: res?.data?.user
        }))
        return res
      }catch(err){
        console.log(err.response.data.error.message)
        if(callback && typeof callback === 'function'){
          callback(null, err)
        }
        throw new Error(err)
      }
    },
    signup: async(params, callback)=>{
      try{
        const res = await axios.post('/auth/local/register', params)
        console.log('endpoint result--signup', res)
        if(callback && typeof callback === 'function'){
          callback(res, null)
        }
        setState({...state, token: res?.data?.jwt, user: res?.data?.user})
        localStorage.setItem('strapi', JSON.stringify({
          token: res?.data?.jwt,
          user: res?.data?.user
        }))
        return res
      }catch(err){
        if(callback && typeof callback === 'function'){
          callback(null, err)
        }
        throw new Error(err)
      }
    },
    getAssets: async(callback)=>{
      let config = {
        headers: {
          'authorization': "Bearer " +state.token || null
        }
      }
      try{
        const res = await axios.get('/assets', config)
        console.log('endpoint result--get', res)
        if(callback && typeof callback === 'function'){
          callback(res, null)
        }
        return res
      }catch(err){
        if(callback && typeof callback === 'function'){
          callback(null, err)
        }
        throw new Error(err)
      }
    },
    createAssets: async(state, callback)=>{
      let config = {
        headers: {
          'authorization': state.token || null
        },
        data: state
      }
      try{
        const res = await axios.post('/assets', config)
        console.log('endpoint result--create', res)
        if(callback && typeof callback === 'function'){
          callback(res, null)
        }
        return res
      }catch(err){
        if(callback && typeof callback === 'function'){
          callback(null, err)
        }
        throw new Error(err)
      }
    },
    logout: ()=>{
      localStorage.removeItem('strapi')
      setState({...initialState})
    }
  }

  const allProps = {...state, setState, endpoints }
  
  return <><props.app {...allProps } /></>
};