'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_MAP_KEY: '"12858cbda86417e57f08ef248fecff4e"'
})
