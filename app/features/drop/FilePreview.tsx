import React, { useEffect, useState } from "react";
import styles from "../../../styles/FilePreview.module.css";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

const FilePreview = () => {
  const data = useAppSelector((state: RootState) => state.drops);
  return (
    <div className={styles.fileList}>
      <ol style={{ padding: 0 }} className={styles.fileList}>
        {data.fileList?.map((f: any) => {
          return (
            <li key={f.name}>
              {/* display the filename and type */}
              {f.name}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default FilePreview;
