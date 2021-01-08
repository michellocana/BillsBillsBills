module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: process.env.DOT_ENV_FILE ? `.env.${process.env.DOT_ENV_FILE}` : '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true
      }
    ]
  ]
}
