import { Box, Rating, Text, Title } from "@mantine/core";
import styles from "./comment.module.css";
import * as api from "../../utils/apiHelper";

export default function Comment(props) {
  const { results = [] } = props.data;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const comments = results.map(
    ({
      id,
      author,
      author_details: { avatar_path, name, rating } = {},
      content,
      created_at,
      url,
    }) => {
      const avatar = api.getImage(avatar_path, "w45") || "./avatar.png";

      return (
        <Box key={id} className={styles.comment}>
          <Box className={styles["comment-header"]}>
            <img
              src={avatar}
              alt="user profile image"
              className={styles.avatar}
            />
            <Box className={styles.info}>
              <Text fw={700} size="lg">{author}</Text>
              <Box className={styles.row}>
                <Rating value={rating / 2} color="white" readOnly></Rating>
                <Text>{formatDate(created_at)}</Text>
              </Box>
            </Box>
          </Box>
          <Text>{content}</Text>
        </Box>
      );
    }
  );

  return (
    <Box p={10} m={20}>
      <Title order={1} pos={"relative"} mb={15}>
        Reviews
      </Title>
      {comments}
    </Box>
  );
}
