import Link from "next/link";
import { useState } from "react";
import Logo from "../svg/Logo.svg";
import axios from "axios";

const Profile = ({ user }: any) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  let [external, setForceExternal] = useState<any>(user.profile.links.external);

  const updateProfile = async (e: any) => {
    e.preventDefault();

    const { data }: any = await axios.put("/api/user/update", { user });
    if (data.status) {
      setSuccess("Profile saved successfully!");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } else {
      setError(data.err);
    }
  };

  return (
    <main
      className="d-flex flex-wrap align-items-center justify-content-center"
      style={{
        gap: "50px",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          width: "300px",
          border: "10px solid black",
          height: "605px",
          borderRadius: "40px",
        }}
      >
        <div className="text-center mt-5">
          <img
            className="rounded-circle"
            src={user.picture === "" ? "/user.png" : user.picture}
            style={{
              width: "84px",
              height: "84px",
            }}
          />
        </div>
        <div className="text-center mt-3 fw-bold">{user.username}</div>
        <div className="text-center mt-2">
          {user.profile.bio === "" ? (
            <>I am {user.username}</>
          ) : (
            <>{user.profile.bio}</>
          )}
        </div>
        <div className="mt-2 d-flex gap-3 justify-content-center align-items-center">
          {user.profile.links.socials.map((social: any, i: number) => (
            <div key={i}>
              {social.href !== "" ? (
                <Link href={`${social.url}/${social.href}` || "/"}>
                  <a
                    title={social.title}
                    className="fs-4 text-dark"
                    target={"_blank"}
                  >
                    <i className={social.icon}></i>
                  </a>
                </Link>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            height: "240px",
          }}
          className="mt-4 d-flex gap-3 flex-column justify-content center"
        >
          {user.profile.links.external.length === 0 ? <></> : <>return</>}
        </div>
        <div className="text-center">
          <Link href="/">
            <a
              style={{
                opacity: "0.4",
              }}
            >
              <Logo />
            </a>
          </Link>
        </div>
      </div>
      <div
        style={{
          width: "600px",
        }}
      >
        <div className="p-3 bg-light border">
          <div className="fs-4">Profile</div>
          <div className="d-flex gap-5 mt-3 align-items-center">
            <div
              className="d-flex gap-2 flex-column"
              style={{
                width: "350px",
              }}
            >
              <input
                type="text"
                defaultValue={user.username}
                onInput={(e: any) => (user.username = e.target.value)}
                placeholder="Your username"
                className="rounded form-control"
              />
              <input
                type="text"
                defaultValue={user.profile.bio}
                onInput={(e: any) => (user.profile.bio = e.target.value)}
                placeholder="Your bio"
                className="form-control rounded"
              />
            </div>
            <div>
              <img
                src={user.picture === "" ? "/user.png" : user.picture}
                className="rounded-circle"
                style={{
                  width: "136px",
                  height: "136px",
                }}
              />
            </div>
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-dark" onClick={updateProfile}>
              Save
            </button>
          </div>
        </div>
        <div className="p-3 bg-light border mt-5">
          <div className="fs-4">Socials</div>
          <div className="mt-3">
            {user.profile.links.socials.map((social: any, i: number) => (
              <div key={i} className="input-group mt-4 mb-4">
                <span className="input-group-text fs-5">
                  <i className={social.icon}></i>
                </span>
                <span
                  className="input-group-text"
                  style={{
                    width: "200px",
                  }}
                >
                  {social.url}
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="my-account"
                  defaultValue={social.href}
                  onInput={(e: any) => (social.href = e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-dark" onClick={updateProfile}>
              Save
            </button>
          </div>
        </div>
        <div className="p-3 bg-light border mt-5">
          <div className="fs-4">
            <span>My links</span>
            <span className="float-end">
              <button
                className="btn btn-outline-dark"
                onClick={() => {
                  user.profile.links.external.push({
                    title: "",
                    href: "",
                    icon: "fa-solid fa-caret-down",
                  });
                  setForceExternal(user.profile.links.external);
                }}
                disabled={user.profile.links.external.length >= 3}
              >
                New +
              </button>
            </span>
          </div>
          <div className="mt-3">
            {external.map((link: any, i: number) => (
              <div key={i} className="input-group">
                <span className="input-group-text">
                  <button className="bg-transparent border-0">
                    <i className={link.icon}></i>
                  </button>
                </span>
                <input
                  type="text"
                  defaultValue={link.title}
                  onInput={(e: any) => (link.title = e.target.value)}
                  className="form-control"
                  placeholder="Enter link title"
                />
                <input
                  type="text"
                  defaultValue={link.href}
                  onInput={(e: any) => (link.href = e.target.value)}
                  className="form-control"
                  placeholder="Enter link connection"
                />
                <span className="input-group-text">
                  <button
                    className="bg-transparent border-0"
                    onClick={() => {
                      console.log(external.splice(i, i + 1));
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-dark" onClick={updateProfile}>
              Save
            </button>
          </div>
        </div>
        <div className="text-center fw-bold text-danger mt-3">
          {JSON.stringify(error)}
        </div>
        <div className="text-center fw-bold text-success mt-3">{success}</div>
      </div>
    </main>
  );
};

export default Profile;
