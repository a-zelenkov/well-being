import { ThemeProvider } from "@gravity-ui/uikit";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { router } from "app/providers/router/router";
import { store } from "app/providers/store/store";
import "app/styles/index.scss";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
	<GoogleOAuthProvider clientId="482536207010-gsiha5umtdd36su5o8kgmaunkv1kqr6m.apps.googleusercontent.com">
		<ThemeProvider theme="light">
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</ThemeProvider>
	</GoogleOAuthProvider>,
);
