const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    // 指定加载规则
    rules: [
      {
        test: /\.ts$/,// test指定规则生效的文件,以ts结尾的文件
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "58",
                      "ie": "11"
                    },
                    // corejs版本
                    "corejs": "3",
                    // 使用corejs的方式，按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          // 如果使用typescript的loader，要把ts-lodaer放下方，babel-loader放上方
          // webpack从后往前执行，所以必须要先执行ts -> Js转换，再执行js兼容性的转换
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      // 对less的处理
      {

        test: /\.less$/,// test指定规则生效的文件,以less结尾的文件
        use: [
          // 从下往上执行
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env",
                  {
                    // 兼容主流浏览器两个最新版本
                    browsers: "last 2 versions"
                  }
                ]
              }
            }
          },
          "less-loader"
        ]
      },
      // 对图片url-loader的处理
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          // 'file-loader',
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  // 用来设置模块，只要js、ts结尾都可以作为模块来使用
  resolve: {
    extensions: ['.ts', '.js']
  }
}