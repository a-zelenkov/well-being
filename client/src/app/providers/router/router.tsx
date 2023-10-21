import { App } from "app/App";
import { ConferencePage } from "pages/conferencePage";
import { MainPage } from "pages/mainPage";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const routerPaths = {
	root: "/",
	conference: "conference",
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
			{
				path: `${routerPaths.conference}/:id`,
				element: <ConferencePage />,
			},
		],
	},
];

export const router = createBrowserRouter(routerConfig);
