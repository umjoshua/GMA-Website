import React, { useState } from "react";
import Form1 from "./Form1/Form1";
import Form2 from "./Form2/Form2";
import Form3 from "./Form3/Form3";
import Form4 from "./Form4/Form4";
import Form5 from "./Form5/Form5";
import Form6 from "./Form6/Form6";
import Form7 from "./Form7/Form7";
import Form8 from "./Form8/Form8";
import Form9 from "./Form9/Form9";
import Form10 from "./Form10/Form10";
import Form11 from "./Form11/Form11";
import Form12 from "./Form12/Form12";
import Form13 from "./Form13/Form13";
import Form14 from "./Form14/Form14";
import Form15 from "./Form15/Form15";
import Form16 from "./Form16/Form16";
import Form17 from "./Form17/Form17";
import Form18 from "./Form18/Form18";

function MembershipForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    streetAddr1: "",
    streetAddr2: "",
    suburb: "",
    state: "",
    postcode: "",
    country: "",
    areaCode: "",
    phoneNum: "",
    email: "",
    gender: "",
    age: "",
    blood: "",
    eFname: "",
    eLname: "",
    ePhone: "",
    sFname: "",
    sMname: "",
    sLname: "",
    sPhone: "",
    sEmail: "",
    fDesc: "",
    pContact: "",
    memType: "",
    feePaid: "",
    pAgree: "",
    pConfirm: "",
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [preferredContact, setPreferredContact] = useState([]);
  const [selectedMemOption, setSelectedMemOption] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "pAgree" || name === "pConfirm") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 18) {
      setStep((prevStep) => prevStep + 1);
    } else {
      const updatedFormData = {
        ...formData,
        gender: selectedOption,
        blood: selectedGroup,
        pContact: selectedCheckboxes,
        memType: selectedMemOption,
        feePaid: activeButton,
      };
      // Handle final form submission
      console.log("Final form data:", updatedFormData);
    }
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      if (step < 18) {
        setStep((prevStep) => prevStep + 1);
      } else {
        setPreferredContact(selectedCheckboxes);
        handleSubmit(); // Call handleSubmit directly
      }
    } else {
      // Handle error or display a message indicating that an option must be selected
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCheckboxes((prevSelectedCheckboxes) => [
        ...prevSelectedCheckboxes,
        value,
      ]);
    } else {
      setSelectedCheckboxes((prevSelectedCheckboxes) =>
        prevSelectedCheckboxes.filter((item) => item !== value)
      );
    }
  };

  const renderFormComponent = () => {
    switch (step) {
      case 1:
        return <Form1 data={formData} handleChange={handleChange} />;
      case 2:
        return (
          <Form2
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <Form3
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <Form4
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <Form5
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        );
      case 6:
        return (
          <Form6
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      case 7:
        return (
          <Form7
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        );
      case 8:
        return (
          <Form8
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      case 9:
        return (
          <Form9
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      case 10:
        return (
          <Form10
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      case 11:
        return (
          <Form11
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      case 12:
        return (
          <Form12
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      case 13:
        return (
          <Form13
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      case 14:
        return (
          <Form14
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            handleCheckboxChange={handleCheckboxChange}
            selectedCheckboxes={selectedCheckboxes}
            setSelectedCheckboxes={setSelectedCheckboxes}
          />
        );
      case 15:
        return (
          <Form15
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            selectedMemOption={selectedMemOption}
            setSelectedMemOption={setSelectedMemOption}
          />
        );
      case 16:
        return (
          <Form16
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        );
      case 17:
        return (
          <Form17
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      case 18:
        return (
          <Form18
            data={formData}
            handleChange={handleChange}
            handlePrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return <form onSubmit={handleSubmit}>{renderFormComponent()}</form>;
}

export default MembershipForm;
