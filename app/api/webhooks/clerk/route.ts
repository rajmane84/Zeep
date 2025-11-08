import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  const wh = new Webhook(webhookSecret);

  let evt: any;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const user = evt.data;

    // Insert user into your DB
    // await prisma.user.create({
    //   data: {
    //     clerkId: user.id,
    //     email: user.email_addresses[0].email_address,
    //     name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
    //     imageUrl: user.image_url,
    //   },
    // });

    console.log("✅ User created in DB:", user.id);
  }

  return new NextResponse("OK", { status: 200 });
}