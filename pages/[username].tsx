import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Logo from "../components/svg/Logo.svg";
import { root } from "../config/api.config";

const User = ({ user }: any) => {
  return (
    <>
      <Head>
        <title>{user.username} - Bio Link</title>
      </Head>

      <main
        style={{
          marginTop: "70px",
        }}
      >
        <div className="text-center">
          <img
            src={user.picture === "" ? "/user.png" : user.picture}
            style={{
              width: "96px",
              height: "96px",
            }}
          />
        </div>
        <div className="mt-3 text-center fs-3 fw-bold">{user.username}</div>
        <div className="mt-2 fs-5 text-center">{user.profile.bio}</div>
        <div className="mt-3 d-flex gap-3 justify-content-center align-items-center">
          {user.profile.links.socials.map((social: any, i: number) => (
            <Link href={`${social.url}/${social.href}`} key={i}>
              <a title={social.title} className="fs-3 text-dark">
                <i className={social.icon}></i>
              </a>
            </Link>
          ))}
        </div>
        <div
          className="text-center mt-4"
          style={{
            opacity: "0.4",
          }}
        >
          <Link href="/">
            <a target={"_blank"}>
              <Logo />
            </a>
          </Link>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async ({ query }: any) => {
  const { data }: any = await axios.get(
    `${root}/api/user/get/username/${query.username}`
  );

  return {
    props: {
      user: data.user,
    },
  };
};

export default User;
