import { styles } from "@/app/styles/styles";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

type verifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  //   "4": string;
  //   "5": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data?.message || "Something went wrong");
      }else{
        console.log("An error occurred: ", error);
      }
    }
  }, [isSuccess, error, setRoute]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHanler = async () => {
    const verificationNumber=Object.values(verifyNumber).join("");
    if(verificationNumber.length !== 4){
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    })

  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value == "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={30} />
        </div>
      </div>
      <br />
      <br />
      {/* Four OTP inputs */}
      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="text"
            inputMode="numeric"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError
                ? "shake border-red-500"
                : "dark:border-white border-[#0000004a]"
            }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof verifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      {/* Verify button */}
      <div className="w-full flex justify-center">
        <button className={`${styles.button}`} onClick={verificationHanler}>
          Verify OTP
        </button>
      </div>
      <br />
      {/* Go back footer link */}
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go Back to sign in?
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          SignIn
        </span>
      </h5>
    </div>
  );
};

export default Verification;
