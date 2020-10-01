import { defaultStyles, defaultTitle } from "@/constants";
import { storage } from "@core/utils";

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {}, // {"0:1":"qwer"}
    stylesState: {},
    currentText: "",
    currentStyles: defaultStyles,
    titleState: defaultTitle
};

const normalize = state => {
    return {
        ...state,
        currentStyles: defaultStyles,
        currentText: ""
    };
};
export const initialState = storage("state") ? normalize(storage("state")) : defaultState;