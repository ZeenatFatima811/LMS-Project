import { Response } from "express";
import CourseModel from "../models/course.model";
//create course
export const createCourse = async (data: any) => CourseModel.create(data);

export const getAllCoursesService = async (res: Response) => {
    const courses = await CourseModel.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        courses,
    })
};