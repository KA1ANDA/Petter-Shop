import React, { useState } from 'react';
import { colorOptions } from '../../Variables/shopVariables';
import { useDispatch, useSelector } from 'react-redux';
import { setAvailableColors } from '../../Redux/Slices/shopFilterSlice';

const ColorDropdown = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const {availableColors} =useSelector(state => state.shopFilterSlice )
  // const [availableColors , setAvailableColors ] = useState([])

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    dispatch(setAvailableColors([...availableColors,color]))
    setIsOpen(false);
  };

  const deleteColor = (index) => {
    const updatedColor = [...availableColors];
    updatedColor.splice(index, 1);
    dispatch(setAvailableColors(updatedColor));
  }


  console.log(availableColors)

  return (
    <div className='flex flex-col gap-[20px]'>
     <div className="relative bg-white rounded-standart  ">
      <button 
        onClick={toggleDropdown} 
        className="bg-gray-200 p-2 rounded-md flex items-center justify-between w-full "
      >
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 mr-2 rounded-[50%]" style={{ backgroundColor: selectedColor.value }}></span>
          <span>{selectedColor.name}</span>
        </div>
        <span className="ml-auto">▼</span>
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full max-h-[200px] overflow-auto rounded-md shadow-lg bg-white z-10">
          {colorOptions.map((color, index) => (
            <div 
              key={index} 
              className="p-2 flex items-center cursor-pointer hover:bg-gray-100" 
              onClick={() => handleSelectColor(color)}
            >
              <span className="inline-block w-4 h-4 mr-2 border-black border rounded-[50%]" style={{ backgroundColor: color.value }}></span>
              <span>{color.name}</span>
            </div>
          ))}
        </div>
        )}
      </div>


      <div className=' flex gap-[15px] w-full flex-wrap'>
        {availableColors.map((color, index) => (
            <div 
              key={index} 
              className="p-2 flex  items-center cursor-pointer border-2 border-primary  rounded-standart" 
              onClick={() => deleteColor(index)}
            >
              <span className="inline-block w-4 h-4 mr-2 border-black border rounded-[50%]" style={{ backgroundColor: color.value }}></span>
              <span>{color.name}</span>
            </div>
          ))}
      </div>
    </div>
   
  );
};

export default ColorDropdown;
