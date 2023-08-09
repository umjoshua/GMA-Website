import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./DetailsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function DetailsPage() {
  let navigate = useNavigate();

  const { id } = useParams();
  const events = useContext(AppContext);

  const event = events.find((event) => event._id === id);

  const currentURL = window.location.href;
  const message = 'Check out this event by GMA';

  const shareViaWhatsApp = () => {
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${message}: ${currentURL}`
    )}`;
    window.open(whatsappLink, '_blank');
  };

  const shareViaFacebook = () => {
    const currentURL = window.location.href;
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentURL
    )}`;
    window.open(facebookLink, '_blank');
  };

  const shareViaTwitter = () => {
    const currentURL = window.location.href;
    const twitterLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentURL
    )}&text=${encodeURIComponent(message)}`;
    window.open(twitterLink, '_blank');
  };

  const shareViaGmail = () => {
    const currentURL = window.location.href;
    const subject = 'Check out this event by GMA';
    const gmailLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(currentURL)}`;
    window.location.href = gmailLink;
  };

  const handleNavigate = () => {
    navigate(`/register/${encodeURIComponent(event._id)}`);
  }

  return (
    <>{
      event && <div className="details_container">
        <div className="details">
          <div>
            <div className="detail_title">
              <h2>{event.title}</h2>
            </div>
            <div className="detail_image">
              <img src={event.file} alt="" />
            </div>
          </div>
          <div className="detail_location">
            <div className="location_title">
              <h3>Event Details</h3>
            </div>
            <div className="location_details">
              <div>
                <div className="detail_desc">
                  <span className="heading_in">
                    <ListIcon />
                  </span>
                  <span>{event.description}</span>
                </div>
                <div className="event_address">
                  <span className="address_in">
                    <ArrowCircleRightIcon className="address_arrow" />
                    <h5>{event.event_location}</h5>
                  </span>
                  <span className="address_in">
                    <ArrowCircleRightIcon className="address_arrow" />
                    <h5>{event.state}</h5>
                  </span>
                  <span className="address_in">
                    <ArrowCircleRightIcon className="address_arrow" />
                    <h5>{event.country}</h5>
                  </span>
                </div>
                <div className="schedule_details">
                  <span className="schedule_in">
                    <CalendarMonthIcon className="address_arrow" />
                    <h3>Event Schedule Details</h3>
                  </span>
                  <div>
                    <span className="schedule_date">
                      <CalendarMonthIcon className="address_arrow" />
                      <p>
                        {event.event_date} {event.event_time}
                      </p>
                    </span>
                  </div>
                </div>
                <div className="event_share">
                  <span>
                    <h3>Share this Event</h3>
                  </span>
                  <div className="event_icons">
                    <span onClick={shareViaWhatsApp}>
                      <WhatsAppIcon className="address_arrow" />
                    </span>
                    <span onClick={shareViaFacebook}>
                      <FacebookIcon className="address_arrow" />
                    </span>
                    <span onClick={shareViaTwitter}>
                      <TwitterIcon className="address_arrow" />
                    </span>
                    <span onClick={shareViaGmail}>
                      <MailOutlineIcon className="address_arrow" />
                    </span>
                  </div>
                </div>
                <div className="detail_shorthand">
                  <div className="shorthand">
                    <div className="shorthand_icon">
                      <CalendarMonthIcon className="address_arrow" />
                    </div>
                    <div className="shorthand_text">
                      <span className="shorthand_title">Event Date:</span>
                      <span className="shorthand_detail">{event.event_date}</span>
                    </div>
                  </div>
                  <div className="shorthand">
                    <div className="shorthand_icon">
                      <AccessTimeIcon className="address_arrow" />
                    </div>
                    <div className="shorthand_text">
                      <span className="shorthand_title">Event Time:</span>
                      <span className="shorthand_detail">{event.event_time}</span>
                    </div>
                  </div>
                  <div className="shorthand">
                    <div className="shorthand_icon">
                      <LocationOnIcon className="address_arrow" />
                    </div>
                    <div className="shorthand_text">
                      <span className="shorthand_title">Event Location:</span>
                      <span className="shorthand_detail">{event.event_location}</span>
                    </div>
                  </div>
                </div>

                <div className="detail_description">
                  {
                    event?.regOpen === "Yes" && <div className="description_register">
                      <button onClick={handleNavigate}>
                        Book Now
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  );
}

export default DetailsPage;
