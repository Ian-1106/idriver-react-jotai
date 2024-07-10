import React from "react"
import ReactDOM from 'react-dom/client'
import App from "./components/App"
import './styles/main.styl'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from "react-router-dom"
import useSnackbarStore from "./store/snackbar"
import useApiDataStore from "./store/apidata"

const Index = () => {
  const { setSnackMsg } = useSnackbarStore(state => state)
  const { setApiData } = useApiDataStore()

  const onError = (error, variables, context) => {
    console.log('onError', error, variables)
    setSnackMsg({ message: "API發生未知錯誤" })
  }

  const onSuccess = (data, query) => {
    if (query?.queryKey?.[0]?.[0] == "_") {
      setApiData({ key: query?.queryKey?.[0]?.replace('_', ''), body: data?.body })
    }
    const status = (data?.body?.status !== null && data?.body?.status !== undefined) ? data?.body?.status : null
    status !== null && setSnackMsg({ message: data?.body?.message })
    !data?.ok && status == null && setSnackMsg({ message: "API發生未知錯誤" })
  }

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onSuccess,
      onError
    }),
    mutationCache: new MutationCache({
      onSuccess,
      onError
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
        select: (data) => {
          const status = (data?.body?.status !== null && data?.body?.status !== undefined) ? data?.body?.status : null
          const response = (status == null ? (data.body || null) : null)
          return response
        }
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<Index />)
