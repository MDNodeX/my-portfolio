// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useFetch } from "@/hooks/useFetch";
// import { getEnv } from "@/helpers/getEnv";
// import Loading from "@/components/Loading";
// import { AvatarImage, Avatar } from "@/components/ui/avatar";
// import Comment from "@/components/Comment";
// import CommentList from "@/components/CommentList";
// import moment from "moment";
// import CommentCount from "@/components/CommentCount";
// import LikeCount from "@/components/LikeCount";
// import RelatedBlog from "@/components/RelatedBlog";

// const SingleBlogDetails = () => {
//   const { id } = useParams();

//   // const userId = "user_id";

//   const [comments, setComments] = useState([]);

//   const { data, loading } = useFetch(
//     `${getEnv("VITE_API_BASE_URL")}/backend/blog/getsingleblog/${id}`,
//     {
//       method: "GET",
//       credentials: "include",
//     },
//   );

//   const categoryId = data?.data?.category_id;

//   console.log("category", categoryId);

//   // fetch comments only once
//   useEffect(() => {
//     const getComments = async () => {
//       try {
//         const res = await fetch(
//           `${getEnv("VITE_API_BASE_URL")}/backend/comment/get/${id}`,
//           {
//             method: "GET",
//             credentials: "include",
//           },
//         );

//         const data = await res.json();
//         setComments(data.comments || []);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getComments();
//   }, [id]);

//   if (loading) return <Loading />;

//   return (
//     <div className="md:flex-nowrap flex-wrap flex justify-between gap-10 w-full max-w-7xl mx-auto space-y-6 lg:px-0 md:px-10 px-6 py-10 ">
//       {data?.data && (
//         <>
//           <div className="border rounded lg:w-[70%] p-4">
//             <h2 className="text-2xl font-bold mb-4">{data.data.title}</h2>

//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-4">
//                 <Avatar>
//                   <AvatarImage src={data.data.author_avatar} />
//                 </Avatar>
//                 <div>
//                   <p>{data.data.author_name}</p>
//                   <p>
//                     Date: {moment(data.data.created_at).format("DD-MM-YYYY")}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <LikeCount blogId={data.data.id} />
//                 {/* userId={userId} */}
//                 <CommentCount blogId={data.data.id} />
//               </div>
//             </div>

//             <div className="my-4">
//               <img className="rounded" src={data.data.featured_image} alt="" />
//             </div>

//             <div
//               className="mt-4"
//               dangerouslySetInnerHTML={{ __html: data.data.content }}
//             />

//             <div className="border-t mt-4 pt-4">
//               <Comment
//                 blogId={data.data.id}
//                 comments={comments}
//                 setComments={setComments}
//               />
//             </div>

//             <div className="border-t mt-4 pt-4">
//               <CommentList comments={comments} />
//             </div>
//           </div>
//         </>
//       )}

//       <div className="border rounded lg:w-[30%] w-full p-4">
//         <RelatedBlog categoryId={categoryId} />
//       </div>
//     </div>
//   );
// };

// export default SingleBlogDetails;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Comment from "@/components/Comment";
import CommentList from "@/components/CommentList";
import moment from "moment";
import CommentCount from "@/components/CommentCount";
import LikeCount from "@/components/LikeCount";
import RelatedBlog from "@/components/RelatedBlog";
import { MdCalendarMonth, MdOutlineAccessTime } from "react-icons/md";

const getReadingTime = (html = "") => {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

const SingleBlogDetails = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/backend/blog/getsingleblog/${id}`,
    { method: "GET", credentials: "include" },
  );

  const categoryId = data?.data?.category_id;

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/backend/comment/get/${id}`,
          { method: "GET", credentials: "include" },
        );
        const resData = await res.json();
        setComments(resData.comments || []);
      } catch (error) {
        console.error(error);
      }
    };
    getComments();
  }, [id]);

  if (loading) return <Loading />;

  const blog = data?.data;
  if (!blog) return null;

  return (
    <div className="relative min-h-screen w-full bg-[#07111E]">
      {/* Decorative layer — isolated in its own overflow-hidden wrapper so
          it never becomes an ancestor of the sticky sidebar below (any
          ancestor with overflow != visible breaks position: sticky). */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:px-8 lg:py-16">
        {/* MAIN ARTICLE COLUMN */}
        <article className="w-full rounded-2xl border border-white/[0.06] bg-[#091424] p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] sm:p-10 lg:w-[70%]">
          {/* Title */}
          <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {blog.title}
          </h1>

          {/* Meta row */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-1 ring-white/10">
                <AvatarImage src={blog.author_avatar} />
                <AvatarFallback className="bg-white/10 text-white">
                  {blog.author_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-white">
                  {blog.author_name}
                </p>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MdCalendarMonth className="h-3.5 w-3.5" />
                    {moment(blog.created_at).format("DD MMM YYYY")}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdOutlineAccessTime className="h-3.5 w-3.5" />
                    {getReadingTime(blog.content)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-400">
              <LikeCount blogId={blog.id} />
              <CommentCount blogId={blog.id} />
            </div>
          </div>

          {/* Featured image with floating category badge */}
          {blog.featured_image && (
            <div className="relative mb-8 w-full overflow-hidden rounded-xl">
              <img
                className="h-auto max-h-[480px] w-full object-cover"
                src={blog.featured_image}
                alt={blog.title}
              />

              {blog.category_name && (
                <span className="absolute left-4 top-4 rounded-full border border-emerald-400/20 bg-emerald-400/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-400 backdrop-blur-sm">
                  {blog.category_name}
                </span>
              )}
            </div>
          )}

          {/* Body content — constrained measure for readability */}
          <div
            className="prose prose-invert mx-auto max-w-[70ch] prose-headings:font-bold prose-p:leading-relaxed prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-emerald-400/40 prose-blockquote:text-slate-400 prose-code:text-emerald-400 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Author bio card */}
          <div className="mt-10 flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
            <Avatar className="h-12 w-12 ring-1 ring-white/10">
              <AvatarImage src={blog.author_avatar} />
              <AvatarFallback className="bg-white/10 text-white">
                {blog.author_name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-white">
                Written by {blog.author_name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Thanks for reading — feel free to leave a comment below.
              </p>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-10 border-t border-white/[0.06] pt-8">
            <h3 className="mb-4 text-lg font-bold text-white">
              Leave a Comment
            </h3>
            <Comment
              blogId={blog.id}
              comments={comments}
              setComments={setComments}
            />
          </div>

          <div className="mt-8 border-t border-white/[0.06] pt-8">
            <h3 className="mb-4 text-lg font-bold text-white">Comments</h3>
            <CommentList comments={comments} />
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="w-full self-start lg:sticky lg:top-24 lg:h-fit lg:w-[30%]">
          <div className="rounded-2xl border border-white/[0.06] bg-[#091424] p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]">
            <RelatedBlog categoryId={categoryId} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SingleBlogDetails;
