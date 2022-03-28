import {
    SAVE_USER_IS_ADMIN,
    REMOVE_USER_IS_ADMIN
} from "./../actions/types.js";

export function sessionReducer(session = [], action) {
    const { type, payload } = action;

    switch (type) {
        case SAVE_USER_IS_ADMIN:
            return { ...session }, payload;
        case REMOVE_USER_IS_ADMIN:
            return  { ...session }, {isAdmin: ""}
        default:
            return session;
    }
};