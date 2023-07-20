import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { LinearProgress, Grid, Box, Typography, Collapse } from "@mui/material";

import { styles as classes } from "../../../../styles/personInfo.styles";
import { usePersonById } from "../../../../hooks/people.hooks";
import CustomHead from "../../../../components/CustomHead/CustomHead";
import TvTileSlider from "../../../../components/TvTileSlider/TvTileSlider";
import TileSlider from "../../../../components/TileSider/TileSlider";
import ProfileImgRoll from "../../../../components/ProfileImgRoll/ProfileImgRoll";
import { PeopleResult } from "../../../../types/apiResponses";
import { blurData, formatImgSrc } from "../../../../utils/utils";
import { useMaxHeight } from "../../../../hooks/app.hooks";

function PersonInfo() {
  const router = useRouter();
  const { data: singlePersonData, isLoading } = usePersonById(router.query.id);

  const [bioCollapse, setBioCollapse] = useState(false);
  const [maxHeight, ref] = useMaxHeight();

  const collapsedSize = 327;

  // console.log("singlePersonData: ", singlePersonData);

  if (isLoading) return <LinearProgress />;

  const {
    profile_path,
    name,
    biography,
    homepage,
    imdb_id,
    adult,
    birthday,
    deathday,
    known_for_department,
    also_known_as,
    place_of_birth,
    images,
    movie_credits,
    tv_credits,
  } = singlePersonData as PeopleResult;

  return (
    <>
      <CustomHead title={name} media_type={"movie"} />
      <Grid sx={classes.main}>
        <Grid item sx={classes.top}>
          <Box
            sx={classes.backgroundCover}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${profile_path})`,
            }}
          ></Box>
          <Box sx={classes.imageBox}>
            <Image
              fill
              className="poster-img"
              placeholder="blur"
              style={
                profile_path
                  ? { objectFit: "cover", objectPosition: "top" }
                  : { objectFit: "contain", objectPosition: "center" }
              }
              blurDataURL={blurData}
              src={formatImgSrc(
                "https://image.tmdb.org/t/p/w780",
                profile_path
              )}
              sizes={formatImgSrc(
                "https://image.tmdb.org/t/p/w780",
                profile_path
              )}
              alt={name}
            />
          </Box>
          <Box sx={classes.detailMid}>
            <Box>
              <Typography variant="h4" sx={classes.mediaTitle}>
                {name}
              </Typography>
              <Grid sx={classes.belowTitle}>
                <Grid item>Biography</Grid>
              </Grid>
            </Box>

            <Box sx={{ position: "relative", cursor: "pointer" }}>
              <Collapse in={bioCollapse} collapsedSize={collapsedSize}>
                <Typography
                  ref={ref}
                  variant="body1"
                  sx={classes.overview}
                  onClick={() => setBioCollapse((prev) => !prev)}
                >
                  {biography}
                </Typography>
                {!bioCollapse && collapsedSize < maxHeight && (
                  <Box sx={classes.collapseShadow} />
                )}
              </Collapse>
            </Box>
          </Box>

          <Box sx={classes.detailLast}>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Homepage:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {homepage ? (
                  <Link href={homepage} target="_blank" className="bullet-link">
                    {homepage}
                  </Link>
                ) : (
                  "N/A"
                )}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Imdb:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {imdb_id ? (
                  <Link
                    href={`https://www.imdb.com/name/${imdb_id}`}
                    target="_blank"
                    className="bullet-link"
                  >
                    {`https://www.imdb.com/name/${imdb_id}`}
                  </Link>
                ) : (
                  "N/A"
                )}
              </Grid>
            </Grid>

            <Grid>
              <Grid item sx={classes.bulletHead}>
                Adult:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {adult ? "Yes" : "No"}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Birthday:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {birthday}
              </Grid>
            </Grid>
            {deathday && (
              <Grid>
                <Grid item sx={classes.bulletHead}>
                  Death:{" "}
                </Grid>
                <Grid item sx={classes.bulletInfo}>
                  {deathday}
                </Grid>
              </Grid>
            )}
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Birth place:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {place_of_birth}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Known for:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {known_for_department}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Other names:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {also_known_as?.map((otherName, index) => (
                  <React.Fragment key={otherName}>
                    {otherName}
                    {index < also_known_as.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item>
          <ProfileImgRoll imageList={images.profiles} />
        </Grid>

        <Grid item sx={{ p: "20px 0" }}>
          <TileSlider
            title={"Movies known for"}
            movieData={movie_credits.cast}
          />
        </Grid>

        <Grid item sx={{ p: "20px 0" }}>
          <TvTileSlider
            title={"Related TV shows"}
            seriesData={tv_credits.cast}
          />
        </Grid>
      </Grid>
    </>
  );
}

// Commented to Remove SSR
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const queryClient = new QueryClient();
//   const { id } = ctx.query;

//   try {
//     // fetching single person details
//     await queryClient.fetchQuery([PeopleQueryKey.SinglePersonData, id], () =>
//       getPersonById(id)
//     );

//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient),
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// }

export default PersonInfo;
