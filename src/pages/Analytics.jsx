import React, { useState, useEffect } from 'react';
import CarDetails from '../pages/CarDetails.jsx';
import { getAllVehicles, deleteVehicle } from '../api';
import '../styles/car-listing.css';
import AddServiceDetailsForm from './AddServiceDetails.jsx';

const CarItem = ({ car, onEdit, onDelete, onServiceAdd }) => (
  <div className='car-item'>
    <img src={car.imgUrl} alt={`${car.brand} ${car.carName}`} />
    <h2>{car.carName}</h2>
    <p>
      <strong>Brand:</strong> {car.brand}
    </p>
    <p>
      <strong>Model:</strong> {car.model}
    </p>
    <p>
      <strong>Price:</strong> ${car.vehiclePrice} / day
    </p>
    <div className='button_styles'>
      <button onClick={() => onEdit(car)} className='edit_button'>
        Edit
      </button>
      <button onClick={() => onDelete(car.id)} className='delete_button'>
        Delete
      </button>
      <button onClick={() => onServiceAdd(car.id)} className='edit_button1'>
        Add Service Details
      </button>
    </div>
  </div>
);

const CarListingPage = () => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [addingService, setAddingService] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getAllVehicles();
        console.log(response.data);

        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCars();
  }, []);

  const handleEdit = (car) => {
    setEditingCar(car);
  };

  const handleDelete = async (carId) => {
    try {
      if (carId) {
        await deleteVehicle(carId);
        setCars(cars.filter((car) => car.id !== carId));
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleSave = (updatedCar) => {
    setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
    setEditingCar(null);
  };

  const handleServiceAdd = (carId) => {
    setSelectedCarId(carId);
    setAddingService(true);
  };

  const handleServiceSave = (newServiceDetails) => {
    setCars(
      cars.map((car) =>
        car.id === selectedCarId
          ? { ...car, serviceDetails: newServiceDetails }
          : car
      )
    );
    setAddingService(false);
    setSelectedCarId(null);
  };

  return (
    <div className='car-listing'>
      <h1 className='car-listing-title'>Car Listing</h1>
      {editingCar ? (
        <CarDetails
          car={editingCar}
          onSave={handleSave}
          onCancel={() => setEditingCar(null)}
        />
      ) : addingService ? (
        <AddServiceDetailsForm
          serviceDetails={{
            serviceDetailsId: null,
            serviceDate: '',
            serviceCenterName: '',
            serviceCenterLocation: '',
            travelDistance: '',
            serviceCost: '',
            driverName: '',
            driverPhone: '',
            nextServiceDate: '',
            nextServiceDistance: '',
            vehicleId: { vehicleId: selectedCarId },
            changedParts: [],
          }}
          onSave={handleServiceSave}
          onCancel={() => setAddingService(false)}
        />
      ) : (
        <div className='car-list'>
          {cars.map((car) => (
            <CarItem
              key={car.id}
              car={car}
              onEdit={handleEdit}
              onDelete={() => {
                console.log(car.vehicleId);
                handleDelete(car.vehicleId);
              }}
              onServiceAdd={handleServiceAdd}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarListingPage;