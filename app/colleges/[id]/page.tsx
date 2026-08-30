"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type College = {
  id: number;
  name: string;
  location: string;
  state: string;
  website: string;
  created_at: string;
};

export default function CollegeDetails() {
  const params = useParams();
  const id = params.id;

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCollege() {
      try {
        const response = await fetch(`/api/colleges/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch college");
        }

        const data = await response.json();

        if (data.success) {
          setCollege(data.college);
        } else {
          throw new Error(data.message || "College not found");
        }
      } catch (error) {
        console.error(error);
        setError("Unable to load college details.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCollege();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-10 text-center">
        <h1 className="text-2xl font-bold">Loading college...</h1>
      </main>
    );
  }

  if (error || !college) {
    return (
      <main className="min-h-screen bg-slate-50 p-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          {error || "College not found"}
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">🧭 CollegeCompass</h1>

          <a
            href="/"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            ← Back to Colleges
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex h-56 items-center justify-center bg-gradient-to-br from-blue-100 to-slate-100 text-8xl">
            🏫
          </div>

          <div className="p-8">
            <p className="font-semibold text-blue-600">COLLEGE DETAILS</p>

            <h2 className="mt-2 text-4xl font-extrabold">
              {college.name}
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              📍 {college.location}, {college.state}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Institution</p>
                <p className="mt-2 font-bold">University / College</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Location</p>
                <p className="mt-2 font-bold">{college.location}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">State</p>
                <p className="mt-2 font-bold">{college.state}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold">Official Website</h3>

              <p className="mt-2 text-slate-600">
                Visit the official website for courses, admissions,
                fees and other information.
              </p>

              <a
                href={college.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Visit Official Website →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}