import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        location,
        state,
        website,
        created_at
      FROM colleges
      ORDER BY name ASC
    `);

    return NextResponse.json({
      success: true,
      colleges: result.rows,
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch colleges",
      },
      { status: 500 }
    );
  }
}