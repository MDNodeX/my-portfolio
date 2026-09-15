// import { Card, CardContent } from "@/components/ui/card";
// import React, { useState, useMemo } from "react";
// import Loading from "@/components/Loading";
// import { getEnv } from "@/helpers/getEnv";
// import BlogCard from "@/components/BlogCard";
// import { useFetch } from "@/hooks/useFetch";
// // import { useParams } from "react-router-dom";

// export default function BlogPage() {
//   // const { slug } = useParams();
//   const [activeCategory, setActiveCategory] = useState("All");

//   const {
//     data: blogData,
//     loading,
//     error,
//   } = useFetch(`${getEnv("VITE_API_BASE_URL")}/backend/blog/blogs`, {
//     method: "GET",
//     credentials: "include",
//   });

//   const { data: categoryData } = useFetch(
//     `${getEnv("VITE_API_BASE_URL")}/backend/category/getall`,
//     { method: "GET" },
//   );

//   // Map category_id -> category object, so we can resolve names for each blog
//   const categoryMap = useMemo(() => {
//     const map = {};
//     categoryData?.categories?.forEach((cat) => {
//       map[cat.category_id || cat.id] = cat;
//     });
//     return map;
//   }, [categoryData]);

//   // Helper: get a display-friendly category name for a blog,
//   // whether the blog stores category_id, categoryId, or a nested category object
//   const getCategoryName = (blog) => {
//     if (blog.category?.name) return blog.category.name; // nested object case
//     if (blog.category_name) return blog.category_name; // flat field case
//     const id = blog.category_id || blog.categoryId;
//     return categoryMap[id]?.name || "Uncategorized";
//   };

//   // Build filter list from actual categories endpoint (preferred, always accurate)
//   const categories = useMemo(() => {
//     const names = categoryData?.categories?.map((cat) => cat.name) || [];
//     return ["All", ...names];
//   }, [categoryData]);

//   // Filter blogs by resolved category name
//   const filteredBlogs = useMemo(() => {
//     if (!blogData?.data?.length) return [];
//     if (activeCategory === "All") return blogData.data;
//     return blogData.data.filter(
//       (blog) => getCategoryName(blog) === activeCategory,
//     );
//   }, [blogData, activeCategory, categoryMap]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <section className="w-full py-20">
//         {/* Category filter menu */}
//         <div className="flex flex-wrap justify-center gap-3 lg:px-20 px-5 mb-6">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
//                 activeCategory === cat
//                   ? "bg-black text-white border-black"
//                   : "bg-white text-black border-gray-300 hover:bg-gray-100"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 lg:px-20 px-5 lg:py-10 px-5 my-10">
//           {filteredBlogs.length > 0 ? (
//             filteredBlogs.map((blog) => (
//               <BlogCard
//                 key={blog.id}
//                 blog={blog}
//                 categoryName={getCategoryName(blog)}
//               />
//             ))
//           ) : (
//             <div>Data Not Found!</div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

import React, { useState, useMemo } from "react";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import BlogCard from "@/components/BlogCard";
import { useFetch } from "@/hooks/useFetch";
// import { useParams } from "react-router-dom";

export default function BlogPage() {
  // const { slug } = useParams();
  const [activeCategory, setActiveCategory] = useState("All");

  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/backend/blog/blogs`, {
    method: "GET",
    credentials: "include",
  });

  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/category/getall`,
    { method: "GET" },
  );

  // Map category_id -> category object, so we can resolve names for each blog
  const categoryMap = useMemo(() => {
    const map = {};
    categoryData?.categories?.forEach((cat) => {
      map[cat.category_id || cat.id] = cat;
    });
    return map;
  }, [categoryData]);

  // Helper: get a display-friendly category name for a blog,
  // whether the blog stores category_id, categoryId, or a nested category object
  const getCategoryName = (blog) => {
    if (blog.category?.name) return blog.category.name; // nested object case
    if (blog.category_name) return blog.category_name; // flat field case
    const id = blog.category_id || blog.categoryId;
    return categoryMap[id]?.name || "Uncategorized";
  };

  // Build filter list from actual categories endpoint (preferred, always accurate)
  const categories = useMemo(() => {
    const names = categoryData?.categories?.map((cat) => cat.name) || [];
    return ["All", ...names];
  }, [categoryData]);

  // Filter blogs by resolved category name
  const filteredBlogs = useMemo(() => {
    if (!blogData?.data?.length) return [];
    if (activeCategory === "All") return blogData.data;
    return blogData.data.filter(
      (blog) => getCategoryName(blog) === activeCategory,
    );
  }, [blogData, activeCategory, categoryMap]);

  if (loading) return <Loading />;

  return (
    <section className="relative overflow-hidden bg-[#07111E] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
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
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our Blog
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-400 sm:text-base">
            Insights, guides, and updates from our team.
          </p>
        </div>

        {/* Category filter menu */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-emerald-400 text-[#04342C] shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)]"
                  : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-emerald-400/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                categoryName={getCategoryName(blog)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400">
              Data Not Found!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
