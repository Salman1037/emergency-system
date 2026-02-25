import dbConnect from "@/lib/db";
import Complaint from "@/models/Complaint";
import SOSAlert from "@/models/SOSAlert";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  try {
    const complaints = await Complaint.find({}).sort({ createdAt: -1 });
    const sosAlerts = await SOSAlert.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ complaints, sosAlerts });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  await dbConnect();
  try {
    const { complaintId, status } = await req.json();
    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );
    return NextResponse.json({ complaint });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
