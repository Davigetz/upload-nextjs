import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { RootState, store } from "../app/store";
import { useAppSelector } from "../app/hooks";
import Modal from "../app/features/modal/modal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
