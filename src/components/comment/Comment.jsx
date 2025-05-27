import {
  Box,
  Button,
  Collapse,
  Loader,
  Rating,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import styles from "./comment.module.css";
import * as api from "../../utils/apiHelper";

import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import ImgPlaceholder from "../placeholder/ImgPlaceholder";

export default function Comment(props) {
  const {
    id,
    page: initialPage,
    results = [],
    total_pages,
    total_results,
  } = props.data;
  const [opened, { toggle, close }] = useDisclosure(false);
  const [page, setPage] = useState(initialPage);
  const [comments, setComments] = useState(results);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setComments(results);
    setPage(initialPage);
    setLoading(false);
    close();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const renderComments = (data) =>
    data.map(
      ({
        id,
        author,
        author_details: { avatar_path, name, rating } = {},
        content,
        created_at,
        url,
      }) => {
        const avatar = api.getImage(avatar_path, "w45") || null;

        return (
          <Box key={id} className={styles.comment}>
            <Box className={styles["comment-header"]}>
              <Box className={styles.row}>
                {avatar ? (
                  <img
                    src={avatar}
                    alt="user profile image"
                    className={styles.avatar}
                  />
                ) : (
                  <ImgPlaceholder type="person" variant="review" />
                )}
                <Box className={styles.info}>
                  <Text fw={700} size="lg">
                    {author}
                  </Text>
                  <Rating value={rating / 2} color="white" readOnly></Rating>
                </Box>
              </Box>
              <Text>{formatDate(created_at)}</Text>
            </Box>
            <Text>{content}</Text>
          </Box>
        );
      }
    );

  const handleViewMore = async () => {
    if (!opened) {
      toggle();
    }

    if (opened && page < total_pages) {
      setLoading(true);
      const res = await api.fetchReviewsById(id, props.mediaType, page + 1);

      if (res.error) {
        console.error("Something went wrong fetching more comments");
        setLoading(false);
        return;
      }

      setPage(page + 1);
      setComments((prev) => [...prev, ...res.results]);
      setLoading(false);
    }
  };

  return (
    <Box p={10} m={20}>
      <Box className={styles.row} mb={15}>
        <Title order={2} pos={"relative"} mr={10} c={"white"}>
          Reviews
        </Title>
        <Text order={1} className={styles.count}>
          {total_results}
        </Text>
      </Box>
      {comments.length === 0 ? (
        <Box key={id} className={styles.comment}>
          <Text fw={700} size="lg" ta={"center"} p={10}>
            No Reviews available.
          </Text>
        </Box>
      ) : (
        <>
          {renderComments([comments[0]])}
          <Collapse in={opened}>{renderComments(comments.slice(1))}</Collapse>
          {loading && (
            <Box className={`${styles.row} ${styles.center}`}>
              <Loader type="dots" color="white" size="xl" />
            </Box>
          )}
          {total_results > 1 && (
            <Box className={`${styles.row} ${styles.sb}`} p={10}>
              <Button
                p={0}
                fz={"md"}
                fw={"bold"}
                color="gray"
                variant="transparent"
                rightSection={<FaAngleUp />}
                onClick={close}
                className={`${styles.collapse} ${
                  opened ? styles.visible : styles.hidden
                }`}
              >
                Collapse
              </Button>
              {(!opened || page != total_pages) && (
                <Button
                  p={0}
                  fz={"md"}
                  fw={"bold"}
                  color="gray"
                  variant="transparent"
                  rightSection={<FaAngleDown />}
                  onClick={handleViewMore}
                >
                  View More
                </Button>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
