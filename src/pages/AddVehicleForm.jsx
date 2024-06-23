import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/add-vehicle-form.css"; // Import the CSS file
import { addVehicle } from '../api';

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    vehiclePrice: "",
    registrationNo: "",
    chassisNumber: "",
    engineNo: "",
    vehicleState: "",
    numberOfDoors: 1,
    color: "",
    seatingCapacity: 1,
    condition: "",
    dimensions: {
      length: 0,
      height: 0,
      width: 0,
    },
    cylinderCapacity: 0,
    fuelType: "Petrol",
    manufacturedCountry: "",
    assembled: false,
    vehicleType: "van",
    brand: "",
    style: "",
    model: "",
    manufacturedYear: new Date().getFullYear(),
    albumUrls: [],
  });

  const onDrop = (acceptedFiles) => {
    const updatedPhotos = [
      ...formData.albumUrls,
      ...acceptedFiles.map((file) => URL.createObjectURL(file)),
    ];
    const limitedPhotos = updatedPhotos.slice(0, 6);
    setFormData({ ...formData, albumUrls: limitedPhotos });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.dimensions) {
      setFormData({
        ...formData,
        dimensions: { ...formData.dimensions, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addVehicle(formData);
      console.log('Vehicle added:', response.data);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <div className="add-vehicle-form">
      <h1 className="add-vehicle__title">Add Vehicle</h1>
      <p className="add-vehicle__desc">
        Fill in the details to add a new vehicle.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form__group">
          <div>
            <label>Vehicle Price</label>
            <input
              type="text"
              name="vehiclePrice"
              value={formData.vehiclePrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Registration No</label>
            <input
              type="text"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Chassis Number</label>
            <input
              type="text"
              name="chassisNumber"
              value={formData.chassisNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Engine Number</label>
            <input
              type="text"
              name="engineNo"
              value={formData.engineNo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Vehicle State</label>
            <input
              type="text"
              name="vehicleState"
              value={formData.vehicleState}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Number of Doors</label>
            <input
              type="number"
              name="numberOfDoors"
              value={formData.numberOfDoors}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Seating Capacity</label>
            <input
              type="number"
              name="seatingCapacity"
              value={formData.seatingCapacity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Condition</label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Cylinder Capacity</label>
            <input
              type="number"
              name="cylinderCapacity"
              value={formData.cylinderCapacity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Length (m)</label>
            <input
              type="number"
              name="length"
              value={formData.dimensions.length}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Height (m)</label>
            <input
              type="number"
              name="height"
              value={formData.dimensions.height}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Width (m)</label>
            <input
              type="number"
              name="width"
              value={formData.dimensions.width}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Fuel Type</label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="drop_down_button"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="CNG">CNG</option>
            </select>
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Manufactured Country</label>
            <input
              type="text"
              name="manufacturedCountry"
              value={formData.manufacturedCountry}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Assembled</label>
            <div className="checkbox__group">
              <input
                type="checkbox"
                name="assembled"
                checked={formData.assembled}
                onChange={handleCheckboxChange}
              />
              <span>Is the vehicle assembled?</span>
            </div>
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Vehicle Type</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="drop_down_button"
            >
              <option value="van">Van</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="truck">Truck</option>
              <option value="cab">Cab</option>
            </select>
          </div>
          <div>
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Style</label>
            <input
              type="text"
              name="style"
              value={formData.style}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group">
          <div>
            <label>Manufactured Year</label>
            <input
              type="number"
              name="manufacturedYear"
              value={formData.manufacturedYear}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Add a photo here!</label>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p className="photo_desc">Click to select Photos</p>
            </div>
            <div className="photo-preview">
              {formData.albumUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Photo ${index}`}
                  className="photo-preview__img"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="form__group--submit">
          <button type="submit" className="submit__btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
