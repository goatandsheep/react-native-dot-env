# babel-plugin-dotenv

Loads environment variables from a .env file through `import` statement.

## Installation

```sh
$ npm install babel-plugin-dotenv
```

## Usage

**.babelrc**

```json
{
  "plugins": [["babel-plugin-dotenv", {
      "replacedModuleName": "babel-dotenv"
   }]]
}
```

**.env**

```
DB_HOST=localhost
DB_USER=root
DB_PASS=$SECRET_KEY_FROM_SYSTEM_ENV
```

In **whatever.js**

```js
import { DB_HOST, DB_USER, DB_PASS } from "babel-dotenv"
db.connect({
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS
});
```

## Troubleshooting

- Make sure the required system environment variables are properly exported in your build system / dev machine