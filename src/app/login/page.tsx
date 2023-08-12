'use client';
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const [ loading, setLoading] = React.useState(false);

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const onLogin = async() => {
       try {
        setLoading(true);
        const response = await axios.post('/api/users/login', user);
        console.log(response.data);
        toast.success("Login successful");
        router.push("/profile");
       } catch (error: any) {
        toast.error(error.message);
       } finally {
        setLoading(false);
       }
    }

    React.useEffect(() => {
      if (user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />
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
            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 mt-4">
                Login
            </button>
            <Link href='/signup'>Visit Singup Page</Link>
    </div>
  );
};
