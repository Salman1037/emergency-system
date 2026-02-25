
import dbConnect from "@/lib/db";
import Complaint from "@/models/Complaint";
import { NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import fs from "fs";
import { classifyPriority } from "@/lib/priority";
import { sendMail } from "@/lib/mailer";

const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });


async function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(req) {
  await dbConnect();
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const lat = formData.get("lat");
  const lng = formData.get("lng");
  const userId = formData.get("userId");
  let image = "";
  const file = formData.get("image");
  if (file && typeof file === "object" && file.name) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "-" + file.name;
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
    image = `/uploads/${filename}`;
  }
  try {
    const priority = classifyPriority(`${title} ${description}`);
    const complaint = await Complaint.create({
      userId,
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
