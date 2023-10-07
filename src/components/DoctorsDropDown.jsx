import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { doctorData } from '../redux/reducer/doctorSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// eslint-disable-next-line react/prop-types
export default function DoctorsDropDown({ changeMessage }) {
  const allDoctorList = useSelector((state) => state.doctorsList.allDoctors);
  const [selected, setSelected] = useState(allDoctorList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doctorData());
  }, [dispatch]);

  useEffect(() => {
    // console.log(selected.id);
  }, [selected]);

  console.log(selected.doc_name, 'useEffect');

  const ClickHandler = () => {
    setTimeout(() => {
      changeMessage(selected.id);
    }, 600);
    // changeMessage(selected.doc_name);
  };

  useEffect(() => {
    let timeOutId;
    if (selected) {
      timeOutId = setTimeout(() => {
        changeMessage(selected.id);
      }, 600);
      console.log(selected.id, 'clickhandler');
    }
    return () => {
      clearTimeout(timeOutId); // Clear the timeout if the effect runs again
    };
  }, [selected]);

  console.log(allDoctorList);
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 w-[90%]">Assigned to</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-[82%] h-[55px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <img src={selected.profile_pic} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className="ml-3 block truncate">{selected.doc_name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {allDoctorList.map((doctor) => (
                  <Listbox.Option
                    key={doctor.id}
                    className={({ active }) => classNames(
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                    )}
                    value={doctor}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center" onClick={ClickHandler}>
                          <img src={doctor.profile_pic} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {doctor.doc_name}
                            {/* {doctor.doctor.id} */}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
