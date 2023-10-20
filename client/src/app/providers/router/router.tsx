import { App } from "app/App";
import { MainPage } from "pages/mainPage";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const routerPaths = {
	root: "/",
	main: "main",
};

const routerConfig: RouteObject[] = [
	{
		path: routerPaths.root,
		element: <App />,
		errorElement: <div> Not Found Page </div>,
		children: [
			{
				path: routerPaths.root,
				element: <MainPage />,
			},
		],
	},
];

export const router = createBrowserRouter(routerConfig);
