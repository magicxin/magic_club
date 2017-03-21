module.exports = {
    valid_email : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    valid_password : /^[a-zA-Z]\w{5,17}$/,
    valid_phone : /^1\d{10}$/,
}