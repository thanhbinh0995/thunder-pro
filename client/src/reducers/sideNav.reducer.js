import {
    DRAWER_TYPE,
    TOGGLE_COLLAPSED_NAV,
    WINDOW_WIDTH,
    FIXED_DRAWER
} from '../constants/sideNav.constants';

const settings = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_COLLAPSED_NAV:
            return {
                ...state,
                navCollapsed: action.isNavCollapsed
            };
        case DRAWER_TYPE:
            return {
                ...state,
                drawerType: action.drawerType
            };
        case WINDOW_WIDTH:
            return {
                ...state,
                width: action.width
            };

        default:
            return state;
    }
};

export default settings;