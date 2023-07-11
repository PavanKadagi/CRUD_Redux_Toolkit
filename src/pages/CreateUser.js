import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../store/slices/userSlice";

export default function CreateUser() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  let navigate = useNavigate();
  const { user } = useParams();
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user === "createUser") {
      setIsUpdateUser(false);
    } else {
      setIsUpdateUser(true);
      const singleUser = users.filter((curEle) => curEle._id === user);
      setUserData(...singleUser);
    }
  }, []);

  const isEmail = (emailVal) => {
    let atSymbol = emailVal.indexOf("@");
    if (atSymbol < 1) return false;
    let dot = emailVal.lastIndexOf(".");
    //example1 = vi@gm.com for condition true , example2 = vi@.com for condition false
    if (dot <= atSymbol + 2) return false;
    // dot should  be last
    if (dot === emailVal.length - 1) return false;
    return true;
  };

  const setErrorMsg = (errorMsg) => {
    toast.error(errorMsg);
  };

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validation = async () => {
    let { name, email, phone } = userData;
    const nameVal = name.trim();
    const emailVal = email.trim();
    const phoneVal = phone.toString().trim();

    if (!name || !email || !phone) {
      return setErrorMsg("Plz filled the field properly...!");
    } else if (nameVal.length <= 2) {
      return setErrorMsg("name min 3 char");
    } else if (!isEmail(emailVal)) {
      return setErrorMsg("Not a valid Email");
    } else if (phoneVal.length !== 10) {
      return setErrorMsg("Phone Number must be 10 digit");
    } else {
      let data = { nameVal, emailVal, phoneVal, user };
      isUpdateUser ? dispatch(updateUser(data)) : dispatch(createUser(data));
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validation();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    validation();
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <form
          className="form-control"
          onSubmit={(e) => (isUpdateUser ? handleUpdate(e) : handleSubmit(e))}
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={userData.name}
            onChange={handleInput}
            autoComplete="off"
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleInput}
            autoComplete="off"
          />
          <br />
          <input
            type="number"
            placeholder="Phone"
            name="phone"
            value={userData.phone}
            onChange={handleInput}
            autoComplete="off"
          />
          <br />
          <button className="btn ">{isUpdateUser ? "Update" : "Create"}</button>
        </form>
      )}
    </>
  );
}
