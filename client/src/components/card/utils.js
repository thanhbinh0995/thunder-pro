import {SERVER_URL} from "../../constants"

export const translate3d = (x, y) => {
    const translate = `translate3d(${x}px, ${y}px, 0px)`;
    return {
        msTransform: translate,
        WebkitTransform: translate,
        transform: translate
    }
};

export const getBackgroundImage = (link) => {
    return {
        background: `url(${SERVER_URL + link}) no-repeat fixed`
    }
};
export const DIRECTIONS = ['Right', 'Left', 'Top', 'Bottom'];
