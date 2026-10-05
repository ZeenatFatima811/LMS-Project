import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestionToCourse,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getAllCoursesAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { updateAccessToken } from "../controllers/user.controller";
const CourseRouter = express.Router();
CourseRouter.post(
  "/create-course",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
// CourseRouter.post(
//   "/create-course",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   uploadCourse
// );
CourseRouter.put(
  "/edit-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
// CourseRouter.put(
//   "/edit-course/:id",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   editCourse
// );
CourseRouter.get("/get-course/:id", getSingleCourse);
CourseRouter.get("/get-courses", getAllCourses);
CourseRouter.get(
  "/get-course-content/:id",
  updateAccessToken,
  isAuthenticated,
  getCourseByUser
);
// CourseRouter.get(
//   "/get-course-content/:id",
//   isAuthenticated,
//   getCourseByUser
// );
CourseRouter.put(
  "/add-question",
  updateAccessToken,
  isAuthenticated,
  addQuestionToCourse
);
// CourseRouter.put(
//   "/add-question",
//   isAuthenticated,
//   addQuestionToCourse
// );
CourseRouter.put("/add-answer", updateAccessToken, isAuthenticated, addAnswer);
// CourseRouter.put("/add-answer",isAuthenticated, addAnswer);
CourseRouter.put(
  "/add-review/:id",
  updateAccessToken,
  isAuthenticated,
  addReview
);
// CourseRouter.put(
//   "/add-review/:id",
//   isAuthenticated,
//   addReview
// );
CourseRouter.put(
  "/add-reply",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);
// CourseRouter.put(
//   "/add-reply/:id",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   addReplyToReview
// );
CourseRouter.get(
  "/get-all-courses",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesAdmin
);
// CourseRouter.get(
//   "/get-all-courses",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   getAllCoursesAdmin
// );
CourseRouter.post("/get-VdoCypherOTP", generateVideoUrl);
CourseRouter.delete(
  "/delete-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);
export default CourseRouter;