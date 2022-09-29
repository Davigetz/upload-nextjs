import React, { useEffect, useState } from "react";
import styles from "../../../styles/FilePreview.module.css";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

const FilePreview = () => {
  const data = useAppSelector((state: RootState) => state.drops);
  return (
    <div className={styles.fileList}>
      <ol style={{ padding: 0 }} className={styles.fileList}>
        {/* @ts-ignore */}
        {data.fileList[0] && (
          // @ts-ignore
          <li key={data.fileList[0].data.name}>{data.fileList[0].data.name}</li>
        )}
      </ol>
    </div>
  );
};

export default FilePreview;
