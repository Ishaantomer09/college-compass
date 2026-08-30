import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const collegeId = Number(id);

    if (!Number.isInteger(collegeId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid college ID",
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        location,
        state,
        website,
        created_at
      FROM colleges
      WHERE id = $1
      `,
      [collegeId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      college: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching college:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch college",
      },
      { status: 500 }
    );
  }
}