// //isUrlValid
// const isValidUrl = (longUrl) => {
//     const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]{3,})$/.test(longUrl)
//     return regex
// }

//isUrlValid
const isValidUrl = (longUrl) => {
    const regex = /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(longUrl)
    return regex
}

//isValidBody
const isValidBody = (data) => {
    if (Object.keys(data).length > 0)
        return true
    return false
};

module.exports = { isValidUrl, isValidBody };