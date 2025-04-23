import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import { Text, Title } from "@mantine/core";

function personSlide({
    id,
    gender,
    name,
    original_name,
    profile_path,
    character,
}) {
    return (
        <div>
            <img src={profile_path} alt={`a picture of ${name}`} />
            <Title order={1}  c={"white"}>{name}</Title>
            <Text>{character}</Text>
        </div>
    )
}