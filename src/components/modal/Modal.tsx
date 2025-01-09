import styles from "./Modal.module.css";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  closeModal: () => void;
  openModal: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  closeModal,
  openModal,
}) => {
  return (
    <div
      className={`${styles["modal-overlay"]} ${openModal ? styles.open : ""}`}
    >
      <div
        className={`${styles["modal-content"]} ${openModal ? styles.open : ""}`}
      >
        <div className={styles["modal-header"]}>
          <h2>{title}</h2>
          <button onClick={closeModal} className={styles["close-modal"]}>
            <FaTimes />
          </button>
        </div>
        <div className={styles["modal-body"]}>{children}</div>
        <div className={styles["modal-footer"]}>
          <button onClick={closeModal} className={styles["close-modal"]}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
