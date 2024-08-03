import React, { useEffect, useState } from "react";
import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { setFilterByPriceValue } from "../../Redux/Slices/shopFilterSlice";
import { db } from "../../config/firebase";
import { collection, orderBy, limit, query, getDocs } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

const PriceRangeSlider = () => {
  const dispatch = useDispatch();
  const productsRef = collection(db, 'products');

  const navigate = useNavigate();
  const [highestPrice, setHighestPrice] = useState();
  const [highestPriceNoSizes, setHighestPriceNoSizes] = useState();
  const [highestPriceInSizes, setHighestPriceInSizes] = useState();
  const location = useLocation();

  const [filteredPrices, setFilteredPrices] = useState([]);
  const { filterByPriceValue } = useSelector(state => state.shopFilterSlice);

  const q = query(productsRef, orderBy("price", "desc"), limit(1));

  useEffect(() => {
    const getProduct = async () => {
      try {
        // FINDING HIGHEST PRICE IN PRODUCTS WITH SIZES
        const allSnapshot = await getDocs(productsRef); // Query all products
        let highestPriceInSizesFound = 0;

        allSnapshot.forEach((product) => {
          const productData = product.data();

          // Check for sizes array and additionalPrice
          if (productData.sizes && productData.sizes.length > 0) {
            productData.sizes.forEach((size) => {
              if (size.additionalPrice && size.additionalPrice > highestPriceInSizesFound) {
                highestPriceInSizesFound = size.additionalPrice;
              }
            });
          }
        });

        // FINDING HIGHEST PRICE IN PRODUCT WITHOUT SIZES
        const querySnapshot = await getDocs(q);
        const product = querySnapshot.docs[0];

        if (product) {
          const productData = product.data();
          const highestPriceNoSizesFound = productData.price;

          // Compare and set the overall highest price
          const overallHighestPrice = Math.max(highestPriceInSizesFound, highestPriceNoSizesFound);

          setHighestPrice(overallHighestPrice);
          dispatch(setFilterByPriceValue([0, overallHighestPrice]));
          setFilteredPrices([0, overallHighestPrice]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [highestPrice]);

  // Read minPrice and maxPrice from URL and update state
  useEffect(() => {
    const parsedParams = new URLSearchParams(location.search);
    const minPrice = parsedParams.get('minPrice');
    const maxPrice = parsedParams.get('maxPrice');

    if (minPrice && maxPrice) {
      setFilteredPrices([Number(minPrice), Number(maxPrice)]);
      dispatch(setFilterByPriceValue([Number(minPrice), Number(maxPrice)]));
    }
  }, [location]);

  useEffect(() => {
    const parsedParams = new URLSearchParams(location.search);
    const minPrice = parsedParams.get('minPrice');
    const maxPrice = parsedParams.get('maxPrice');

    if (minPrice && maxPrice) {
      setFilteredPrices([Number(minPrice), Number(maxPrice)]);
      dispatch(setFilterByPriceValue([Number(minPrice), Number(maxPrice)]));
    } else {
      // Set default prices if not in URL
      setFilteredPrices([0, highestPrice]);
      dispatch(setFilterByPriceValue([0, highestPrice]));
    }
  }, [location, highestPrice]);

  const handleChange = (newValues) => {
    // Update state without dispatching to Redux yet
    setFilteredPrices(newValues);
  };

  const handleFilterByPrice = () => {
    // Dispatch to Redux and update URL only when filtering
    dispatch(setFilterByPriceValue(filteredPrices));

    const existingSearchParams = new URLSearchParams(window.location.search);

    if (filteredPrices[0] === 0 && filteredPrices[1] === highestPrice) {
      existingSearchParams.delete('minPrice');
      existingSearchParams.delete('maxPrice');
    } else {
      existingSearchParams.set('minPrice', filteredPrices[0]);
      existingSearchParams.set('maxPrice', filteredPrices[1]);
    }

    navigate(`/Products?${existingSearchParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-[30px] ">
      <div className="flex flex-col gap-[10px]">
        {highestPrice && (
          <Range
            step={10}
            min={0}
            max={highestPrice}
            values={filteredPrices}
            onChange={handleChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "4px",
                  width: "100%",
                  backgroundColor: "#7c58d3",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#7c58d3",
                  borderRadius: "50%",
                  marginLeft: "-10px",
                }}
              />
            )}
          >
            {({ filterByPriceValue }) => (
              <>
                <span style={{ position: "absolute", left: "calc(50% - 14px)", top: "-25px" }}>
                  {filterByPriceValue[0]}
                </span>
                <span style={{ position: "absolute", right: "calc(50% - 14px)", top: "-25px" }}>
                  {filterByPriceValue[1]}
                </span>
              </>
            )}
          </Range>
        )}

        <div className="flex justify-between">
          <div className="flex gap-[12px]">
            <span className="text-[16px] font-normal">From</span>
            <span className="text-h5 font-bold text-primary">${filteredPrices[0]}</span>
          </div>
          <div className="flex gap-[12px]">
            <span className="text-[16px] font-normal">To</span>
            <span className="text-h5 font-bold text-primary">${filteredPrices[1]}</span>
          </div>
        </div>
      </div>

      <div
        className="w-full bg-lightPrimary text-center rounded-standart py-[15px] cursor-pointer text-[16px] font-extrabold leading-[19px] simpleHover"
        onClick={handleFilterByPrice}
      >
        Filter
      </div>
    </div>
  );
};

export default PriceRangeSlider;
