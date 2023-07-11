import React from "react";
import { useSelector } from "react-redux";

export default function View() {
  const { users } = useSelector((state) => state.user);

  return (
    <>
      {users.loading ? (
        <h3>Loading..</h3>
      ) : (
        <table>
          <thead className="table-head">
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{users[0]?._id}</td>
              <td>{users[0]?.name}</td>
              <td>{users[0]?.email}</td>
              <td>{users[0]?.phone}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}
