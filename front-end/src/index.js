import { StrictMode } from "react";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { GlobalStyles } from "./styles/global-styles.style";
import { App } from "./App";

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<GlobalStyles />
			<App />
		</BrowserRouter>
	</StrictMode>,
	document.getElementById("root"),
);
