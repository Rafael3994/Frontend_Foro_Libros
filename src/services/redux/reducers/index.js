import { combineReducers } from "redux";
// import { errorReducer } from "./errors";
// import rentalsReducer from "./pedidos";
import { librosReducer } from "./libros";

export default combineReducers({
    libros: librosReducer
});
