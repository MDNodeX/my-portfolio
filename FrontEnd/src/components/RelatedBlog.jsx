// import { getEnv } from "@/helpers/getEnv";
// import { useFetch } from "@/hooks/useFetch";
// import React from "react";

// const RelatedBlog = ({ categoryId }) => {
//   const { data, loading } = useFetch(
//     `${getEnv("VITE_API_BASE_URL")}/backend/blog/get-related-blog/${categoryId}`,
//     {
//       method: "GET",
//       credentials: "include",
//     },
//   );

//   console.log(data);

//   return (
//     <div>
//       <h2 className="text-2xl font-blod">Related Blogs</h2>
//       <div className="flex items-center gap-2">
//         <img src="" alt="" />
//         <h4></h4>
//       </div>
//     </div>
//   );
// };

// export default RelatedBlog;
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Link } from "react-router-dom";

const RelatedBlog = ({ categoryId }) => {
  const { data, loading } = useFetch(
    `${getEnv(
      "VITE_API_BASE_URL",
    )}/backend/blog/get-related-blog/${categoryId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (loading) {
    return <p className="text-sm text-slate-500">Loading...</p>;
  }

  return (
    <div>
      <h2 className="border-b border-white/[0.06] pb-3 text-lg font-bold text-white">
        Related Blogs
      </h2>

      <div className="mt-2 flex flex-col">
        {data?.data?.map((blog) => (
          <Link
            to={`/blog/${blog.id}`}
            key={blog.id}
            className="group flex items-center gap-3 rounded-xl p-2 transition-all duration-300 hover:bg-emerald-400/[0.06]"
          >
            <div className="h-14 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-white/[0.06]">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
            <h4 className="text-sm font-semibold leading-snug text-slate-300 line-clamp-2 transition-colors duration-300 group-hover:text-emerald-400">
              {blog.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedBlog;
