import dbConnect from "@/lib/db";
import Complaint from "@/models/Complaint";
import { NextResponse } from "next/server";
import { classifyPriority } from "@/lib/priority";
import { sendMail } from "@/lib/mailer";
import { getUserFromRequest } from "@/lib/auth";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  await dbConnect();
  const user = await getUserFromRequest(req);
  if (!user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const lat = formData.get("lat");
  const lng = formData.get("lng");
  let image = "";
  const file = formData.get("image");
  if (file && typeof file === "object" && file.name) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;
    try {
      const uploadResult = await cloudinary.v2.uploader.upload(dataUri, {
        folder: "complaints",
      });
      image = uploadResult.secure_url;
    } catch (e) {
      return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }
  }
  try {
    const priority = classifyPriority(`${title} ${description}`);
    const complaint = await Complaint.create({
      userId: user.userId,
      title,
      description,
      category,
      priority,
      image,
      location: lat && lng ? { lat, lng } : undefined,
    });
    // Send email if high priority
    if (priority === "HIGH") {
      try {
        await sendMail({
          to: process.env.EMAIL_USER,
          subject: "High Priority Emergency Complaint",
          text: `A high priority complaint was submitted.\nTitle: ${title}\nDescription: ${description}`,
        });
      } catch (e) {
        // Log or ignore email errors
      }
    }
    return NextResponse.json({ message: "Complaint submitted", complaint });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();
  const user = await getUserFromRequest(req);
  if (!user?.email && !user?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const filter = user.userId
      ? { userId: user.userId }
      : { userEmail: user.email };
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(complaints);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
