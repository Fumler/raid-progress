const fetch = require("isomorphic-unfetch")

const fetchAsync = async url => await (await fetch(url)).json()

module.exports = fetchAsync
