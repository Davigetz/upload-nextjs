import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import estilo from "../styles/drop.module.css";

export const Uploaded = () => {
  const [buttonText, setButtonText] = useState("Copy Link");
  const pics = useAppSelector((state: RootState) => state.drops.pics);
  const router = useRouter();
  useEffect(() => {
    if (pics.length === 0) {
      router.push("/");
    }
  }, [pics]);

  const handleClick = async ({ pic }: { pic: string }) => {
    navigator.clipboard.writeText(
      `http://localhost:3000/_next/image?url=%2Fuploads%2F${pic}&w=640&q=75`
    );
    setButtonText("Copied!");
    await setTimeout(() => {
      setButtonText("Copy Link");
    }, 2000);
  };
  return (
    <>
      <div className={estilo.containerImgs}>
        <h1 className={estilo.titulo}>Uploaded images</h1>
        {pics.map((pic: any, i: any) => (
          <div key={i}>
            <Image
              src={`/uploads/${pic}`}
              alt={`${pic}`}
              layout="intrinsic"
              width={300}
              height={300}
            />
            <div className={estilo.linked}>
              <button
                className={estilo.clicked}
                type="button"
                onClick={() => handleClick({ pic })}
              >
                {buttonText}
              </button>
            </div>
          </div>
        ))}

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
