//books reducers
"use strict";
export function booksReducers(state ={
    books:[]
}, action) {
    switch (action.type){
        case "GET_BOOKS":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {...state, books:[...action.payload]};
            break;
        case "POST_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {books:[...state.books, ...action.payload]};
            break;
        case "DELETE_BOOK":
            const currentBookToDelete = [...state.books];
            const indexBookToDelete = currentBookToDelete.findIndex(
                function (book) {
                    return book._id == action.payload;
                }
            );
            return{books: [...currentBookToDelete.slice(0,indexBookToDelete),
                ...currentBookToDelete.slice(indexBookToDelete + 1)]};
            break;
        case "UPDATE_BOOK":
            const currentBookToUpdate = [...state.books];
            const indexBookToUpdate = currentBookToUpdate.findIndex(
                function (book) {
                    return book._id === action.payload._id;
                }
            );
            const newBookUpdate = {
                ...currentBookToUpdate[indexBookToUpdate],
                title: action.payload.title
            };
            console.log("what is it newBookUpdate", newBookUpdate);
            return{books: [...currentBookToUpdate.slice(0, currentBookToUpdate),
                newBookUpdate,
                ...currentBookToUpdate.slice(currentBookToUpdate + 1)]};
            break
    }
    return state
}