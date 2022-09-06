import { useEffect, useState } from "react";
import AuthForm from "../../components/dashboard/AuthForm.component";
import { auth } from "../../config/firebase.config";
import { onAuthStateChanged } from "@firebase/auth";
import Logo from "../../components/svg/Logo.svg";
import axios from "axios";
import Profile from "../../components/dashboard/Profile.component";
import Head from "next/head";

const Dashboard = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        const { uid } = user;
        const { data }: any = await axios.get(`/api/user/get/uid/${uid}`);
        if (data.status) {
          setIsAuth(true);
          setUser(data.user);
          setIsLoading(false);
        } else {
          if (typeof window !== "undefined") {
            window.alert(data.err);
          }
          setIsAuth(true);
          setIsLoading(false);
        }
      } else {
        setIsAuth(false);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Bio Link - Dashboard</title>
      </Head>

      {isLoading ? (
        <div
          className="d-flex gap-2 fs-3 fw-bold flex-column align-items-center justify-content-center"
          style={{
            height: "100vh",
          }}
        >
          <Logo />
        </div>
      ) : (
        <>
          {" "}
          {isAuth ? (
            <Profile user={user} />
          ) : (
            <AuthForm updateAuth={(auth: boolean) => setIsAuth(auth)} />
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
