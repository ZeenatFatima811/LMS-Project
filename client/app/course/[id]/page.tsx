// "use client";
// import { use } from "react";
// import CourseDetailsPage from "../../components/Courses/CourseDetailsPage";

// type Props = {
//   params: Promise<{
//     id: string;
//   }>;
// };

// const Page = ({ params }: Props) => {
//   const { id } = use(params); 

//   return (
//     <div>
//       <CourseDetailsPage id={id} />
//     </div>
//   );
// };

// export default Page;


"use client";
import { use } from "react"; // You can remove this import if it's no longer used
import CourseDetailsPage from "../../components/Courses/CourseDetailsPage";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  // Destructure directly from params instead of using use()
  const { id } = params;

  return (
    <div>
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default Page;
