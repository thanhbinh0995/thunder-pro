import {
    DRAWER_TYPE,
    TOGGLE_COLLAPSED_NAV,
    WINDOW_WIDTH
} from '../constants/sideNav.constants';

export function toggleCollapsedNav(isNavCollapsed) {
    return {type: TOGGLE_COLLAPSED_NAV, isNavCollapsed};
}

export function setDrawerType(drawerType) {
    return {type: DRAWER_TYPE, drawerType};
}

export function updateWindowWidth(width) {
    return {type: WINDOW_WIDTH, width};
}