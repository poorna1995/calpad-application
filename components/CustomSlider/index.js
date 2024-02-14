import React from "react";

import { useState, useEffect, createRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Box, Container, IconButton, Button } from "@mui/material";

import { Typography } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import { useRef } from "react";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";

const CustomSlider = ({ data, loading, title }) => {
  const [sliderRef, setSliderRef] = useState(null);
  const [index, setIndex] = useState(0);
  const beforeChange = (prev, next) => {
    setIndex(next);
  };

  const settings = {
    // focusOnSelect:   true,
    infinite: false,
    swipeToSlide: true,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    width: "inherit",
    height: "inherit",
    beforeChange: beforeChange,
    // afterChange: current => this.setState({ activeSlide2: current })

    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    // beforeChange: (current, next) => setCurrentSlide(current),
  };

  return (
    <Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: title ? "space-between" : "flex-end",
          flex: 1,
        }}
      >
        {title && (
          <Typography
            style={{
              fontSize: "28px",
              fontWeight: "700",
              flex: 0.8,
              lineHeight: "38px",
              letterSpacing: ` -0.01em`,
              color: `#2E3749`,
            }}
          >
            {title}{" "}
          </Typography>
        )}
        <div style={{ display: "flex", alignSelf: "flex-end" }}>
          <div className="controls">
            <IconButton onClick={sliderRef?.slickPrev} disabled={index === 0}>
              <FaChevronLeft />
            </IconButton>
            <IconButton
              onClick={sliderRef?.slickNext}
              disabled={index === data.length - 2.5}
            >
              <FaChevronRight />
            </IconButton>
          </div>
        </div>
      </div>

      <Slider ref={setSliderRef} {...settings} arrows={false}>
        {Array.isArray(data) &&
          data.map((item, index) => {
            // const {title} = item;
            return (
              <Box
                key={index}
                sx={{
                  padding: "16px",
                }}
              >
                <BaseCard
                  sx={{
                    padding: "16px",
                    boxShadow: "0px 0px 74px -13px rgba(31, 82, 158, 0.1)",
                    marginLeft: index === 0 && "-16px",
                  }}
                >
                  <SectionTitleText
                    sx={{
                      fontSize: "24px",
                      lineHeight: "33px",
                      fontWeight: 700,
                    }}
                  >
                    Ipsum ultrices aliquam enim.
                  </SectionTitleText>
                  <DescriptionText
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    Ultricies convallis eget ipsum integer quam amet mauris.
                    Tempor egestasUltricies convallis eget ipsum integer quam
                    amet mauris. Tempor egestasUltricies convallis eget ipsum
                    integer quam amet mauris. Tempor egestasUltricies convallis
                    eget ipsum integer
                  </DescriptionText>
                </BaseCard>
              </Box>
            );
          })}
      </Slider>
    </Box>
  );
};

export default CustomSlider;
