const pictureReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_PICTURE":
            return {
                picObj: {
                    pic: action.payload.pic,
                },
            };
        case "RESET_PICTURE":
            return {
                picObj: {
                    pic: {},
                },
            };
        default:
            return state;
    }
};

export default pictureReducer;
