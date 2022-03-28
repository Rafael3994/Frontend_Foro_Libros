import {
    SAVE_USER_IS_ADMIN,
    REMOVE_USER_IS_ADMIN,
} from "./types";

export const saveIsAdmin = (isAdmin) => {
    return {
        type: SAVE_USER_IS_ADMIN,
        payload: {isAdmin: isAdmin},
    };
};

export const removeIsAdmin = () => {
    return {
        type: REMOVE_USER_IS_ADMIN
    };
};