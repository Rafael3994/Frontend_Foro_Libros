import { combineReducers } from "redux";
import { librosReducer } from "./libros";
import { userReducer } from "./user";
import { sessionReducer } from "./session";

export default combineReducers({
    libros: librosReducer,
    user: userReducer,
    session: sessionReducer
});
