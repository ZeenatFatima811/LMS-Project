// "use client";
// import React from "react";
// import AdminSidebar from "../../../components/Admin/sideBar/AdminSideBar";
// import Heading from "../../../../app/utils/Heading";
// import EditCourse from "../../../components/Admin/Course/EditCourse";
// import DashboardHeader from "../../../components/Admin/DashboardHeader";

// const Page = (params: { id: string }) => {
//   const { id } = params;

//   return (
//     <div>
//       <Heading
//         title="Edit Course - Admin"
//         description="Edit a course on ELearning platform."
//         keywords="ELearning, create course, online learning, education, courses, tutorials, training"
//       />
//       <div className="flex ">
//         <div className="1500px:w-[16%] w-1/5">
//           <AdminSidebar />
//         </div>
//         <div className="w-[85%]">
//           <DashboardHeader />
//           <EditCourse id={id} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;



"use client";

import AdminSidebar from "../../../components/Admin/sideBar/AdminSideBar";
import Heading from "../../../../app/utils/Heading";
import EditCourse from "../../../components/Admin/Course/EditCourse";
import DashboardHeader from "../../../components/Admin/DashboardHeader";

const Page = ({ params }: { params: { id: string } }) => {

  return (
    <div>
      <Heading
        title="Create Course - Admin"
        description="Create a new course on ELearning platform."
        keywords="ELearning, create course, online learning, education, courses, tutorials, training"
      />

      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>

        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default Page;