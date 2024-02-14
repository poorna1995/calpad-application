import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import AppImage from "../AppImage";
import SecondaryButton from "../Buttons/SecondaryButton";
import bgImage from "public/assets/products/hivepath/hivepath.png";
// Component for products page
// shows image on background and Text on top of it
const HeroCompWithBgImage = ({
  heroBg,
  heroTitle,
  heroDescription,
  heroImage,
}) => {
  // const heroBg = `url($bgImage) top  cover`;
  return (
    <Box
      sx={{
        // background: heroBg || "rgba(21, 50, 48, 1)",
        height: "100vh",
        width: "100vw",

        "&: .hero-image": {
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        },

        // paddingBottom: "64px",
      }}
    >
      <AppImage className="hero-image" src={heroImage} layout="fill" />
      <div
        style={{
          position: "absolute",
          top: "64px",
          left: "0px",
          height: "100vh",
          width: "100vw",
          background: heroBg || "rgba(72, 74, 158, 0.9)",

          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "inherit",
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "space-evenly",
            color: "white",
            // background: "red",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              // position: "absolute",
              // top: "40vh",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "48px",
                lineHeight: "66px",
                fontWeight: "800",
              }}
            >
              {heroTitle || `	Create your digital Transformational Journey`}
            </Typography>
            <Typography
              sx={{
                marginTop: "32px",
                marginBottom: "24px",
                maxWidth: "600px",
              }}
            >
              {heroDescription ||
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vehicula massa in enim luctus. Rutrum arcu.`}
            </Typography>
            <SecondaryButton
              endIcon={<FaArrowCircleRight />}
              // sx={{

              // }}
            >
              Get a Qoute
            </SecondaryButton>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default HeroCompWithBgImage;
