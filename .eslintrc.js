module.exports = {
    "parser": "babel-eslint",
    "extends": "standard",
    // "plugins": [
    //     "flowtype"
    // ],
    rules: {
      'semi': 'always',
      'no-return-await': 0,
      'space-before-function-paren': ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }]
    }
}
