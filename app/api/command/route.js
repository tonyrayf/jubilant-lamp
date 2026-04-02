import { NextResponse } from 'next/server';

let currentCommand = "";

export async function GET() {
    const cmd = currentCommand;
    currentCommand = ""; // Очищаем после того, как мод её забрал
    return NextResponse.json({ command: cmd });
}

export async function POST(request) {
    const body = await request.json();
    currentCommand = body.command;
    console.log("Новая команда получена:", currentCommand);
    return NextResponse.json({ status: "success" });
}