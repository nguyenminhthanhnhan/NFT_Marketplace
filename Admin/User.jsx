import React, { useState, useEffect } from "react";
import {
    FaFilter,
    FaAngleDown,
    FaAngleUp,
    FaWallet,
    FaMusic,
    FaVideo,
    FaImages,
    FaUserAlt,
} from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import Style from "./NFTs.module.css";

import StyleUser from "./User.module.css";

import axios from "axios";

const Users = () => {
    const [filter, setFilter] = useState(true);
    const [image, setImage] = useState(true);
    const [video, setVideo] = useState(true);
    const [music, setMusic] = useState(true);

    // State variables for input values
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [photo, setPhoto] = useState("");

    // State variable for selected user
    const [selectedUser, setSelectedUser] = useState(null);




    // Initialize userData as an empty array
    const [userData, setUserData] = useState({ users: [] });

    // State variable to track whether inputs are in edit mode
    const [editMode, setEditMode] = useState(false);

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data: response } = await axios.get("http://localhost:5000/api/v1/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            setUserData(response.data);
        } catch (error) {
            console.error("Error in getUser:", error);
            throw error;
        }
    };

    const createUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data: response } = await axios.post("http://localhost:5000/api/v1/users", {
                id,
                name,
                email,
                password,
                role,
                photo,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });



            setId("");
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
            setPhoto("");



            getUser();



        } catch (error) {
            // console.error("Error in createUser:", error);
            alert("email đã tồn tại");
            throw error;
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleRowClick = (user) => {
        setSelectedUser(user);

        // Set input values when a row is clicked
        setId(user._id);
        setName(user.name);
        setEmail(user.email);
        setPhoto(user.photo);
        setPassword(user.password);
        setRole(user.role);
    };   // Function to check if any required input is empty 

    // Function to reset input values and switch to edit mode
    const handleReset = () => {
        setId("");
        setName("");
        setEmail("");
        setPassword("");
        setPhoto("");
        setRole("user");
        setEditMode(true); // Allow editing during reset
    };
    // Function to handle the create operation
    const handleCreate = () => {

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Vui lòng nhập một địa chỉ email hợp lệ.");
            return;
        }

        // Kiểm tra định dạng mật khẩu
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái in hoa, một chữ cái thường và một số.");
            return;
        }

        // Kiểm tra tên có hợp lệ không
        if (!name) {
            alert("Vui lòng nhập một tên.");
            return;
        }
        // Perform the create operation here
        // You can send a request to your API to create a new user
        // ...
        createUser();

        // After creating, reset the input fields
        setId("");
        setName("");
        setEmail("");
        setPassword("");
        setRole("user");
        setPhoto("");
        setEditMode(false); // Disable editing after creating

        handleReset();

    }

    // Update
    const updateUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data: response } = await axios.patch(`http://localhost:5000/api/v1/users/${selectedUser._id}`, {
                id,
                name,
                email,
                password,
                role,
                photo,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            setId("");
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
            setPhoto("");



            getUser();


        } catch (error) {
            console.error("Error in updateUser:", error);
            throw error;
        }
    };


    // Delete
    const deleteUser = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data: response } = await axios.delete(`http://localhost:5000/api/v1/users/${selectedUser._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            getUser();

        } catch (error) {
            console.error("Error in deleteUser:", error);
            throw error;
        }


    };

    const [currentPage, setCurrentPage] = useState(1);

    const [usersPerPage] = useState(5);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.users ? userData.users.slice(indexOfFirstUser, indexOfLastUser) : [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPaginationButtons = () => {
        const userArray = userData.users || []; // Use an empty array if userData.users is undefined
        const pageNumbers = Math.ceil(userArray.length / usersPerPage);

        if (pageNumbers <= 1) {
            return null; // Hide pagination if there's only one page
        }

        return (
            <div className={Style.Pagination}>
                <button
                    className={Style.Pagination_btn}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((number) => (
                    <button
                        key={number}
                        className={`${Style.Pagination_btn} ${currentPage === number ? Style.active : ''}`}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </button>
                ))}
                <button
                    className={Style.Pagination_btn}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pageNumbers}
                >
                    Next
                </button>
            </div>
        );
    };
    return (
        <div className={Style.filter}>
            <div className={StyleUser.filter_box}>

                <div className={StyleUser.buttonBox}
                >
                    <button type="submit" className={StyleUser.button} onClick={handleCreate}>
                        Create
                    </button>
                    <button type="submit" className={StyleUser.button} onClick={updateUser}>
                        Update
                    </button>
                    <button type="submit" className={StyleUser.button} onClick={deleteUser}>
                        Delete
                    </button>
                    <button type="submit" className={StyleUser.button} onClick={handleReset}>
                        Reset
                    </button>
                </div>
                <div className={StyleUser.user_box}>
                    {/* <div className={StyleUser.user_box_input_box}>
                        <label htmlFor="id">ID</label>
                        <input
                            type="text"
                            placeholder="ID"
                            className={StyleUser.user_box_input_box_input}
                            readOnly={!editMode}
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div> */}
                    <div className={StyleUser.user_box_input_box}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className={StyleUser.user_box_input_box_input}
                            // readOnly={!editMode}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={StyleUser.user_box_input_box}>
                        <label htmlFor="photo">photo</label>
                        <input
                            type="text"
                            placeholder="photo"
                            className={StyleUser.user_box_input_box_input}
                            // readOnly={!editMode}
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}

                        />
                    </div>

                    <div
                        className={StyleUser.user_box_input_box}
                    >
                        {/* password */}

                        <label htmlFor="password">password</label>
                        <input
                            type="text"
                            placeholder="password"
                            className={StyleUser.user_box_input_box_input}
                            readOnly={!editMode}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}




                        />
                    </div>

                    <div className={StyleUser.user_box_input_box}>
                        <label htmlFor="email">email</label>
                        <input
                            type="text"
                            placeholder="email"
                            className={StyleUser.user_box_input_box_input}
                            readOnly={!editMode}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>

                    <div className={StyleUser.user_box_input_box}>
                        <label htmlFor="role">role</label>
                        <input
                            type="text"
                            placeholder="role"
                            className={StyleUser.user_box_input_box_input}
                            // readOnly={!editMode}
                            readOnly
                            // value={role}
                            value={
                                role === "admin"
                                    ? "admin"
                                    : "user"
                            }
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div
                className={Style.filter_box_table}>
                <table className={Style.filter_box_table_box}>
                    <tbody>
                        <tr className={Style.filter_box_table_box_head}>
                            <th>Id</th>
                            <th>name</th>
                            <th>password</th>
                            <th>photo</th>
                            <th>email</th>
                            <th>role</th>
                        </tr>
                        {currentUsers.map((user, i) => (
                            <tr key={user._id} className={`${Style.filter_box_table_box_head} ${StyleUser.filter_box_table_box_head}`} onClick={() => handleRowClick(user)}>
                                <td style={{ width: "5%" }}>{i + 1}</td>
                                <td style={{ width: "5%" }}>{user.name}</td>
                                <td style={{ width: "5%" }}>{user.password ? user.password.slice(0, 5) + "******" : ""}</td>
                                <td style={{ width: "5%" }}>
                                    <img src={user.photo} alt="no photo" style={{ width: "50px", height: "50px" }} />
                                </td>
                                <td style={{ width: "10%" }}>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {renderPaginationButtons()}
            </div>
        </div>
    )
}
export default Users