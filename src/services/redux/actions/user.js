import {
    SAVE_USER,
    DELETE_USER
} from "./types";

export const saveUser = (user) => {
    return {
        type: SAVE_USER,
        payload: user,
    };
};

export const deleteUser = () => {
    return {
        type: DELETE_USER,
    };
};