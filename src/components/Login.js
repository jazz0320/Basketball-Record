import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../utils/firebase";
import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const loginEmailPassword = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
      props.setUserId(userCredential.user.email);
      props.setLogFirstTime(true);
      props.setNavActive(3);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("無效信箱");
      } else if (error.code === "auth/wrong-password") {
        setError("密碼錯誤");
      } else if (error.code === "auth/user-not-found") {
        setError("使用者不存在");
      } else {
        setError("我不知道");
      }
    }
  };

  const createAccount = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
      props.setLogFirstTime(true);
      props.setNavActive(2);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("無效信箱");
      } else if (error.code === "auth/email-already-in-use") {
        setError("信箱已用");
      } else if (error.code === "auth/weak-password") {
        setError("密碼太弱");
      } else {
        setError("我不知道");
      }
    }
  };

  return (
    <div>
      <div>
        <div>信箱</div>
        <div>
          <input onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <span>test@test.com</span>
      </div>
      <div>
        <div>密碼</div>
        <div>
          <input onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <span>testtest</span>
      </div>
      <div>
        <span onClick={loginEmailPassword}>登入</span>
        <span>|</span>
        <span onClick={createAccount}>註冊</span>
      </div>
      <div>{error}</div>
    </div>
  );
}
export default Login;
