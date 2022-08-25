import { AiOutlineCloudUpload } from "react-icons/ai";
import styles from "./styles.module.scss";

export default function UploadButton(props) {
  const { onChange } = props;

  return (
    <label className={styles.uploadFileButton}>
      Selecione o arquivo
      <AiOutlineCloudUpload />
      <input type="file" onChange={onChange} accept=".ods,.xslx" />
    </label>
  );
}
