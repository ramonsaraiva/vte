/*
 * common.js
 * funcoes basicas e comuns
 *
 */

function is_empty(obj)
{
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    if (obj === null)
        return true;

    if (obj.length > 0)
        return false;
    if (obj.length === 0)
        return true;

    for (var key in obj)
    {
        if(hasOwnProperty.call(obj, key))
            return false;
    }

    return true;
}

function type_of(obj)
{
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

module.exports =
{
    is_empty: is_empty,
    type_of: type_of
};