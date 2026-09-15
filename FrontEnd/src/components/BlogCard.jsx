// import React from "react";
// import { Card, CardContent } from "./ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
// import { MdCalendarMonth, MdOutlineAccessTime } from "react-icons/md";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import { RouteBlogDetails } from "@/helpers/RouteName";

// // Rough reading time estimate from HTML content
// const getReadingTime = (html = "") => {
//   const text = html.replace(/<[^>]+>/g, " ");
//   const words = text.trim().split(/\s+/).filter(Boolean).length;
//   const minutes = Math.max(1, Math.round(words / 200));
//   return `${minutes} min read`;
// };

// const BlogCard = ({ blog, categoryName }) => {
//   return (
//     <Link to={RouteBlogDetails(blog.id)} className="w-full group">
//       <Card className="p-0 overflow-hidden border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl">
//         {/* Image with floating category badge */}
//         <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
//           {blog.featured_image ? (
//             <img
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
//               src={blog.featured_image}
//               alt={blog.title}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
//               No image
//             </div>
//           )}

//           {categoryName && (
//             <span className="absolute top-3 left-3 rounded-full bg-black/70 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wide px-3 py-1">
//               {categoryName}
//             </span>
//           )}

//           {blog.author_role === "admin" && (
//             <Badge
//               variant="outline"
//               className="absolute top-3 right-3 bg-white/90 border-none text-violet-600 text-[10px] font-semibold"
//             >
//               Admin
//             </Badge>
//           )}
//         </div>

//         <CardContent className="p-5">
//           {/* Title */}
//           <h2 className="text-lg font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-brand-crimson transition-colors">
//             {blog.title}
//           </h2>

//           {/* Excerpt (optional field, falls back gracefully if not present) */}
//           {blog.excerpt && (
//             <p className="mt-2 text-sm text-slate-500 line-clamp-2">
//               {blog.excerpt}
//             </p>
//           )}

//           {/* Meta row */}
//           <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
//             <div className="flex items-center gap-2.5">
//               <Avatar className="h-7 w-7">
//                 <AvatarImage
//                   src={blog.author_avatar || "../assets/images/user.png"}
//                   alt={blog.author_name}
//                 />
//                 <AvatarFallback className="text-[10px]">
//                   {blog.author_name?.[0] || "U"}
//                 </AvatarFallback>
//               </Avatar>
//               <span className="text-xs font-medium text-slate-700">
//                 {blog.author_name}
//               </span>
//             </div>

//             <div className="flex items-center gap-3 text-[11px] text-slate-400">
//               <span className="flex items-center gap-1">
//                 <MdCalendarMonth className="h-3.5 w-3.5" />
//                 {moment(blog.created_at).format("DD MMM YYYY")}
//               </span>
//               {blog.content && (
//                 <span className="hidden sm:flex items-center gap-1">
//                   <MdOutlineAccessTime className="h-3.5 w-3.5" />
//                   {getReadingTime(blog.content)}
//                 </span>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// };

// export default BlogCard;

// import React from "react";
// import { Card, CardContent } from "./ui/card";
// import { Badge } from "@/components/ui/badge";
// import { useSelector } from "react-redux";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { MdCalendarMonth } from "react-icons/md";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import {
//   RouteBlog,
//   RouteBlogDetails,
//   RouteBlogPage,
// } from "@/helpers/RouteName";

// const BlogCard = ({ blog }) => {
//   return (
//     <Link to={RouteBlogDetails(blog.id)} className="w-full">
//       <Card className="pt-5">
//         <CardContent>
//           {/* Author Info and Admin Badge */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <Avatar>
//                 <AvatarImage
//                   src={blog.author_avatar || "../assets/images/user.png"}
//                   alt={blog.author_name}
//                 />
//               </Avatar>
//               <div className="flex flex-col text-sm">
//                 <span className="font-medium">{blog.author_name}</span>
//                 <span className="text-gray-500">
//                   {moment(blog.created_at).fromNow()}
//                 </span>
//               </div>
//             </div>

//             {blog.author_role === "admin" && (
//               <Badge variant="outline" className="bg-violet-500">
//                 Admin
//               </Badge>
//             )}
//           </div>

//           {/* Featured Image */}
//           {blog.featured_image && (
//             <div className="flex justify-center w-full my-4">
//               <img
//                 className="rounded max-w-full h-auto"
//                 src={blog.featured_image}
//                 alt={blog.title}
//               />
//             </div>
//           )}

//           {/* Blog Title and Date */}
//           <div className="mt-4">
//             <p className="flex items-center gap-2 mb-2 text-sm text-gray-500">
//               <MdCalendarMonth />
//               <span>{moment(blog.created_at).format("DD-MM-YYYY")}</span>
//             </p>
//             <h2 className="text-2xl font-bold line-clamp-2">{blog.title}</h2>
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// };

// export default BlogCard;

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { MdCalendarMonth, MdOutlineAccessTime } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

// Rough reading time estimate from HTML content
const getReadingTime = (html = "") => {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const BlogCard = ({ blog, categoryName }) => {
  return (
    <Link to={RouteBlogDetails(blog.id)} className="w-full group">
      <Card className="group relative p-0 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#091424] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.35)]">
        {/* Image with floating category badge */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-white/[0.03]">
          {blog.featured_image ? (
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              src={blog.featured_image}
              alt={blog.title}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600 text-sm">
              No image
            </div>
          )}

          {/* subtle bottom fade so image blends into the dark card */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#091424] via-transparent to-transparent opacity-60" />

          {categoryName && (
            <span className="absolute top-3 left-3 rounded-full bg-emerald-400/15 backdrop-blur-sm text-emerald-400 text-[11px] font-semibold uppercase tracking-wide px-3 py-1 border border-emerald-400/20">
              {categoryName}
            </span>
          )}

          {blog.author_role === "admin" && (
            <span className="absolute top-3 right-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-[10px] font-semibold px-2.5 py-1">
              Admin
            </span>
          )}
        </div>

        <CardContent className="p-5">
          {/* Title */}
          <h2 className="text-lg font-bold leading-snug text-white line-clamp-2 group-hover:text-emerald-400 transition-colors">
            {blog.title}
          </h2>

          {/* Excerpt (optional field, falls back gracefully if not present) */}
          {blog.excerpt && (
            <p className="mt-2 text-sm text-slate-400 line-clamp-2">
              {blog.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-7 w-7 ring-1 ring-white/10">
                <AvatarImage
                  src={blog.author_avatar || "../assets/images/user.png"}
                  alt={blog.author_name}
                />
                <AvatarFallback className="text-[10px] bg-white/10 text-white">
                  {blog.author_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-slate-300">
                {blog.author_name}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <MdCalendarMonth className="h-3.5 w-3.5" />
                {moment(blog.created_at).format("DD MMM YYYY")}
              </span>
              {blog.content && (
                <span className="hidden sm:flex items-center gap-1">
                  <MdOutlineAccessTime className="h-3.5 w-3.5" />
                  {getReadingTime(blog.content)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
