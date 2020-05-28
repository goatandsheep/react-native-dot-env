# rn-dotenv

# NOTE: [npm babel-plugin-dotenv-import](https://github.com/tusbar/babel-plugin-dotenv-import) is the new rewrite location

Let you `import` environment variables from a **.env** file in React Native, **don't** need any native code integration. This is the maintained fork of the abandoned repository. 

[![CircleCI](https://circleci.com/gh/goatandsheep/rn-dotenv.svg?style=svg)](https://circleci.com/gh/goatandsheep/rn-dotenv)
[![npm version](https://img.shields.io/npm/v/rn-dotenv.svg?style=flat-square)](https://www.npmjs.com/package/rn-dotenv)
[![npm downloads](https://img.shields.io/npm/dt/rn-dotenv.svg?style=flat-square)](https://www.npmjs.com/package/rn-dotenv)

## Install

```sh
$ npm install rn-dotenv --save-dev
```

Add the `rn-dotenv` preset to your **.babelrc** file at the project root.

```json
{
  "presets": ["module:metro-react-native-babel-preset", "module:rn-dotenv"]
}
```

If you haven't got **.babelrc** set up for React Native, remember to install `metro-react-native-babel-preset` first.

```sh
$ npm install metro-react-native-babel-preset --save-dev
```

You may have to reset cache before this works:

```sh
$ npm start -- --reset-cache
$ yarn start --reset-cache
$ npx react-native start --reset-cache
```

## Usage

Add your app configuration in an **.env** file.

```
API_KEY=lorem
ANOTHER_CONFIG=foobar
```

Now you can import it in your **.js** file.

```js
import { API_KEY, ANOTHER_CONFIG } from 'rn-dotenv'

ApiClient.init(API_KEY, ANOTHER_CONFIG)
```

### Typescript
If you're using this in a Typescript react native project, Typescript will complain that the named import does not exist in the package.

Here's a solution to solve the problem.

Steps
1. Create a file `env.d.ts` (The filename doesn't matter, as long it ends with `.d.ts`)
2. In the file write the following (for this example, I'll use `API_KEY` as the environment variable)
```ts
declare module 'react-native-dotenv' {
  /**
   * API key
   */
  export const API_KEY: string;
}

```
3. Now import the enviornment variable and your good to go. Ex: ` import { API_KEY } from 'react-native-dotenv'`

Solution provided by https://github.com/zetachang/react-native-dotenv/issues/76#issuecomment-585171009

## How does it work?

As you can see, it's implemented as a babel plugin. All referenced imported members are replaced as the values specified in the **.env** file.

The example above will get compiled as below.

```js

ApiClient.init('lorem', 'foobar')
```

## FAQ

### Changes to .env file is not updated

Manually edit the file importing `rn-dotenv` by either adding an empty line or whitespace will work.

### Can I use different **.env** settings for production ?

Yes, simply create a separate **.env.production** file and the default release process of react-native will pickup the right config.

#### iOS

You can use the **Release** configuration to launch the Simulator. (Only supported in RN v0.39+)

```
react-native run-ios --configuration Release
```
#### Android

1. `Command⌘` + `M` to launch the developer menu in Android emulator.
2. Tap **DevSettings**.
3. Toggle **JS Dev Mode**.

### Can I have more than `production` & `development` environment configs?

Sadly, it's not available so far. One of the workaround is generating **.env** file before triggering RN's bundle script automatically using either shell script or your own custom build pipeline.

### How do I use this with Continuous Integration?

When using a CI tool you will have to write the environment variables to the `.env` file. In Github Actions you may for example add a line like `echo -e "${{ secrets.DOTENV }}" > .env`.

## Contact

[Kemal Ahmed](http://github.com/goatandsheep)

## LICENSE

MIT License, see LICENSE file for detail.
