import { APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE } from "./types";

export function rootReducer(state, action) {
    let prevState;
    let field;
    let val;
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.result?.type + "State";
            prevState = state[field] || {};
            return { ...state, [field]: { ...prevState, ...action.result } }; // id, value
        // case COL_RESIZE:
        //     prevState = state.colState || {};
        //     return { ...state, colState: { ...prevState, ...action.result } };
        // case ROW_RESIZE:
        //     prevState = state.rowState || {};
        //     return { ...state, rowState: { ...prevState, ...action.result } };
        case CHANGE_TEXT:
            field = "dataState";
            // prevState = state["dataState"] || {};
            // prevState[action.data.id] = action.data.value;
            return { ...state, currentText: action.data.value, dataState: value(state, field, action) };
        case CHANGE_STYLES:
            return { ...state, currentStyles: action.data };
        case APPLY_STYLE:
            field = "stylesState";
            val = state[field] || {};
            action.data.ids.forEach(id => {
                val[id] = { ...val[id], ...action.data.value };
                // console.log(val[id]);
                // val[id] = val[id] + "; " + toInlineStyles(action.data.value);
            });
            return { ...state, [field]: val, currentStyles: { ...state.currentStyles, ...action.data.value } };
        case CHANGE_TITLE:
            console.log(action.type);
            field = "titleState";
            return { ...state, [field]: action.data };
        default: return state;
    }
}

function value(state, field, action) {
    const val = state[field] || {};
    val[action.data.id] = action.data.value;
    return val;
}