import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.MASTER_KEY;

let currentCommand = "";

export async function GET(request) {
    const apiKey = request.headers.get('x-api-key');

    if (apiKey !== SECRET_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const cmd = currentCommand;
    currentCommand = ""; 

    return NextResponse.json({ command: cmd });
}

export async function POST(request) {
    try {
        const body = await request.json();
        
        if (body.password !== SECRET_KEY) {
            return NextResponse.json({ error: "Wrong Password" }, { status: 403 });
        }

        currentCommand = body.command;
        console.log("Принята новая команда:", currentCommand);

        return NextResponse.json({ status: "success" });
    } catch (err) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
}
