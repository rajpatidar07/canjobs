import React from 'react';
import Select from 'react-select';

export default function SelectBox(props) {
  const selectedOption = props.options.find(
    (option) => option.value === props.selectedValue
  ) || null;

  return (
    <div style={{ minWidth: props.Width === "yes" ? '100%' : null }}>
      <Select
        options={props.options}
        name={props.type}
        id={props.type}
        value={selectedOption}
        onChange={(e) => {
          props.onChange(e);
        }}
        className={`text-capitalize w-100 ${props.className}`}
        isClearable={true}
        styles={{
          control: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
        isDisabled={props.isDisabled || false}
        placeholder={props.placeholder}
      />
    </div>
  );
}
