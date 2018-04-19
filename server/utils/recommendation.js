import _ from "lodash";
const point = 0.2;
const getSameScore = (a,b) => {
    const sum = _.union(a, b);
    if (sum.length === 0) {
        return 0;
    }
    const intersectionResult = _.intersection(a, b);
    return intersectionResult.length / sum.length;
};
export default getSameScore;