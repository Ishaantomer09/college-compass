import pg from "pg";
import "dotenv/config";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const colleges = [
  {
    name: "University of Delhi",
    location: "Delhi",
    state: "Delhi",
    website: "https://www.du.ac.in/",
  },
  {
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    state: "Delhi",
    website: "https://www.jnu.ac.in/",
  },
  {
    name: "Jamia Millia Islamia",
    location: "New Delhi",
    state: "Delhi",
    website: "https://www.jmi.ac.in/",
  },
  {
    name: "Delhi Technological University",
    location: "Delhi",
    state: "Delhi",
    website: "https://dtu.ac.in/",
  },
  {
    name: "Indraprastha Institute of Information Technology Delhi",
    location: "New Delhi",
    state: "Delhi",
    website: "https://www.iiitd.ac.in/",
  },
  {
    name: "Indira Gandhi Delhi Technical University for Women",
    location: "Delhi",
    state: "Delhi",
    website: "https://www.igdtuw.ac.in/",
  },
  {
    name: "Guru Gobind Singh Indraprastha University",
    location: "New Delhi",
    state: "Delhi",
    website: "https://www.ipu.ac.in/",
  },
  {
    name: "Netaji Subhas University of Technology",
    location: "New Delhi",
    state: "Delhi",
    website: "https://nsut.ac.in/",
  },
  {
    name: "Amity University Noida",
    location: "Noida",
    state: "Uttar Pradesh",
    website: "https://www.amity.edu/",
  },
  {
    name: "Sharda University",
    location: "Greater Noida",
    state: "Uttar Pradesh",
    website: "https://www.sharda.ac.in/",
  },
];

async function seedDatabase() {
  try {
    console.log("🔌 Connecting to Neon PostgreSQL...");

    await client.connect();

    console.log("✅ Connected to database!");

    for (const college of colleges) {
      await client.query(
        `
        INSERT INTO colleges (name, location, state, website)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT DO NOTHING;
        `,
        [
          college.name,
          college.location,
          college.state,
          college.website,
        ]
      );

      console.log(`✅ Added: ${college.name}`);
    }

    console.log("🎉 College data added successfully!");
  } catch (error) {
    console.error("❌ Database seeding failed:");
    console.error(error);
  } finally {
    await client.end();
    console.log("🔌 Database connection closed.");
  }
}

seedDatabase();