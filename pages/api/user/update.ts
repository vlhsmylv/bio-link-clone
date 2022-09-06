import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase.config";

const handler = async (req: any, res: any) => {
  if (req.method === "PUT") {
    const { user } = req.body;
    const { uid } = user;
    await setDoc(doc(db, "users", uid), user);
    res.json({
      status: true,
    });
  } else {
    res.json({
      status: false,
      err: "Forbidden method",
    });
  }
};

export default handler;
