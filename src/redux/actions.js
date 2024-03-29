import * as types from './actionType'
import axios from 'axios'

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
})

const userDeleted = () => ({
    type: types.DELETE_USER
})

const userAdded = () => ({
    type: types.ADD_USER
})

const userUpdated = () => ({
    type: types.UPDATE_USER
})

const getUser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user
})

export const loadUsers = () => {
    return function (dispatch){
        axios
        .get(`${process.env.REACT_APP_API}`)
        .then((response) =>{
            console.log('resp_loadUsers', response);
            dispatch(getUsers(response.data))
        })
        .catch((error) =>{
            console.log(error);
        })
    }
}

export const deleteUsers = (id) => {
    return function (dispatch){
        axios
        .delete(`${process.env.REACT_APP_API}/${id}`)
        .then((response) =>{
            console.log('resp', response);
            dispatch(userDeleted())
            dispatch(loadUsers())
        })
        .catch((error) =>{
            console.log(error);
        })
    }
}

export const addUser = (user) => {
    return function (dispatch){
        axios
        .post(`${process.env.REACT_APP_API}`, user)
        .then((response) =>{
            console.log('resp', response);
            dispatch(userAdded())
            // dispatch(loadUsers())
        })
        .catch((error) =>{
            console.log(error);
        })
    }
}

export const getSingleUser = (id) => {
    return function (dispatch){
        axios
        .get(`${process.env.REACT_APP_API}/${id}`)
        .then((response) =>{
            console.log('resp_getSingleUsers', response);
            dispatch(getUser(response.data))
        })
        .catch((error) =>{
            console.log(error);
        })
    }
}

export const updateUser = (user, id) => {
    return function (dispatch){
        axios
        .put(`${process.env.REACT_APP_API}/${id}`, user)
        .then((response) =>{
            console.log('resp', response);
            dispatch(userUpdated())
        })
        .catch((error) =>{
            console.log(error);
        })
    }
}