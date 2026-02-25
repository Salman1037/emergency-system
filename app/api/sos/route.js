import dbConnect from "@/lib/db";
import SOSAlert from "@/models/SOSAlert";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST(req) {
  await dbConnect();
  try {
    const { lat, lng } = await req.json();
    if (!lat || !lng) {
      return NextResponse.json({ error: "Location required" }, { status: 400 });
    }

    // Try to get user info, but allow guests
    let userId = null;
    try {
      const { getUserFromRequest } = await import("@/lib/auth");
      const user = await getUserFromRequest(req); // <-- await is important!
      if (user && user.userId) userId = user.userId;
    } catch (e) {
      // ignore, allow guest
    }

    const sos = await SOSAlert.create({
      userId, // will be null for guests
      location: { lat, lng },
      status: "Active",
    });

    // Send email to authorities
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    await sendMail({
      to: process.env.EMAIL_USER,
      subject: "🚨 SOS Alert Triggered!",
      text: `An SOS alert was triggered at the following location:\n\nGoogle Maps: ${mapsUrl}\n\nLatitude: ${lat}\nLongitude: ${lng}\n\nPlease respond immediately.`,
      html: `<h2>🚨 SOS Alert Triggered!</h2>
        <p><b>Location:</b> <a href="${mapsUrl}" target="_blank">View on Google Maps</a></p>
        <ul>
          <li><b>Latitude:</b> ${lat}</li>
          <li><b>Longitude:</b> ${lng}</li>
        </ul>
        <p>Please respond immediately.</p>`
    });

    return NextResponse.json({ message: "SOS alert sent and authorities notified", sos });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
