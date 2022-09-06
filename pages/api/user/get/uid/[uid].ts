import { db } from "../../../../../config/firebase.config";
import { getDoc, doc } from "firebase/firestore";

const handler = async (req: any, res: any) => {
  if (req.method === "GET") {
    const { uid }: any = req.query;
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    res.json({
      status: true,
      user: userDoc.data()
    })
  } else {
    res.json({
      status: false,
      err: "Forbidden method",
    });
  }
};

export default handler;
