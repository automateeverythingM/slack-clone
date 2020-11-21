import produce from "immer";
import { SET_USER } from "../../actionTypes";

const initialState = {
    user: null,
    isLoading: true,
};

export const userReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case SET_USER:
                draft.user = action.payload.user;
                draft.isLoading = false;
                break;
            default:
                break;
        }
    });
};
