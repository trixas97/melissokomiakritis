import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ products: [] });
}

export async function PATCH() {
  return NextResponse.json({ success: true });
}
