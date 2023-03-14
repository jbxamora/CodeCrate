// Import required modules
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Generates an HTML file with script tags automatically
const WebpackPwaManifest = require("webpack-pwa-manifest"); // Generates a manifest file for Progressive Web Apps
const path = require("path"); // A utility module for working with file and directory paths
const { InjectManifest } = require("workbox-webpack-plugin"); // Generates a service worker file for caching assets

// Export a function that returns the webpack configuration
module.exports = () => {
  return {
    mode: "development", // Sets the mode to development
    entry: { // Specifies entry points for the application
      main: "./src/js/index.js", // The main entry point
      install: "./src/js/install.js", // The entry point for the install page
    },
    output: { // Specifies where the bundled code should be outputted
      filename: "[name].bundle.js", // The name of the output file
      path: path.resolve(__dirname, "dist"), // The directory where the output file should be placed
    },
    devServer: {
      hot: "only", // Enables hot module replacement for the webpack-dev-server
    },
    plugins: [ // An array of plugins to use for the build process
      new HtmlWebpackPlugin({ // Generates an HTML file with script tags automatically
        template: "./index.html", // The template file to use for generating the HTML
        title: "JATE", // The title of the generated HTML file
      }),
      new WebpackPwaManifest({ // Generates a manifest file for Progressive Web Apps
        name: "JATE", // The name of the app
        short_name: "JATE", // A short name for the app
        description: "Just Another Text Editor!", // A description of the app
        background_color: "#225ca3", // The background color of the app
        theme_color: "#225ca3", // The color theme of the app
        icons: [ // An array of icon objects
          {
            src: path.resolve("src/images/logo.png"), // The path to the icon file
            sizes: [96, 128, 192, 256, 384, 512], // The sizes of the icon file to generate
            destination: path.join("assets", "icons"), // The directory to output the icon files
          },
        ],
      }),
      new InjectManifest({ // Generates a service worker file for caching assets
        swSrc: "./src-sw.js", // The path to the service worker source file
        swDest: "src-sw.js", // The name of the output service worker file
      }),
    ],
    module: { // Specifies how to handle different types of modules
      rules: [
        {
          test: /\.css$/i, // A regular expression that matches CSS files
          use: ["style-loader", "css-loader"], // The loaders to use for processing the matched files
        },
      ],
    },
  };
};
