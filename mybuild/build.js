/* eslint-disable strict */
const rollup = require('rollup');
const babel = require('@rollup/plugin-babel').babel;
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const replace = require('@rollup/plugin-replace');
const useForks = require('./use-forks-plugin');
const path = require('path');
const {_forks} = require('./forks');

let getRollupInteropValue = id => {
  // We're setting Rollup to assume that imports are ES modules unless otherwise specified.
  // However, we also compile ES import syntax to `require()` using Babel.
  // This causes Rollup to turn uses of `import SomeDefaultImport from 'some-module' into
  // references to `SomeDefaultImport.default` due to CJS/ESM interop.
  // Some CJS modules don't have a `.default` export, and the rewritten import is incorrect.
  // Specifying `interop: 'default'` instead will have Rollup use the imported variable as-is,
  // without adding a `.default` to the reference.
  const modulesWithCommonJsExports = [
    'art/core/transform',
    'art/modes/current',
    'art/modes/fast-noSideEffects',
    'art/modes/svg',
    'JSResourceReferenceImpl',
    'error-stack-parser',
    'neo-async',
    'webpack/lib/dependencies/ModuleDependency',
    'webpack/lib/dependencies/NullDependency',
    'webpack/lib/Template',
  ];

  if (modulesWithCommonJsExports.includes(id)) {
    return 'default';
  }

  // For all other modules, handle imports without any import helper utils
  return 'esModule';
};

const pureExternalModules = [
  'fs',
  'fs/promises',
  'path',
  'stream',
  'prop-types/checkPropTypes',
  'react-native/Libraries/ReactPrivate/ReactNativePrivateInterface',
  'scheduler',
  'react',
  'react-dom/server',
  'react/jsx-dev-runtime',
  'react-dom',
  'url',
  'ReactNativeInternalFeatureFlags',
  'webpack-sources/lib/helpers/createMappingsSerializer.js',
  'webpack-sources/lib/helpers/readMappings.js',
];

async function build({entry, output, name, format}) {
  const forks = _forks[name];

  /**
   * @type {import('rollup').rollupConfig}
   */
  const rollupConfig = {
    shimMissingExports: true,
    input: entry,
    treeshake: {
      moduleSideEffects: (id, external) =>
        !(external && pureExternalModules.includes(id)),
      propertyReadSideEffects: false,
    },
    external(id) {
      if (id === 'react') {
        return true;
      }

      if (name === 'ReactDOMClient' && id === 'react-dom') {
        return true;
      }

      return false;
    },
    plugins: [
      useForks(forks),
      resolve(),
      babel({
        babelrc: false,
        configFile: false,
        presets: [
          [
            '@babel/flow',
            {
              allowDeclareFields: true,
            },
          ],
        ],
        plugins: ['babel-plugin-syntax-hermes-parser'],
        babelHelpers: 'bundled',
      }),
      replace({
        preventAssignment: true,
        values: {
          __DEV__: false ? 'false' : 'true',
          __PROFILE__: false ? 'true' : 'false',
          'process.env.NODE_ENV': "'production'",
          __EXPERIMENTAL__: 'false',
        },
      }),
    ],
    output: {
      externalLiveBindings: false,
      freeze: false,
      interop: getRollupInteropValue,
      esModule: false,
    },
  };

  const rollupOutputOptions = {
    file: output,
    format,
    globals: {
      react: 'React',
    },
    freeze: false,
    interop: getRollupInteropValue,
    name,
    sourcemap: true,
    esModule: format === 'esm',
    exports: 'auto',
    generatedCode: 'es2015'
  };

  const result = await rollup.rollup(rollupConfig);
  await result.write(rollupOutputOptions);

  // eslint-disable-next-line react-internal/no-production-logging
  console.log('打包成功');
}

build({
  entry: path.join(__dirname, '../packages/react/index.js'),
  output: path.join(__dirname, '../dist/react.production.js'),
  name: 'React',
  format: 'umd',
});

build({
  entry: path.join(__dirname, './umd/react-dom.js'),
  output: path.join(__dirname, '../dist/react-dom.production.js'),
  name: 'ReactDOM',
  format: 'umd'
});

build({
  entry: path.join(__dirname, './esm/react.js'),
  output: path.join(__dirname, '../dist/react.esm.js'),
  name: 'React',
  format: 'esm',
});

build({
  entry: path.join(__dirname, './esm/react-dom.js'),
  output: path.join(__dirname, '../dist/react-dom.esm.js'),
  name: 'ReactDOM',
  format: 'esm',
});

build({
  entry: path.join(__dirname, './esm/react-dom-client.js'),
  output: path.join(__dirname, '../dist/react-dom-client.esm.js'),
  name: 'ReactDOMClient',
  format: 'esm',
});
