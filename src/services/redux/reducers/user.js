import {
    SAVE_USER
} from "./../actions/types.js";

export function userReducer (user = [], action) {
    const { type, payload } = action; 

    switch (type) {
        case SAVE_USER:
            return payload;
        default:
            return user;
    }
};