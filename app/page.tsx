"use client";

import { useEffect, useState } from "react";

const categories = [
  { icon: "💻", name: "Computer Science" },
  { icon: "⚙️", name: "Engineering" },
  { icon: "📊", name: "Management" },
  { icon: "⚖️", name: "Law" },
  { icon: "🩺", name: "Medical" },
  { icon: "🎨", name: "Design" },
];

type College = {
  id: number;
  name: string;
  location: string;
  state: string;
  website: string;
  created_at: string;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchColleges() {
      try {
        const response = await fetch("/api/colleges");

        if (!response.ok) {
          throw new Error("Failed to fetch colleges");
        }

        const data = await response.json();

        if (data.success) {
          setColleges(data.colleges);
        } else {
          throw new Error(data.message || "Failed to fetch colleges");
        }
      } catch (error) {
        console.error(error);
        setError("Unable to load colleges.");
      } finally {
        setLoading(false);
      }
    }

    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter((college) =>
    `${college.name} ${college.location} ${college.state}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
              🧭
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                CollegeCompass
              </h1>

              <p className="text-xs text-slate-500">
                Find. Compare. Decide.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#" className="text-blue-600">
              Home
            </a>

            <a href="#colleges" className="hover:text-blue-600">
              Colleges
            </a>

            <a href="#courses" className="hover:text-blue-600">
              Courses
            </a>

            <a href="#compare" className="hover:text-blue-600">
              Compare
            </a>
          </div>

          <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            Sign In
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 text-center">
          <div className="mx-auto mb-6 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            🎓 Your journey to the right college starts here
          </div>

          <h2 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Find the college that{" "}
            <span className="text-blue-600">fits your future.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Discover colleges, explore courses, compare fees and placements,
            and make a smarter decision about your education.
          </p>

          {/* SEARCH */}
          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg sm:flex-row">
            <div className="flex flex-1 items-center gap-3 px-4">
              <span className="text-xl">🔍</span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search colleges, courses or universities..."
                className="w-full bg-transparent py-3 outline-none"
              />
            </div>

            <button
              onClick={() =>
                document
                  .getElementById("colleges")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
            <span>Popular:</span>

            <button
              onClick={() => setSearch("Delhi University")}
              className="hover:text-blue-600"
            >
              Delhi University
            </button>

            <button
              onClick={() => setSearch("Computer Science")}
              className="hover:text-blue-600"
            >
              Computer Science
            </button>

            <button
              onClick={() => setSearch("JNU")}
              className="hover:text-blue-600"
            >
              JNU
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="courses" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="font-semibold text-blue-600">EXPLORE</p>

          <h3 className="mt-2 text-3xl font-bold">
            Explore by category
          </h3>

          <p className="mt-2 text-slate-600">
            Start your search by choosing an area you're interested in.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                setSearch(category.name);

                setTimeout(() => {
                  document
                    .getElementById("colleges")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <div className="text-3xl">{category.icon}</div>

              <p className="mt-4 text-sm font-semibold">
                {category.name}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* COLLEGES */}
      <section id="colleges" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-semibold text-blue-600">DISCOVER</p>

              <h3 className="mt-2 text-3xl font-bold">
                Popular colleges
              </h3>

              <p className="mt-2 text-slate-600">
                Explore institutions students are looking for.
              </p>
            </div>

            <button className="font-semibold text-blue-600 hover:text-blue-700">
              View all colleges →
            </button>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="mt-10 rounded-2xl border border-slate-200 p-12 text-center">
              <p className="text-lg font-semibold">
                Loading colleges...
              </p>

              <p className="mt-2 text-slate-500">
                Fetching the latest college information.
              </p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-12 text-center">
              <p className="text-lg font-semibold text-red-700">
                {error}
              </p>

              <p className="mt-2 text-sm text-red-600">
                Please check your database connection and try again.
              </p>
            </div>
          )}

          {/* COLLEGE CARDS */}
          {!loading && !error && (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <article
                    key={college.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-100 to-slate-100 text-6xl">
                      🏫
                    </div>

                    <div className="p-6">
                      <h4 className="text-lg font-bold">
                        {college.name}
                      </h4>

                      <p className="mt-2 text-sm text-slate-500">
                        📍 {college.location}, {college.state}
                      </p>

                      <p className="mt-4 text-sm text-slate-600">
                        🎓 University / College
                      </p>

                      <div className="mt-6 flex items-center justify-between">
                       <a
  href={`/colleges/${college.id}`}
  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
>
  Explore details →
</a>

                        <a
                          href={college.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                  <p className="text-lg font-semibold">
                    No colleges found
                  </p>

                  <p className="mt-2 text-slate-500">
                    Try searching for another college or university.
                  </p>

                  <button
                    onClick={() => setSearch("")}
                    className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Show all colleges
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* COMPARE */}
      <section id="compare" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl bg-slate-900 px-8 py-12 text-center text-white sm:px-16">
          <div className="text-4xl">⚖️</div>

          <h3 className="mt-5 text-3xl font-bold">
            Can't decide between colleges?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Compare colleges side-by-side using fees, courses, placements,
            ratings, location and other important factors.
          </p>

          <button className="mt-8 rounded-xl bg-white px-7 py-3 font-bold text-slate-900 hover:bg-slate-100">
            Start Comparing
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="font-semibold text-blue-600">
              WHY COLLEGECOMPASS
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              Everything you need to choose wisely
            </h3>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-7">
              <div className="text-3xl">🔎</div>

              <h4 className="mt-5 text-xl font-bold">
                Discover
              </h4>

              <p className="mt-3 text-slate-600">
                Find colleges and courses that match your interests and goals.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-7">
              <div className="text-3xl">⚖️</div>

              <h4 className="mt-5 text-xl font-bold">
                Compare
              </h4>

              <p className="mt-3 text-slate-600">
                Compare fees, placements, ratings and other important details.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-7">
              <div className="text-3xl">🧭</div>

              <h4 className="mt-5 text-xl font-bold">
                Decide
              </h4>

              <p className="mt-3 text-slate-600">
                Get the information you need to make a confident decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-bold text-slate-900">
              🧭 CollegeCompass
            </span>

            <span className="ml-2">
              Find. Compare. Decide.
            </span>
          </div>

          <p>© 2026 CollegeCompass. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}