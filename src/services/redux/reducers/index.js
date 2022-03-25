import { combineReducers } from "redux";
import { librosReducer } from "./libros";
import { userReducer } from "./user";

export default combineReducers({
    libros: librosReducer,
    user: userReducer
});
