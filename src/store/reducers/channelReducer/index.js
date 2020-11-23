const { default: produce } = require("immer");
const { SET_CURRENT_CHANNEL } = require("../../actionTypes");

const initialState = {
    currentChannel: null,
};

function reducer(state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SET_CURRENT_CHANNEL:
                draft.currentChannel = action.payload.channel;
                break;

            default:
                break;
        }
    });
}

export default reducer;
