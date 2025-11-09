import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    const db_url = process.env.DATABASE_URL!;
    console.log("request", request);

    return NextResponse.json(db_url)
}