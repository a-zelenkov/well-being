import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack, { DefinePlugin } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export type BuildMode = "production" | "development";

export interface BuildPaths {
	entry: string;
	build: string;
	html: string;
	src: string;
}

export interface BuildEnv {
	port: number;
	mode: BuildMode;
}

export interface BuildOptions {
	mode: BuildMode;
	paths: BuildPaths;
	isDev: boolean;
	port: number;
}

export default (env: BuildEnv) => {
	const entryPath = path.resolve(__dirname, "src", "index.tsx");
	const buildPath = path.resolve(__dirname, "build");
	const htmlPath = path.resolve(__dirname, "public", "index.html");
	const srcPath = path.resolve(__dirname, "src");

	const paths: BuildPaths = {
		entry: entryPath,
		build: buildPath,
		html: htmlPath,
		src: srcPath,
	};

	const mode = env.mode || "development";
	const isDev = mode === "development";
	const port = env.port || 3000;

	const options: BuildOptions = {
		paths,
		mode,
		isDev,
		port,
	};

	const config = buildWebpackConfig(options);

	return config;
};

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
	const { paths, mode, isDev } = options;

	return {
		mode,
		entry: paths.entry,
		cache: !isDev,
		output: {
			filename: "[name][contenthash].js",
			path: paths.build,
			clean: true,
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolve(options),
		devtool: isDev ? "inline-source-map" : undefined,
		devServer: isDev ? buildDevServer(options) : undefined,
	};
}

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
	const stylesLoader = {
		test: /\.(sa|sc|c)ss$/i,
		use: [
			options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			{
				loader: "css-loader",
				options: {
					modules: {
						auto: (resPath: string) => Boolean(resPath.includes(".m.")),
						localIdentName: options.isDev ? "[name].[local]--[hash:base64:8]" : "[hash:base64:8]",
					},
				},
			},
			"sass-loader",
		],
	};

	const scriptsLoader = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
				presets: [
					"@babel/preset-env",
					[
						"@babel/preset-typescript",
						{
							isTSX: true,
							allExtensions: true,
						},
					],
					["@babel/preset-react", { runtime: "automatic" }],
				],
			},
		},
	};

	const svgImageLoader = {
		test: /\.svg$/i,
		type: "asset",
		resourceQuery: /url/, // *.svg?url
	};
	const svgReactComponentsLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
		use: ["@svgr/webpack"],
	};

	const filesLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: "asset/resource",
	};

	return [scriptsLoader, stylesLoader, svgImageLoader, svgReactComponentsLoader, filesLoader];
}

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
	const { paths } = options;
	return [
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
			chunkFilename: "css/[name].[contenthash:8].css",
		}),
		new DefinePlugin({
			__IS_DEV__: JSON.stringify(options.isDev),
		}),
	];
}

export function buildResolve({ paths }: BuildOptions): webpack.ResolveOptions {
	return {
		extensions: [".tsx", ".ts", ".js"],
		preferAbsolute: true,
		modules: [paths.src, "node_modules"],
		mainFiles: ["index"],
		alias: {},
	};
}

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
	return {
		open: true,
		hot: true,
		port,
		historyApiFallback: true,
	};
}
