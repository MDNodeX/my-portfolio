import BlogCard from "@/components/BlogCard";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const { data: blogData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/blog/search?q=${q}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      {/* Ambient background glow — matches your other sections */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />

      {/* Faint grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-3 border-b border-white/[0.06] pb-5">
          <h2 className="text-2xl font-bold text-white">
            Search Result For: <span className="text-emerald-400">{q}</span>
          </h2>
        </div>

        {loading ? (
          <div className="text-slate-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogData?.data?.length > 0 ? (
              blogData.data.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  categoryName={blog.category_name}
                />
              ))
            ) : (
              <div className="col-span-full text-slate-400">
                No results found.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResult;
