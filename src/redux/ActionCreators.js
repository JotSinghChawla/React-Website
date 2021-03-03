import * as ActionTypes from './ActionTypes'
import { baseURL } from '../shared/baseURL'

export const addComment = ( comment ) => ({
        type: ActionTypes.ADD_COMMENT,
        payload: comment
})

export const postComment = ( dishId, rating, author, comment ) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating, 
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString()

    return fetch( baseURL + 'comments', {
        method: 'POST',
        body: JSON.stringify( newComment ),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then( response => {
        if( response.ok ) {
            return response
        }
        else {
            var error = new Error( 'Error ' + response.status + ': ' + response.statusText )
            error.response = response
            throw error
        }
    }, error => {
    //    var errMess = new Error( error.message )
    //    throw errMess 
        throw error
    })
    .then( response => response.json() )
    .then( response => dispatch( addComment( response ) ) )
    .catch( error => { 
        console.log( 'POST COMMENTS: ', error.message )
        alert( 'Your comment is not posted\nError: ',error.message )
    } )
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true))

    return fetch(baseURL + 'dishes')
        .then( response => {
            if( response.ok ) {
                return response
            }
            else {
                var error = new Error( 'Error ' + response.status + ': ' + response.statusText )
                error.response = response
                throw error
            }
        }, error => {
           var errMess = new Error( error.message )
           throw errMess 
        })
        .then( response => response.json() )
        .then( dishes => dispatch( addDishes(dishes) ) )
        .catch( error => dispatch( dishesFailed(error.message) ) )
    // setTimeout( () => {
    //     dispatch(addDishes(DISHES))
    // }, 2000 )
}

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errorMessage) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errorMessage
})

export const fetchComments = () => (dispatch) => {
    return fetch( baseURL + 'comments' )
        .then( response => {
            if( response.ok ) {
                return response
            }
            else {
                var error = new Error( 'Error '+ response.status + ': ' + response.statusText )
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error( error.message )
            throw errMess
        })
        .then( response => response.json() )
        .then( comments => dispatch(addComments(comments) ))
        .catch( error => { dispatch( commentsFailed( error.message  ) ) } )
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const commentsFailed = (errorMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errorMessage
})


export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true))

    return fetch(baseURL + 'promotions')
        .then( response => {
            if( response.ok ) {
                return response
            }
            else {
                var error = new Error( 'Error '+ response.status + ': ' + response.statusText )
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error( error.message )
            throw errMess
        })
        .then( response => response.json() )
        .then( promotions => dispatch( addPromos(promotions) ) )
        .catch( error => dispatch( promosFailed(error.message) ) )
}

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errorMessage) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errorMessage
})

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = ( errorMessage ) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errorMessage
})

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true))

    return fetch( baseURL + 'leaders')
        .then( response => {
            if( response.ok ) {
                return response
            }
            else {
                var error = new Error( 'Error ' + response.status + ': ' + response.statusText )
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error( error.message )
            throw errMess
        })
        .then( response => response.json() )
        .then( leaders => dispatch( addLeaders(leaders) ) )
        .catch( error => dispatch( leadersFailed(error) ) )
}

export const postFeedback = ( firstname, lastname, email, telnum, 
                            agree, contactType ,message) => () => {
                const newFeedback = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    telnum: telnum,
                    agree: agree,
                    contactType: contactType,
                    message: message
                }

        return fetch( baseURL + 'feedback' , {
            method: 'POST',
            body: JSON.stringify( newFeedback ),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then( response => {
            if(response.ok)
                return response
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText )
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error( error.message )
            throw errMess
        })
        .then( response => response.json() )
        .then( response => { 
            console.log('Current State is: ' , response)
            alert('Thank you for your feedback!\n' + JSON.stringify(response) ) 
        })
        .catch( error => {
            console.log( 'POST FEEDBACK: ', error.message )
            alert( 'Your Feedback is not posted\nError: ',error.message )
        })
}