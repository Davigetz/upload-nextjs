import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import dropSlice from "../app/features/drop/dropSlice";
import DropZone from "../app/features/drop/dropZone";
import Modal from "../app/features/modal/modal";
import { setModal } from "../app/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const isOpen = useAppSelector((state: RootState) => state.modal.isOpen);
  const removeTemporalyFiles = async () => {
    await axios.delete("/api/deleteFiles");
  };
  useEffect(() => {
    window.addEventListener("beforeunload", removeTemporalyFiles);
    return () => {
      window.removeEventListener("beforeunload", removeTemporalyFiles);
    };
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Drag And Drop File Upload</title>
        <meta name="description" content="Nextjs drag and drop file upload" />
      </Head>
      <main>
        <h1 style={{ textAlign: "center" }}>Drag and Drop File Upload</h1>
        <DropZone />
      </main>
      {isOpen && <Modal />}
      <footer className={styles.footer}>
        <div>{new Date().getFullYear()}</div>
      </footer>
    </div>
  );
};

export default Home;
