import ModalStyle from "../../../styles/modal.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { setModal } from "./modalSlice";

export default function Modal() {
  const dispatch = useAppDispatch();
  const ActualNumber = useAppSelector(
    (state: RootState) => state.modal.actualNumber
  );

  return (
    <div
      className={ModalStyle.BGdark}
      //   onClick={() => dispatch(setModal(false))}
    >
      <div className={ModalStyle.centered}>
        <div className={ModalStyle.modal}>
          {" "}
          <div className={ModalStyle.modalHeader}>
            <h5 className={ModalStyle.heading}>Uploading</h5>
            <button
              className={ModalStyle.closeBtn}
              onClick={() => dispatch(setModal(false))}
            >
              X
            </button>
            <div className={ModalStyle.modalContent}>
              <div className={ModalStyle.percent}>
                <svg
                  className={ModalStyle.svgs}
                  width="300"
                  height="300"
                  // viewBox="0 0 100 100"
                >
                  <circle cx="140" cy="120" r="100"></circle>
                  <circle cx="140" cy="120" r="100"></circle>
                </svg>
                <div
                  className={ModalStyle.num}
                  style={
                    {
                      "--number-actual": `${ActualNumber}`,
                    } as React.CSSProperties
                  }
                >
                  <h2>
                    {ActualNumber}
                    <span>%</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
