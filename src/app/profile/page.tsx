"use client";

'use client';
import React from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [data, setData] = React.useState(null);
    const router = useRouter();

    const onLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("You have been logged out");
            router.push("/login");

        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.data._id);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="padding rounded bg-green-500">
                {data == null ? "Nothing here!" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr />
            <button onClick={onLogout} className=" bg-blue-500 mt-4  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">LogOut</ button>
            <button onClick={() => getUserDetails()} className=" bg-green-900 mt-4  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get user Details</ button>
        </div>
    );
};