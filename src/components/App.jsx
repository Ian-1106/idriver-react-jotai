import React, { useEffect } from "react";
import Snackbar from "./elements/snackbar/Snackbar"
import Header from './header'
import Main from "./Main"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getAccount, logoutAccount } from '../apis'
import Alert from "./elements/alert/Alert"
import Dialog from './elements/dialog/Dialog'
import useAccountStore from '../store/account'
import useDialogStore from "../store/dialog";

const App = () => {
  const { setAccount, isLogin, name } = useAccountStore(state => state)
  const { ...dialog_props } = useDialogStore()

  const query = useQuery({ queryKey: ['getAccount'], queryFn: () => getAccount(), refetchOnWindowFocus: true })
  const logoutAccountApi = useMutation({ mutationFn: logoutAccount, onSuccess: () => query.refetch() })

  useEffect(() => {
    const member_info = query?.data || {}
    setAccount({ ...member_info, refetch: query.refetch })
  }, [query?.data])

  return (
    <>
      <Header
        title={"iDriver"}
        isLoading={query.isLoading}
        isLogin={isLogin}
        name={name}
        logout={logoutAccountApi.mutate}
      />
      <Main />
      <Alert />
      <Snackbar />
      <Dialog {...dialog_props} />
    </>
  );
};

export default App;