import { router } from "app/providers/router/router";
import { createReduxStore } from "app/providers/store/store";
import "app/styles/index.scss";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

const store = createReduxStore();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
