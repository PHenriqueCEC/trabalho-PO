import { AiOutlineDownload } from "react-icons/ai";
import styles from "./styles.module.scss";

export default function DownloadButton(props) {
  const { href, children } = props;

  return (
    <a className={styles.downloadButton} href={href} download>
      {children}
      <AiOutlineDownload />
    </a>
  );
}
