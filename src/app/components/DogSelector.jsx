"use client";

import react, { useState, useEffect } from "react";

export default function DogSelector() {
  const [breeds, setBreeds] = useState([]);
  const [subBreeds, setSubBreeds] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const [errorBreed, setErrorBreed] = useState(false);
  const [errorSubBreed, setErrorSubBreed] = useState(false);

  const [selectedBreed, setSelectedBreed] = useState("");

  const [selectedSubBreed, setSelectedSubBreed] = useState("");

  const [images, setImages] = useState([]);

  useEffect(() => {
    setErrorBreed(false);
    setImages([]);
  }, [selectedBreed]);

  useEffect(() => {
    setErrorSubBreed(false);
  }, [selectedSubBreed]);

  useEffect(() => {
    setLoading(true);

    fetch(process.env.NEXT_PUBLIC_LIST_BREEDS)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setBreeds(data.message);

        setLoading(false);
      })
      .catch((error) => {
        // Handle the error appropriately, e.g., set an error state
        console.error(error);
        setLoading(false);
      });

    return () => {
      setLoading(false);
    };
  }, []);

  const handleBreedSelection = (event) => {
    const selectedBreed = event.target.value;
    setSubBreeds(breeds[selectedBreed]);
    setSelectedBreed(selectedBreed);
  };

  const handleSubBreedSelection = (event) => {
    const selectedSubBreed = event.target.value;
    setSelectedSubBreed(selectedSubBreed);
  };

  const handleViewImage = (event) => {
    console.log("hi");

    if (selectedBreed == "") {
      setErrorBreed(true);
      return;
    }

    if (subBreeds.length > 1) {
      if (selectedSubBreed == "") {
        setErrorSubBreed(true);
        return;
      }
    }

    if (subBreeds.length == 0) {
      //just breeds

      //breed/hound/images

      console.log("hi");

      fetch(
        process.env.NEXT_PUBLIC_BY_BASE + `breed/${selectedBreed}/images`
      ).then((resp) => {
        resp.json().then((data) => {
          setImages(data.message);
        });
      });
    }


    if(subBreeds.length > 1){

        fetch(
            process.env.NEXT_PUBLIC_BY_BASE + `breed/${selectedBreed}/${selectedSubBreed}/images`
          ).then((resp) => {
            resp.json().then((data) => {
              setImages(data.message);
            });
          });

    }

  };

  return (
    <div>
      {isLoading == false && (
        <div className="flex mt-12 items-center space-x-3">
          <div>
            <select
              onChange={handleBreedSelection}
              className={`bg-gray-50 border ${
                errorBreed ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            >
              <option selected>Choose a Breed</option>
              {Object.keys(breeds).map((key, _) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          {subBreeds.length != 0 && (
            <div>
              <select
                onChange={handleSubBreedSelection}
                className={`bg-gray-50 border ${
                  errorSubBreed ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              >
                <option selected>Choose a Sub-Breed</option>
                {subBreeds.map((val, key) => (
                  <option key={key} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <button
              onClick={handleViewImage}
              className="border-2 border-white px-5 py-1  rounded-md"
            >
              {" "}
              View Images
            </button>
          </div>
        </div>
      )}

      <div className="flex mt-4 flex-wrap">
        {images.map((val, index) => (
          <div className="border-2 h-24 w-24 ">
            <img src={val} />
          </div>
        ))}
      </div>
    </div>
  );
}
