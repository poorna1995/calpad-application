/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Typography,
  Avatar,
} from "@mui/material";

// import { makeStyles } from "@mui/styles";
import {
  usePopupState,
  bindHover,
  bindPopover,
} from "material-ui-popup-state/hooks";
import { useSelector } from "react-redux";
// import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import GradientText from "components/Common/Typography/GradientText";

import { format } from "date-fns";
import { SESSION_STATUS } from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/SessionsListView/MySessionsSection/SessionsSectionTabs";
// import { Button } from "react-scroll";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import Link from "next/link";
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  hoverText: {
    position: "absolute",
    top: "-5px",
    left: "-5px",
    width: "140px",
    display: "inline",
    paddingLeft: "5px",
    paddingBottom: "10px",
    paddingTop: "5px",
    opacity: 0,
    "&:hover": {
      display: "flex",
      opacity: 1,
      background: "white",
    },
  },
  title: {
    display: "flex",
  },
  titleBox: {
    width: "100%",
    position: "relative",
  },
}));

const mapState = ({ user, view }) => ({
  currentUser: user.currentUser,
  // hostView: view.host,
});

const SPWeekEvent = (props) => {
  const classes = useStyles();
  const { event } = props;
  const { currentUser, hostView } = useSelector(mapState);

  const { userData, session_data } = event && event;

  const userName = userData && `${userData?.first_name} ${userData?.last_name}`;

  const bookingID = event && event.booking_id;
  const profileImage = userData && userData.image_url;
  const status = event && event.booking_status;

  const image_url =
    session_data && session_data.thumbnails && session_data.thumbnails[0];
  const formatDate = format(event.start, "E, MMM dd, yyyy");

  const formatStartTime = format(event.start, "hh:mma");
  const formatEndTime = format(event.end, "hh:mma");

  const title = session_data && session_data.title;
  const role = userData && userData.role;
  const company = userData && userData.company;
  const profile_headline = userData && userData.profile_headline_description;
  const statusMessage =
    event.host_view &&
    event.attendee_view &&
    (hostView
      ? event.host_view.status_message.toLowerCase()
      : event.attendee_view.status_message.toLowerCase());
  const bookingStatus = statusMessage;
  const meetingURL = event.meeting_link;

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const popupState = usePopupState({
    variant: "popper",
    popupId: "demoPopper",
  });

  const eventStartFormattedTime =
    event.start && format(event.start, "hh:mmaaa");
  const eventEndFormatTime = event.end && format(event.end, "hh:mmaaa");

  return (
    <div className={classes.root}>
      <div style={{ width: "100%" }} {...bindHover(popupState)}>
        {event.source_type && event?.source_type === "google" && (
          <>
            <span style={{ fontSize: "12px" }}>Google</span>
            <br />
          </>
        )}
        <span
          style={{ fontSize: "12px", fontWeight: "600", marginTop: "-8px" }}
        >
          {truncate(title, 30) || event.title || "Available"}
        </span>
        <br />
        <span style={{ fontSize: "10px", fontWeight: "400" }}>
          {eventStartFormattedTime}-{eventEndFormatTime}
        </span>

      </div>

      <div>
        {session_data && userData && (
          <HoverPopover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "right",
              horizontal: "bottom",
            }}
            PaperProps={{
              style: {
                zIndex: "1000",
                background: "white",
                maxWidth: "360px",
                minWidth: "350px",
                boxShadow: " 0px 0px 24px rgba(0, 0, 0, 0.05)",
                borderRadius: "15px",
                padding: "16px",
              },
            }}
          >
            <div
              style={{
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "16px",
              }}
            >
              <Typography
                style={{
                  fontWeight: "700",
                }}
              >
                Status
              </Typography>
              {/* <span>Awaiting for approval</span> */}

              <Typography
                style={{
                  fontWeight: "700",
                  color: "red",
                }}
                component="li"
              >
                {status}
              </Typography>
            </div>
            <div>
              <Typography
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#484a9e",
                  paddingBottom: "8px",
                }}
              >
                {formatDate} {formatStartTime}- {formatEndTime}
              </Typography>
              <div
                style={{
                  display: "flex",
                  paddingBottom: "8px",
                }}
              >
                <img
                  src={image_url}
                  alt=""
                  style={{
                    width: "120px",
                    height: "60px",
                    marginRight: "8px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
                <Link to={`/sessions/${bookingID}`}>
                  <Typography
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      lineHeight: "21px",
                      letteSpacing: "-0.03em",
                      color: "black",
                    }}
                  >
                    {title}
                  </Typography>
                </Link>
              </div>
              {/* <Chip
              label={category}
              style={{
                marginBottom: "8px",
              }}
            />
            <Typography
              style={{
                fontSize: "12px",
                lineHeight: "18px",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "rgba(97,97,97,1)",
              }}
            >
              {truncate(description, 80)}
            </Typography> */}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flex: 1,
                paddingBottom: "8px",
              }}
            >
              <Avatar
                src={profileImage}
                style={{ height: "36px", width: "36px" }}
              />
              <div style={{ flex: 1, marginLeft: "16px" }}>
                <Link to={`/${userData.slug_id}`}>
                  <GradientText
                    style={{
                      fontWeight: "800",
                      fontSize: "14px",
                      lineHeight: "17px",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {userName}
                  </GradientText>
                </Link>
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "12px",
                    lineHeight: "15px",
                    letterSpacing: "-0.03em",
                    color: "#323232",
                  }}
                >
                  {profile_headline || ` ${role} at ${company}`}
                </Typography>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "8px",
                // marginBottom: "8px",
              }}
            >
              {(bookingStatus === SESSION_STATUS.APPROVED ||
                bookingStatus === SESSION_STATUS.HAPPENING_NOW) && (
                <PrimaryButton
                  title="Join the session"
                  // disabled={!myTime}

                  component="a"
                  href={typeof meetingURL === "string" && meetingURL}
                  target="_blank"
                  style={{
                    height: "36px",
                  }}
                />
              )}
            </div>
          </HoverPopover>
        )}
      </div>
    </div>
  );
};

export default SPWeekEvent;
