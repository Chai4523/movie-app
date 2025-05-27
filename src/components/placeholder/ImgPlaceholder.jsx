import { Box } from "@mantine/core";
import "@mantine/core/styles.css";
import styles from "./placeholder.module.css";

import { GoPerson } from "react-icons/go";
import { CiImageOff } from "react-icons/ci";

export default function ImgPlaceholder({ type, variant }) {
  const displayStyle = styles[variant] || styles.info;
  let displayIcon = null;

  switch (type) {
    case "poster":
      displayIcon = <CiImageOff size={70} />;
      break;

    case "person":
      displayIcon = <GoPerson size={70} />;
      break;

    default:
      displayIcon = "Resource not available";
      break;
  }
  return (
    <Box className={`${styles.container} ${displayStyle}`}>{displayIcon}</Box>
  );
}
