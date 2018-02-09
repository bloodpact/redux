import axios from 'axios';
//get a book
export function getBooks() {
    return function (dispatch) {
        axios.get("/books")
            .then(function (response) {
            dispatch({type:"GET_BOOKS", payload:response.data})
        })
            .catch(function (err) {
                dispatch({"GET_BOOKS_REJECTED", payload:err})
            })
    }
}//post a book
export function postBooks(book) {
   return function (dispatch) {
       axios.post("/books", book)
           .then(function (response) {
               dispatch({type:"POST_BOOK", payload: response.data})
           })
           .catch(function (err) {
               dispatch({type:"POST_BOOK_REJECTED",payload:"error here while posting new book"})
           })
       
   }
    
    // return {
    //     type:"POST_BOOK",
    //     payload: book
    // }
}
//delete
export function deleteBooks(id) {
  return  {
      type:"DELETE_BOOK",
      payload:  id
    }
}
//update
export function updateBooks(book) {
    return {
        type:"UPDATE_BOOK",
        payload:book
    }
}