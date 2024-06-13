import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import moment from "moment";
import ChangeUserRole from "./ChangeUserRole";

const Alluser = () => {
  const [alluser, setAllUser] = useState([]);

  const fetchUser = async () => {
    try {
      const fetchData = await fetch(SummaryApi.alluser.url, {
        method: SummaryApi.alluser.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();
      console.log("responsed user data", dataResponse.data);

      if (dataResponse.success) {
        setAllUser(dataResponse.data); // Assuming the API response contains an array of users
      } else {
        toast.error("Failed to fetch users:", dataResponse.message);
        console.error("Failed to fetch users:", dataResponse.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = (id) => {
    // Delete logic here
  };

  const handleEdit = (id) => {
    // Edit logic here
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full usersTable">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {alluser.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>
                {user?.role}
                <button onClick={() => handleEdit(user.id)} className="px-2">
                  <MdOutlineEdit />
                </button>
              </td>
              <td>{moment(user?.createdAt).format("LL")}</td>
              <td>
                <nav>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-100 rounded-full cursor-pointer hover:bg-red-400 hover:text-white px-2 py-2 m-1"
                  >
                    <RiDeleteBinLine />
                  </button>
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-green-100 rounded-full cursor-pointer hover:bg-green-400 hover:text-white px-2 py-2 m-1"
                  >
                    <MdOutlineEdit />
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ChangeUserRole />
    </div>
  );
};

export default Alluser;
