const ANILIST_API_URL = "https://graphql.anilist.co";

const TRENDING_MEDIA_QUERY = `
query($perPage: Int, $page: Int, $type: MediaType) {
    Page(page: $page, perPage: $perPage) {
        pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
        }
        media (sort :TRENDING_DESC, type : $type){
            id
            title {
                romaji
                english
                userPreferred
            }
            coverImage {
                large
                extraLarge
                color
            }
            description(asHtml: false)
            bannerImage
            episodes
            status
            genres
            format
            averageScore
            popularity
            startDate {
            year
            month
            day
          }
        }
    }
}
`;

const MEDIA_DETAIL_QUERY = `
  query ($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
        english
        native
      }
      description(asHtml: false)
      coverImage {
        extraLarge
      }
      genres
      episodes
      chapters
      status
      siteUrl
    }
  }
`;

const MEDIA_SEARCH_QUERY = `
  query ($page: Int, $perPage: Int, $type: MediaType, $genre: String) {
    Page(page: $page, perPage: $perPage) {
      media(genre: $genre, type: $type, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        siteUrl
        genres
      }
    }
  }
`;

async function fetchFromAnilist(query, variables) {
  const response = await fetch(ANILIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Anilist API error: ${response.status}`);
  }

  const json = await response.json();
  return json.data;
}

export const fetchTrendingAnime = (page = 1, perPage = 20) =>
  fetchFromAnilist(TRENDING_MEDIA_QUERY, { type: "ANIME", page, perPage });

export const fetchTrendingManga = (page = 1, perPage = 20) =>
  fetchFromAnilist(TRENDING_MEDIA_QUERY, { type: "MANGA", page, perPage });

export const fetchMediaDetail = async (id) => {
  const data = await fetchFromAnilist(MEDIA_DETAIL_QUERY, { id });
  return data.Media;
};

export const searchMediaByGenre = async (
  type,
  genre,
  page = 1,
  perPage = 20
) => {
  const data = await fetchFromAnilist(MEDIA_SEARCH_QUERY, {
    type,
    genre,
    page,
    perPage,
  });
  return data.Page.media;
};
