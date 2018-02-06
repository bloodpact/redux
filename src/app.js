"use strict"

import  React from 'react';
import  {render} from 'react-dom';
import {Provider} from 'react-redux';

import {Router, Route, IndexRoute, browserHistory} from'react-router';

import{applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import reducers from './reducers/index';
import  Booklist from './components/pages/bookslist';
import  Cart from './components/pages/cart';
import  BooksForm from './components/pages/booksForm';
import Main from './main'



//1 create store
const middlware = applyMiddleware(logger);

const store = createStore(reducers ,middlware);
const Routes =(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Booklist}/>
                <Route path="/admin" component={BooksForm}/>
                <Route path="/cart"    component={Cart}/>
            </Route>
        </Router>
    </Provider>
);

// store.subscribe(function () {
//     console.log('current state is: ',  store.getState());
//     // console.log('current title is: ',  store.getState()[1].title);
// });

render (
    Routes, document.getElementById('app')
);

// 2 create and dispatch actions
// Booklist
//dispatch second
// store.dispatch({
//     type:"POST_BOOK",
//     payload:
//     [{
//             id: 3,
//             title: 'book title 3',
//             description: 'this is the book description 3',
//             price :313.1
//         }]
//     });

// delete
// store.dispatch(deleteBooks(
//     {id:1}
// ));

//update
// store.dispatch(updateBooks(
//     {id:2,
//     title:'new title 2'}
// ));

//CART ACTIONS
// adding
// store.dispatch(addToCart([{id:1}]));
