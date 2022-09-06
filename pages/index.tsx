import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Logo from "../components/svg/Logo.svg";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          Bio Link: Fastest Link In Bio for your Instagram and TikTok
        </title>
      </Head>

      <main
        className="d-flex gap-3 flex-column align-items-center justify-content-center"
        style={{
          height: "100vh",
        }}
      >
        <div>
          <Logo />
        </div>
        <div className="mt-2">
          <a
            href="/dashboard"
            className="btn btn-outline-dark border rounded-pill"
          >
            Get started
          </a>
        </div>
        <div className="mt-2">
          &copy; Dev by{" "}
          <Link href="https://valehismayilov.com">
            <a className="text-dark">Valeh Ismayilov</a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
