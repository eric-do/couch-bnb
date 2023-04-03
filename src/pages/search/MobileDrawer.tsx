// External libraries
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { LazyMap, LazyMarker, LazyPopup } from '~/components/leafletMap.lazy';

// Custom hooks and APIs
import { useListings, useFavorites } from '~/api/';
import { useFocus } from '~/hooks/useFocus';

// Components
import { FaTimes, FaChevronLeft } from 'react-icons/fa';
import { MobileFakeSearch, MobileFunctionalSearch, SelectedSearch } from '~/components/search';
import { SearchLocation, BookingSearchPreference } from '~/types';

interface DrawerProps {
  handleCloseDrawer: () => void;
}

export default function MobileSearchDrawer({ handleCloseDrawer }: DrawerProps) {
  const [inputRef, setInputFocus] = useFocus();
  const [chosenLocation, setChosenLocation] = useState<SearchLocation>()
  const [displayState, setDisplayState] = useState< 'base' | 'baseDrawer' | 'isSearching' | 'hasSelected' >('baseDrawer');

  const handleMobileDrawerBackButton = () => {
    setDisplayState('baseDrawer');
  }

  const handleChooseLocation = (location: SearchLocation) => {
    handleMobileDrawerBackButton();
    setChosenLocation(location)
    setDisplayState('hasSelected')
  }

  const setDisplayStateToBase = () => setDisplayState('base')
  const setDisplayStateToBaseDrawer = () => setDisplayState('baseDrawer')
  const setDisplaystateToIsSearching = () => setDisplayState('isSearching')
  const setDisplayStateToHasSelected = () => setDisplayState('hasSelected')

  const setClearLocation = () => setChosenLocation(undefined);

  return (
    <div className={`w-full flex flex-col space-y-5 pt-16 z-modal`}>

      {/* Close button */}
      <div
        className={`btn btn-circle btn-outline btn-sm border text-gray-400 mb-5 bg-white absolute top-5 left-5`}
        onClick={displayState === 'baseDrawer' ? handleCloseDrawer : handleMobileDrawerBackButton}
      >
        {displayState === 'baseDrawer' && <FaTimes className="text-black" />}
        {displayState !== 'baseDrawer' && <FaChevronLeft className="text-black" />}
      </div>

      {/* Drawer content */}

      {/* Location Search */}
      <div
        className={clsx(
          `w-full p-5 flex justify-start flex-col space-y-5 bg-white shadow-2xl rounded-2xl`, // general CSS
          'transition-[max-height] duration-300', // animations
          displayState === 'isSearching' && "h-screen",
          displayState === 'hasSelected' && "cursor-pointer rounded-xl"
        )}
        onClick={displayState === 'hasSelected' ? setDisplayStateToBaseDrawer : () => {}}
      >

        {displayState === 'baseDrawer' && <MobileFakeSearch
          location={chosenLocation}
          onClick={() => {
            setDisplayState('isSearching');
            setInputFocus();
          }}/>
        }

        {(displayState === 'isSearching' ) && <MobileFunctionalSearch
            ref={inputRef}
            onClick={handleChooseLocation}
            location={chosenLocation}
            clearLocation={setClearLocation}
          />
        }

        {chosenLocation && displayState === 'hasSelected' && <SelectedSearch
          location={chosenLocation}
          onClick={() => setDisplayState('baseDrawer')}/>
        }
      </div>

      {/* Date Input */}
      <button className={`w-full p-5 flex justify-between bg-white shadow-md rounded-xl transition-[max-height] duration-300`}>
        <div className="text-gray-500 text-sm">When</div>
        <div className="text-gray-800 text-sm font-semibold">Add dates</div>
      </button>

      {/* Guest input */}
      <button className={`w-full p-5 flex justify-between bg-white shadow-md rounded-xl transition-[max-height] duration-300`}>
        <div className="text-gray-500 text-sm">Who</div>
        <div className="text-gray-800 text-sm font-semibold">Add guests</div>
      </button>
    </div>
  )
}
