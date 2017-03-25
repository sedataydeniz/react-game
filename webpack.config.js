var path = require('path')
var webpack = require('webpack');
module.exports = {
    entry: "./js/App.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.js$/, loader: "babel-loader"}
        ]
    },
	devServer: {
		contentBase: path.join(__dirname,''),
		inline: true
	},
    plugins: [
     new webpack.LoaderOptionsPlugin({
       debug: true
     })
    ]

};

/*
	DEV SERVER COMMAND
	command : webpack-dev-server --progress --colors
*/