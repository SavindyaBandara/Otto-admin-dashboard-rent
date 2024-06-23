import React, { useState } from "react";
import { addServiceDetails } from '../api';
import "../styles/add-service-details.css";

const AddServiceDetailsForm = ({ serviceDetails, onSave, onCancel }) => {
  const [details, setDetails] = useState(serviceDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePartChange = (index, e) => {
    const { name, value } = e.target;
    const updatedParts = [...details.changedParts];
    updatedParts[index] = {
      ...updatedParts[index],
      [name]: value,
    };
    setDetails((prevDetails) => ({
      ...prevDetails,
      changedParts: updatedParts,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addServiceDetails(details);
      console.log("Service details added successfully:", response.data);
      onSave(response.data);
    } catch (error) {
      console.error("Error adding service details:", error);
    }
  };

  const addChangedPart = () => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      changedParts: [
        ...prevDetails.changedParts,
        {
          changedPartName: "",
          changedPartPrice: "",
          changedPartDescription: "",
        },
      ],
    }));
  };

  return (
    <div className="service_details_form">
      <h2 className="service_details_title">Add Service Details</h2>
      <p className="service_details_desc">
        Fill in the details to add a new vehicle.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form_styles">
          <label>Service Date: </label>
          <input
            type="date"
            name="serviceDate"
            value={details.serviceDate}
            onChange={handleChange}
          />
        </div>
        <div className="form_styles">
          <label>Service Center Name: </label>
          <input
            type="text"
            name="serviceCenterName"
            value={details.serviceCenterName}
            onChange={handleChange}
          />
        </div>
        <div className="form_styles">
          <label>Service Center Location: </label>
          <input
            type="text"
            name="serviceCenterLocation"
            value={details.serviceCenterLocation}
            onChange={handleChange}
          />
        </div>
        <div className="form_styles">
          <label>Travel Distance: </label>
          <input
            type="text"
            name="travelDistance"
            value={details.travelDistance}
            onChange={handleChange}
          />
        </div>
        <div className="form_styles">
          <label>Service Cost: </label>
          <input
            type="text"
            name="serviceCost"
            value={details.serviceCost}
            onChange={handleChange}
          />
        </div>
        <div className="form_styles">
          <label>Driver Name: </label>
          <input
            type="text"
            name="driverName"
            value={details.driverName}
            onChange={handleChange}
          />
        </div>
        <div className="form_styles">
          <label>Driver Phone: </label>
          <input
            type="text"
            name="driverPhone"
            value={details.driverPhone}
            onChange={handleChange}
          />
        </div>
        <div className="form_styles">
          <label>Next Service Date: </label>
          <input
            type="date"
            name="nextServiceDate"
            value={details.nextServiceDate}
            onChange={handleChange}
          />
        </div>
        <div className="form_styles">
          <label>Next Service Distance: </label>
          <input
            type="text"
            name="nextServiceDistance"
            value={details.nextServiceDistance}
            onChange={handleChange}
          />
        </div>
        <div className="form_styles">
          <label>Vehicle ID: </label>
          <input
            type="text"
            name="vehicleId"
            value={details.vehicleId.vehicleId}
            onChange={(e) =>
              setDetails((prevDetails) => ({
                ...prevDetails,
                vehicleId: { vehicleId: e.target.value },
              }))
            }
          />
        </div>
        {details.changedParts.map((part, index) => (
          <div key={index}>
            <h4>Changed Part {index + 1}</h4>
            <label>Part Name: </label>
            <input
              type="text"
              name="changedPartName"
              value={part.changedPartName}
              onChange={(e) => handlePartChange(index, e)}
            />
            <label>Part Price:</label>
            <input
              type="text"
              name="changedPartPrice"
              value={part.changedPartPrice}
              onChange={(e) => handlePartChange(index, e)}
            />
            <label>Part Description: </label>
            <input
              type="text"
              name="changedPartDescription"
              value={part.changedPartDescription}
              onChange={(e) => handlePartChange(index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={addChangedPart}>
          Add Changed Part
        </button>
        <div className="form-buttons">
          <button className="" type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServiceDetailsForm;
