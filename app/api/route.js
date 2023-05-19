import { NextResponse, NextRequest } from "next/server"

export async function POST(req, res) {
    let data = [];
    for await (const chunk of req.body) {
        data.push(...chunk);
    }

    const stringData = String.fromCharCode(...data);
    console.log(stringData); // Now this should be your JSON string

    const body = JSON.parse(stringData);
    console.log(body);

    return NextResponse.json({
        "api_key": "hello",
    })
}
