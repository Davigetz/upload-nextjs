import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import estilo from "../styles/drop.module.css";

export const Uploaded = () => {
  const [buttonText, setButtonText] = useState("Copy Link");
  const pic = useAppSelector((state: RootState) => state.drops.pics);
  console.log(pic);
  const router = useRouter();
  useEffect(() => {
    if (!pic.id) {
      router.push("/");
    }
  }, [pic]);

  const handleClick = async (url: string) => {
    navigator.clipboard.writeText(`${url}`);
    setButtonText("Copied!");
    await setTimeout(() => {
      setButtonText("Copy Link");
    }, 2000);
  };
  return (
    <>
      <div className={estilo.containerImgs}>
        <h1 className={estilo.titulo}>Uploaded images</h1>
        <div key={pic.id}>
          <Image
            src={pic.url!}
            alt={pic.name!}
            layout="intrinsic"
            width={300}
            height={300}
          />
          <div className={estilo.linked}>
            <button
              className={estilo.clicked}
              type="button"
              onClick={() => handleClick(pic.url!)}
            >
              {buttonText}
            </button>
          </div>
        </div>

        <button
          onClick={(e: React.FormEvent) => {
            e.preventDefault();
            router.push("/");
          }}
          className={estilo.clicked}
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default Uploaded;
