import { connect } from '@/dbConfig/dbConfig';
import User from "@/models/userModal";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password} = reqBody

        console.log(reqBody), 'request body';

        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({errror: 'user already exists'}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        console.log(savedUser);

        return NextResponse.json({message: "User created successfully", success: true, savedUser});

    } catch (errror: any) {
        return NextResponse.json({ error: errror.message },
        {status: 500})
    }
}