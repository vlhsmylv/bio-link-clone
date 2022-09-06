import UserModel from "../../../models/user.model";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase.config";

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    const { uid, username, email } = req.body;
    if (username !== "" && email !== "") {
      const user = await UserModel({
        uid: uid,
        username: username,
        email: email,
      });
      await setDoc(doc(db, "users", uid), user);
      res.json({
        status: true,
      });
    } else {
      res.json({
        status: false,
        err: "Fill all fields",
      });
    }
  } else {
    res.json({
      status: false,
      err: "Forbidden request",
    });
  }
};

export default handler;
