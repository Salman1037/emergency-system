import dbConnect from "@/lib/db";
import Complaint from "@/models/Complaint";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  // In a real app, get userId from auth token/session
  // For demo, return all complaints
  try {
    const complaints = await Complaint.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ complaints });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
