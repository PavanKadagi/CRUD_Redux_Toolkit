import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as View } from "../assets/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/slices/userSlice";
import { singleUser } from "../store/slices/userSlice";
import { deleteUser } from "../store/slices/userSlice";

export default function Home() {
  const { users, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <table>
            <thead className="table-head">
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((curEle) => {
                return (
                  <tr key={curEle._id}>
                    <td>{curEle._id}</td>
                    <td>{curEle.name}</td>
                    <td className="table-row">
                      <NavLink to="/view">
                        <View
                          title="View"
                          className="view"
                          onClick={() => dispatch(singleUser(curEle._id))}
                        />
                      </NavLink>
                      <NavLink to={`/${curEle._id}`}>
                        <Edit
                          title="Edit"
                          onClick={() => dispatch(singleUser(curEle._id))}
                        />
                      </NavLink>
                      <Delete
                        title="Delete"
                        className="delete"
                        onClick={() => dispatch(deleteUser(curEle._id))}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
