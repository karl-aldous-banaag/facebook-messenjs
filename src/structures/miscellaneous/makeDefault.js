/**
 * 
 * @param {*} customValue - value that was specified
 * @param {*} defaultValue - value to be put in variable if no value was specified
 * @param {Function} valueClass - type of value
 */
const makeDefault = (customValue, defaultValue, valueClass = null) => {
    return customValue === undefined || customValue === null ? defaultValue : customValue
}

module.exports = makeDefault;