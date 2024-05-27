const moment = require('moment')

const { customAlphabet } = require('nanoid')

exports.getId = () => customAlphabet ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 36)()

exports.saveSettings = (settings) => localStorage.setItem('OCPPSettings', JSON.stringify(settings))

exports.OCPPDate = (date) => moment(date).format('YYYY-MM-DDTHH:mm:ss').toString() + 'Z'
