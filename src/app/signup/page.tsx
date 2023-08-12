'use client';
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async() => {
       try {
        setLoading(true);
        const response: any = await axios.post('/api/users/signup', user);
            toast.success("Account created successfully", response.data);
            router.push('/login');
       } catch (error: any) {
           console.log('Singup failed', error.message);
           toast.error(error.message);
       } finally {
            setLoading(false);
       }
    }

    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{!loading ? "Signup" : "Processing"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 m-4 text-black"
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value })}
                placeholder="username"
                />
            <input className="p-2 border border-gray-300 m-4 text-black"
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value })}
                placeholder="email"
                />
            <input className="p-2 border border-gray-300 m-4 text-black"
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value })}
            placeholder="password"
            />
            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 mt-4">
                {buttonDisabled ? "No SignUp" : "SignUp"}
            </button>
            <Link href='/login'>Visit Login Page</Link>
    </div>
  );
};
