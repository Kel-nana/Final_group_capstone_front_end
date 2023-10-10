/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const DoctorDropdown = ({ allDoctorList, selectedDoctorIndex, onChange }) => (
  <div className="rounded-2xl">
    <label htmlFor="doc-select"> Choose your doctor:</label>
    <select
      value={selectedDoctorIndex !== null ? selectedDoctorIndex : ''}
      onChange={(e) => onChange(e.target.value !== '' ? parseInt(e.target.value, 10) : null)}
      className="rounded-2xl"
      id="doc-select"
    >
      <option value="">Select a doctor</option>
      {allDoctorList.map((doctor) => (
        <option key={doctor.id} value={doctor.id}>
          {`${doctor.doc_name}`}
        </option>
      ))}
    </select>
  </div>
);

DoctorDropdown.prototype = {
  allDoctorList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      doc_name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedDoctorIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default DoctorDropdown;
