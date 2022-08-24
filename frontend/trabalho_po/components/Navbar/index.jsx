import { FiArrowLeft } from "react-icons/fi";
import styles from "./styles.module.scss";

export function Navbar(props) {
  const { onGoBackButton } = props;

  return (
    <header className={styles.navbar}>
      <button className={styles.navbar__goBackButton} onClick={onGoBackButton}>
        <FiArrowLeft /> Voltar
      </button>
    </header>
  );
}
