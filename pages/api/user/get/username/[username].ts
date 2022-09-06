import { db } from "../../../../../config/firebase.config";
import { getDocs, collection, query, where } from "firebase/firestore";

const handler = async (req: any, res: any) => {
  if (req.method === "GET") {
    const { username }: any = req.query;

    const users: {}[] = [];
    const userDocRefs: any = query(
      collection(db, "users"),
      where("slug", "==", username)
    );
    const userDocs = await getDocs(userDocRefs);
    userDocs.forEach((user: any) => {
      users.push(user.data());
    });
    res.json({
      status: true,
      user: users[0],
    });
  } else {
    res.json({
      status: false,
      err: "Forbidden method",
    });
  }
};

export default handler;
