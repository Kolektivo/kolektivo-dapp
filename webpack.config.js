/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const cssLoader = 'css-loader';

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      includePaths: ['node_modules'],
    },
  },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: ['autoprefixer'],
    },
  },
};

module.exports = function (env, { analyze }) {
  const production = env.production || process.env.NODE_ENV === 'production';
  return {
    target: 'web',
    mode: production ? 'production' : 'development',
    devtool: production ? undefined : 'inline-source-map',
    entry: {
      entry: './src/main.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: production ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dev-app'), 'node_modules'],
      alias: production
        ? {
            // add your production aliasing here
          }
        : {
            ...['fetch-client', 'kernel', 'metadata', 'platform', 'platform-browser', 'plugin-conventions', 'route-recognizer', 'router', 'router-lite', 'runtime', 'runtime-html', 'testing', 'webpack-loader'].reduce(
              (map, pkg) => {
                const name = `@aurelia/${pkg}`;
                map[name] = path.resolve(__dirname, 'node_modules', name, 'dist/esm/index.dev.mjs');
                return map;
              },
              {
                aurelia: path.resolve(__dirname, 'node_modules/aurelia/dist/esm/index.dev.mjs'),
                // add your development aliasing here
              }
            ),
          },
      fallback: {
        // this is needed for packages that use native nodejs modules like 'fs', 'os', etc.
        fs: false,
        tls: false,
        os: false,
        assert: false,
        url: false,
        net: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        stream: false,
        util: false,
        crypto: false,
      },
    },
    devServer: {
      historyApiFallback: true,
      open: !process.env.CI,
      port: 9000
    },
    module: {
      rules: [
        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset' },
        { test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, type: 'asset/resource' },
        {
          test: /\.scss$/i,
          // For style loaded in src/main.js, it's not loaded by style-loader.
          // It's for shared styles for shadow-dom only.
          issuer: /[/\\]src[/\\]app-container\.(js|ts)$/,
          use: [cssLoader, postcssLoader, sassLoader],
        },
        {
          test: /\.scss$/i,
          issuer: /design-system/,
          use: [cssLoader, postcssLoader, sassLoader],
        },
        {
          test: /\.scss$/i,
          // For style loaded in other js/ts files, it's loaded by style-loader.
          // They are directly injected to HTML head.
          issuer:{
             not:/design-system|[/\\]src[/\\]app-container\.(js|ts)$/,
          },
          use: ['style-loader', cssLoader, postcssLoader, sassLoader],
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        { test: /\.ts$/i, use: ['ts-loader'], exclude: /node_modules/ },        
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.html' }),
      new Dotenv({
        path: `./.env${production ? '' : '.' + (process.env.NODE_ENV || 'development')}`,
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
      analyze && new BundleAnalyzerPlugin(),
      new webpack.EnvironmentPlugin(process.env),
    ].filter(p => p),
  };
};
