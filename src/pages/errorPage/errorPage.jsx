import { useRouteError } from "react-router-dom";
import styles from "./errorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles["error-page"]}>
      <div className={styles.info}>
        <h2 className={styles.status}>{error.status}</h2>
        <p className={styles["status-text"]}>{error.statusText}</p>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    </div>
  );
}
