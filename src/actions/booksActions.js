//get a book
export function getBooks() {
    return {
        type:"GET_BOOKS"
    }
}//post a book
export function postBooks(book) {
    return {
        type:"POST_BOOK",
        payload: book
    }
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