import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/edit-vehcile-details.css";
import { updateVehicle } from '../api';

const CarDetails = ({ car, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...car });

  const onDrop = (acceptedFiles) => {
    const updatedPhotos = [
      ...formData.albumUrls,
      ...acceptedFiles.map((file) => URL.createObjectURL(file)),
    ];
    const limitedPhotos = updatedPhotos.slice(0, 3);
    setFormData({ ...formData, albumUrls: limitedPhotos });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("dimensions.")) {
      const dimensionName = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        dimensions: {
          ...prevData.dimensions,
          [dimensionName]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateVehicle(formData.vehicleId, formData);
      console.log('Vehicle updated:', response.data);
      onSave(response.data);
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="car_details_form">
      <h3 className="car_details_title">You are in Edit Mode</h3>
      <p className="car_details_desc">
        Fill in the details to update the vehicle.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form__group">
          <div>
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Vehicle Price</label>
            <input
              type="text"
              name="vehiclePrice"
              value={formData.vehiclePrice}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label>Registration No</label>
            <input
              type="text"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Chassis Number</label>
            <input
              type="text"
              name="chassisNumber"
              value={formData.chassisNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label>Engine No</label>
            <input
              type="text"
              name="engineNo"
              value={formData.engineNo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Vehicle State</label>
            <input
              type="text"
              name="vehicleState"
              value={formData.vehicleState}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label>Number of Doors</label>
            <input
              type="number"
              name="numberOfDoors"
              value={formData.numberOfDoors}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label>Seating Capacity</label>
            <input
              type="number"
              name="seatingCapacity"
              value={formData.seatingCapacity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Condition</label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label>Dimensions - Length</label>
            <input
              type="number"
              name="dimensions.length"
              value={formData.dimensions.length}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Dimensions - Height</label>
            <input
              type="number"
              name="dimensions.height"
              value={formData.dimensions.height}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label>Dimensions - Width</label>
            <input
              type="number"
              name="dimensions.width"
              value={formData.dimensions.width}
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
            <label>Fuel Type</label>
            <input
              type="text"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Manufactured Country</label>
            <input
              type="text"
              name="manufacturedCountry"
              value={formData.manufacturedCountry}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <label>Assembled</label>
            <input
              type="checkbox"
              name="assembled"
              checked={formData.assembled}
              onChange={(e) =>
                setFormData({ ...formData, assembled: e.target.checked })
              }
            />
          </div>
          <div>
            <label>Vehicle Type</label>
            <p>Choose: "Van" or "Car" or "Bike" or "Truck" or "Cab"</p>
            <input
              name="vehicleType"
              value={formData.vehicleType}
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
        </div>
        <div className="desc">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <label>Add a photo</label>
        <div {...getRootProps({ className: "dropzone1" })}>
          <input {...getInputProps()} />
          <p className="photo_desc">Click to select Photos</p>
        </div>
        <div className="photo-preview1">
          {formData.albumUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Photo ${index}`}
              className="car_photos_prew"
            />
          ))}
        </div>
        <div className="form__group--submit">
          <button type="submit" className="save_btn">Save</button>
          <button type="button" className="dlt_btn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CarDetails;
