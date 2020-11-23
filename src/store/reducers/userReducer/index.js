import produce from "immer";
import { CLEAR_USER, SET_USER } from "../../actionTypes";

const initialState = {
    user: null,
    isLoading: true,
};

export default function reducer(state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SET_USER:
                draft.user = action.payload.user;
                draft.isLoading = false;
                break;
            case CLEAR_USER:
                draft.isLoading = false;
                break;
            default:
                break;
        }
    });
}
