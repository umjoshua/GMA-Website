import React, { useEffect, useState, useRef } from "react";
import "./Form13.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import LinkIcon from "@mui/icons-material/Link";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ImageIcon from "@mui/icons-material/Image";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

function Form13({ data, handleChange, handlePrevious }) {
  const [text, setText] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalics, setisItalics] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);

  const textAreaRef = useRef(null);
  const handleTextChange = (e) => {
    setText(e.target.value);
    const textarea = textAreaRef.current;
    textarea.style.height = "70px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const convertToUppercase = () => {
    const upperCasetext = text.toUpperCase();
    setText(upperCasetext);
  };
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">
          Details of other family members in your household and kids under 13
          years
        </span>
        <span className="name_sub">Please enter Full Name, Gender and Age</span>
      </div>
      <div className="e_form_container">
        <textarea
          value={text}
          ref={textAreaRef}
          onChange={(e) => handleTextChange(e)}
          style={{
            resize: "none",
            overflow: "hidden",
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalics ? "italic" : "normal",
            textDecoration: isUnderlined ? "underline" : "none",
          }}
        />
      </div>
      <div className="des_icons">
        <span>
          <TextFieldsIcon onClick={convertToUppercase} />
        </span>
        <span>
          <FormatBoldIcon onClick={() => setIsBold(!isBold)} />
        </span>
        <span>
          <FormatItalicIcon onClick={() => setisItalics(!isItalics)} />
        </span>
        <span>
          <FormatUnderlinedIcon
            onClick={() => setIsUnderlined(!isUnderlined)}
          />
        </span>
        <span>
          <LinkIcon />
        </span>
        <span>
          <FormatListBulletedIcon />
        </span>
        <span>
          <FormatListNumberedIcon />
        </span>
        <span>
          <FormatQuoteIcon />
        </span>
        <span>
          <ImageIcon />
        </span>
        <span>
          {" "}
          <SentimentSatisfiedAltIcon />
        </span>
      </div>
      <div className="addr_button">
        <button>
          <div className="name_arrow">
            <ArrowBackIcon />
          </div>
          Previous
        </button>
        <button>
          Next
          <div className="name_arrow">
            <ArrowForwardIcon />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Form13;
