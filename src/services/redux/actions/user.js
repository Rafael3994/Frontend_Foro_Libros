import {
    SAVE_USER,
} from "./types";

export const saveUser = (user) => {
    return {
        type: SAVE_USER,
        payload: user,
    };
};