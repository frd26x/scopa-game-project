// var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // 1
  entry: ["@babel/polyfill", './src/state.js'],

  module: {
    rules: [
    //   { 
    //     test: /\.(png|jpg)$/,
    //     include: path.join(__dirname, 'assets/img'),
    //     loader: 'file-loader' 
    //  },
    {
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        'sass-loader',
      ],
    },
      
        // {
        //   test: /\.(png|jpg)$/,
        //   loader: 'url-loader'
        // },
        {
          test: /\.(png|jpg)$/,
          loader: 'file-loader'
        },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  // 2
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  // 3
  devServer: {
    contentBase: './dist'
  }
};