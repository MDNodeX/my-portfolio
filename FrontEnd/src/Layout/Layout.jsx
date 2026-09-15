// import Footer from "@/components/Footer";
// import Topbar from "@/components/Topbar";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       {/* HEADER */}
//       <Topbar />

//       {/* PAGE CONTENT */}
//       <main className="w-full">
//         <Outlet />
//       </main>

//       {/* FOOTER */}
//       <Footer />
//     </div>
//   );
// };

// export default Layout;

import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { Outlet } from "react-router-dom";

const APP_BACKGROUND = `
  radial-gradient(circle at 12% 45%, rgba(62, 124, 177, 0.18) 0%, transparent 45%),
  radial-gradient(circle at 88% 30%, rgba(0, 48, 87, 0.35) 0%, transparent 55%),
  linear-gradient(160deg, #0A1628 0%, #050B14 100%)
`;

const Layout = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: APP_BACKGROUND }}
    >
      {/* HEADER */}
      <Topbar />

      {/* PAGE CONTENT */}
      <main className="w-full">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Layout;
