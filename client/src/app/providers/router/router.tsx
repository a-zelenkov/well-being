import { App } from "app/App";
import { AdminPage } from "pages/adminPage";
import { ConferencePage } from "pages/conferencePage";
import { MainPage } from "pages/mainPage";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const routerPaths = {
	root: "/",
	conference: "conference",
	admin: "admin",
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
			{
				path: routerPaths.admin,
				element: <AdminPage />,
			},
		],
	},
];

export const router = createBrowserRouter(routerConfig);
