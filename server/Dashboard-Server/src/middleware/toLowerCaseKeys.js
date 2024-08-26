toLowerCaseKeys = (input) => {
    if (typeof input !== 'object') return input;
    if (Array.isArray(input)) return input.map(toLowerCaseKeys);
    return Object.keys(input).reduce(function (newObj, key) {
        let val = input[key];
        let newVal = (typeof val === 'object') && val !== null ? toLowerCaseKeys(val) : val;
        newObj[key.toLowerCase()] = newVal;
        return newObj;
    }, {});
}
module.exports.toLowerCaseKeys = toLowerCaseKeys;