import slugify from "slugify";

const UserModel = async (data: any) => {
  const { uid, username, email } = data;

  return {
    username: username,
    email: email,
    uid: uid, 
    slug: slugify(username).toLowerCase(),
    picture: "",
    profile: {
      bio: "",
      links: {
        socials: [
          {
            title: "Instagram",
            icon: "fa-brands fa-instagram",
            href: "",
            url: "https://instagram.com"
          },
          {
            title: "Linkedin",
            icon: "fa-brands fa-linkedin",
            href: "",
            url: "https://linkedin.com"
          },
          {
            title: "Github",
            icon: "fa-brands fa-github",
            href: "",
            url: "https://github.com" 
          }
        ],
        external: [],
      },
    },
  };
};

export default UserModel;
