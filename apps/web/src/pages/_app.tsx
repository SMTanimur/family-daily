/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppProps } from "next/app";
// import "@fontsource/open-sans";
// import "@fontsource/open-sans/600.css";
// import "@fontsource/open-sans/700.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { useRef } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";


const Noop: React.FC = ({ children }:any) => <>{children}</>;



const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const Layout = (Component as any).Layout || Noop;
  
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
              <>
                {/* <DefaultSeo /> */}
              
                  <Layout {...pageProps}>
                    <Component {...pageProps} />
                  </Layout>
               
                <ToastContainer autoClose={2000} theme="colored" />
              
              </>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default CustomApp
