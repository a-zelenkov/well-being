import { App } from "app/App";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const routerPaths = {
	root: "/",
	// main: "main",
};

const routerConfig: RouteObject[] = [
	{
		path: routerPaths.root,
		element: <App />,
		errorElement: <div> Not Found Page </div>,
		// children: [
		// 	{
		// 		path: routerPaths.main,
		// 		element: <MainPage />,
		// 	},
		// 	{
		// 		path: routerPaths.about,
		// 		element: <div> About Page </div>,
		// 	},
		// ],
	},
];

export const router = createBrowserRouter(routerConfig);
