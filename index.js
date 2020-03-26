var path = require("path");

module.exports = () => ({
  plugins: [
    [
      require("babel-plugin-dotenv-milkywire"),
      {
        replacedModuleName: "react-native-dotenv-milkywire",
        configDir: path.resolve(__dirname, "../../")
      }
    ]
  ]
});
