import { connect } from '@/dbConfig/dbConfig';
import User from "@/models/userModal";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password} = reqBody

        console.log(reqBody), 'request body';

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({errror: 'user does not exist'}, {status: 400})
        };

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({error: 'password is incorrect'}, {status: 400})
        };

        //creat token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        };

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login Successfull",
            success: true,
        })

        response.cookies.set("token", token, {httpOnly: true});

        return response;

    } catch (errror: any) {
        return NextResponse.json({ error: errror.message },
        {status: 500})
    }
}