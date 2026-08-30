import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const result = await sql`SELECT NOW() AS time`;

    return Response.json({
      success: true,
      message: "Connected to Neon successfully!",
      databaseTime: result[0].time,
    });
  } catch (error) {
    console.error("Neon connection error:", error);

    return Response.json(
      {
        success: false,
        message: "Could not connect to Neon",
      },
      { status: 500 }
    );
  }
}