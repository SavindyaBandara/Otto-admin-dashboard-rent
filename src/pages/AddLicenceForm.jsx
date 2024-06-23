import React, { useState } from "react";
import { addLicense } from '../api';

const AddLicenceForm = () => {
  const [formData, setFormData] = useState({
    licenceId: "",
    vehicleId: {
      vehicleId: ""
    },
    licenseNumber: "",
    expiryDate: "",
    issueDate: "",
    issueProvince: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "vehicleId") {
      setFormData({
        ...formData,
        vehicleId: { vehicleId: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addLicense(formData);
      console.log("Licence added successfully:", response.data);
    } catch (error) {
      console.error("Error adding licence:", error);
    }
  };

  return (
    <div className="add-licence-form">
      <h1>Add Licence</h1>
      <p>Fill in the details to add a new licence.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Licence ID</label>
          <input
            type="text"
            name="licenceId"
            value={formData.licenceId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Vehicle ID</label>
          <input
            type="text"
            name="vehicleId"
            value={formData.vehicleId.vehicleId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Issue Date</label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Issue Province</label>
          <input
            type="text"
            name="issueProvince"
            value={formData.issueProvince}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddLicenceForm;
