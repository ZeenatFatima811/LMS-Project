/* eslint-disable @next/next/no-img-element */
import { styles } from "@/app/styles/styles";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Loader from "../../Loader/Loader";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/features/layout/layoutApi";


const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner?.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero-section updated successfully!");
    }
    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [data, isSuccess, refetch, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    const data = {
      type: "Banner",
      title,
      subTitle,
      image,
    };
    await editLayout(data);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center gap-8 overflow-hidden px-5 pb-20 pt-10 text-black dark:text-white 1000px:flex-row 1000px:gap-10 1000px:px-8 1000px:py-12">
          {/* Hero image */}
          <div className="relative z-10 flex w-full items-center justify-center 1000px:w-1/2">
            <div className="hero_animation relative flex aspect-square w-[min(78vw,420px)] items-center justify-center rounded-full 1000px:w-[min(42vw,560px)]">
              {image ? (
                <img
                  src={image}
                  alt="Banner"
                  className="pointer-events-none z-10 h-full w-full object-contain"
                />
              ) : null}
              <label htmlFor="banner" className="absolute bottom-5 right-5 z-20 cursor-pointer rounded-full bg-white/90 p-3 shadow-md dark:bg-[#171a2b]">
                {image ? (
                  <CiEdit className="text-[22px] text-black dark:text-white" />
                ) : (
                  <AiOutlineCamera className="text-[22px] text-black dark:text-white" />
                )}
              </label>
              <input
                type="file"
                name=""
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />
            </div>
          </div>
          {/* Hero copy */}
          <div className="relative z-10 flex w-full flex-col items-center text-center 1000px:w-1/2 1000px:items-start 1000px:text-left">
            <textarea
              className="block w-full resize-none bg-transparent px-2 py-2 text-[34px] font-[600] leading-[1.08] text-[#000000c7] outline-none dark:text-white md:text-[42px] 1000px:text-[46px] 1500px:text-[54px]"
              placeholder="Improve Your Online Learning Experience Better Instantly"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={4}
            />
            <textarea
              className="mt-5 w-full resize-none bg-transparent px-3 text-[14px] font-[600] leading-6 text-[#000000ac] outline-none dark:text-[#edfff4] md:text-[16px]"
              placeholder="Learn from the best instructors and take your skills to the next level."
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              rows={4}
            />

          </div>
          <div
              className={`${
                styles.button
              } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
              ${
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? "!cursor-pointer !bg-[#42d383]"
                  : "!cursor-not-allowed"
              }
              !rounded absolute bottom-5 right-5 z-20 1000px:bottom-8 1000px:right-8`}
              onClick={
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? handleEdit
                  : () => null
              }
            >
              Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditHero;
