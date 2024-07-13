import React from "react";

const DishCard = ({ dish, socket, updateDish }) => {
  const { _id, dishName, imageUrl, isPublished } = dish;

  const togglePublish = async () => {
    try {
      const res = await fetch(`http://localhost:5000/dishes/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await res.json();
      console.log(result);
      
      // Update local state immediately
      updateDish(result);
      
      // Emit the updated dish to the server
      socket.emit('dishUpdated', result);
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  return (
    <div className="bg-inherit h-[300px] w-[400px] rounded overflow-hidden flex justify-center flex-wrap mx-4">
      <div className="rounded-lg h-[500px] w-[200px]">
        <img
          className="overflow-auto w-[100%] h-[30%] rounded-lg"
          src={imageUrl}
          alt={dishName}
        />
        <div className="h-[60%] flex flex-col">
          <p className="text-zinc-200 font-bold text-center text-xl my-5">
            {dishName}
          </p>

          <button
            onClick={togglePublish}
            className={`bg-stone-300 w- mx-[10px] text-2xl font-bold py-3 px-3 rounded-3xl ${
              isPublished ? 'text-green-600 hover:text-green-700' : 'text-red-600 hover:text-red-700'
            }`}
          >
            {isPublished ? "Published" : "Unpublished"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;