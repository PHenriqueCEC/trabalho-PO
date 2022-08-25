import { BiErrorCircle } from "react-icons/bi";
import styles from "./styles.module.scss";

export function ErrorAlert(props) {
  const { children } = props;

  return (
    <div className="custom-container">
      <div className={`${styles.errorAlert}`}>
        {children} <BiErrorCircle />
      </div>
    </div>
  );
}
