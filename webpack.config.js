/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => {
  dotenv.config({ path: './.env' }).parsed;

  return {
    mode: 'development',
    optimization: {
      splitChunks: {
        name: 'vendor',
        chunks: 'all',
      },
      minimize: true,
      minimizer:
        process.env.NODE_ENV === 'production'
          ? [
              new OptimizeCssAssetsPlugin(),
              new TerserPlugin({
                parallel: true,
                terserOptions: {
                  compress: {
                    drop_console: true,
                  },
                },
              }),
            ]
          : [],
    },
    entry: {
      main: './src/index',
    },

    resolve: {
      fallback: {
        fs: false,
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@molecules': path.resolve(__dirname, 'src/molecules'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash:8].js',
      chunkFilename: '[id].[hash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [{ loader: 'file-loader' }],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
      port: 8000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: {
          collapseWhitespace: true,
          useShortDoctype: true,
        },
      }),
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
      }),

      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),

      /*
        new BundleAnalyzerPlugin({
            analyzerMode: 'static', // 분석결과를 파일로 저장
            reportFilename: 'docs/size_dev.html', // 분설결과 파일을 저장할 경로와 파일명 지정
            defaultSizes: 'parsed',
            openAnalyzer: true, // 웹팩 빌드 후 보고서파일을 자동으로 열지 여부
            generateStatsFile: true, // 웹팩 stats.json 파일 자동생성
            statsFilename: 'docs/stats_dev.json', // stats.json 파일명 rename
          })
      */
    ],
  };
};
