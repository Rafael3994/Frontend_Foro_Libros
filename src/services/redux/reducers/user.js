import {
    SAVE_USER,
    DELETE_USER
} from "./../actions/types.js";

export function userReducer(user = [], action) {
    const { type, payload } = action;

    switch (type) {
        case SAVE_USER:
            return payload;
        case DELETE_USER:
            return [];
        default:
            return user;
    }
};