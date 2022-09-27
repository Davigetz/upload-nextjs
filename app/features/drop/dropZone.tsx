import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { addFileToList, pics, setInDropZone } from "./dropSlice";
import estilo from "../../../styles/drop.module.css";
import { Svg } from "./upload";
import FilePreview from "./FilePreview";
import axios from "axios";
import { setModal, setNumber } from "../modal/modalSlice";
import Image from "next/image";
import { useRouter } from "next/router";

const DropZone = () => {
  const data = useAppSelector((state: RootState) => state.drops);
  const router = useRouter();
  const [pictures, setPictures] = useState<any>([]);
  const dispatch = useAppDispatch();
  const handleDragEnter = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setInDropZone(true));
  };

  const handleDragLeave = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(setInDropZone(false));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f: any) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add droped file or files to fileList
      dispatch(addFileToList(files));
      // reset inDropZone to false
      dispatch(setInDropZone(false));
    }
  };

  const handleFileSelect = (e: any) => {
    // get files from event on the input element as an array
    // @ts-ignore
    let files = [...e.currentTarget!.files];
    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f: any) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));
      dispatch(addFileToList(files));

      // dispatch action to add selected file or files to fileList
    }
  };

  const uploadFiles = async () => {
    // get the files from the fileList as an array
    let files = data.fileList;

    //  ini form data
    const formData = new FormData();
    files.forEach((file: any) => formData.append("theFiles", file));
    // Upload the files as a POST request to the server using fetch
    // Note: /api/fileupload is not a real endpoint, it is just an example
    // Esto es lo que hay complementar con el otro lado para evitar este mal entendido en el endpoint

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: ProgressEvent) => {
        const progress = Math.round((event.loaded * 100) / event.total);

        document.documentElement.style.setProperty(
          "--number-actual",
          `${progress}`
        );
        dispatch(setNumber(progress));
        if (progress === 100) {
          dispatch(setModal(false));
        } else if (progress < 100) {
          dispatch(setModal(true));
        }
      },
    };
    const response = await axios.post("/api/fileupload", formData, config);
    const filesS = response.data.data;
    if (response.status === 200) {
      const names = filesS.map((a: any) => a.originalname);
      dispatch(pics(names));
      router.push("/uploaded");
    }
  };

  return (
    <div className={estilo.container}>
      <div
        className={estilo.dropzone}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <h1 className={estilo.titulo}>Upload your image</h1>
        <p className={estilo.subtitulo}>File should be Jpg, Png...</p>
        <div className={estilo.drop_zone}>
          <Svg />
          <p className={estilo.drag}>Drag &amp; Drop your image here</p>
        </div>

        <input
          id="fileSelect"
          type="file"
          multiple
          className={estilo.files}
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="fileSelect" className={estilo.drag}>
          You can select multiple Files
        </label>

        {data.fileList.length > 0 && (
          <button className={estilo.uploadBtn} onClick={uploadFiles}>
            Upload
          </button>
        )}

        <FilePreview />
      </div>
    </div>
  );
};

export default DropZone;
