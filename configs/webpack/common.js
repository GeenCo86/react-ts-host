// shared config (dev and prod)
const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
    entry: "./index.tsx",
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    context: resolve(__dirname, "../../src"),
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.tsx?$/],
                use: ["babel-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(scss|sass)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({template: "index.html.ejs"}),
        new ModuleFederationPlugin({
            name: "appHost",
            remotes: {
                app1: "app1@http://localhost:3001/remoteEntry.js",
            },
            shared: {
                react: {singleton: true, eager: true, requiredVersion: "^18.2.0"},
                "react-dom": {
                    singleton: true,
                    eager: true,
                    requiredVersion: "^18.2.0",
                },
                "react-router-dom": {
                    singleton: true,
                    eager: true,
                    requiredVersion: "^18.2.0",
                },
            },
        }),
    ],
};
