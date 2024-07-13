import { useEffect, useState } from 'react';
import DishCard from './DishCard.jsx';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const DishesList = () => {
  const [dishes, setDishes] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    const getDishes = async () => {
      try {
        const res = await fetch("http://localhost:5000/dishes");
        const data = await res.json();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    getDishes();

    newSocket.on('dishUpdated', (updatedDish) => {
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish._id === updatedDish._id ? updatedDish : dish
        )
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const updateDish = (updatedDish) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish._id === updatedDish._id ? updatedDish : dish
      )
    );
  };

  return (
    <div className="h-screen w-screen bg-zinc-800 flex justify-center items-center">
      <Link className="mb-[40%]" to="/">
        <i className="text-white text-5xl ri-arrow-left-s-line"></i>
      </Link>
      {dishes.map((d, i) => (
        <DishCard key={i} dish={d} socket={socket} updateDish={updateDish} />
      ))}
    </div>
  );
};

export default DishesList;