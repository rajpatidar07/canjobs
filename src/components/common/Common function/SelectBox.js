import React from 'react'
import Select from "react-select";

export default function SelectBox(props) {
    return (
        <div>
            <Select
                options={props.options}
                name={props.type}
                id={props.type}
                value={
                    props.options.find((option) => option.value === props.selectedValue) || null
                }
                onChange={(e) => {
                    props.onChange(e)
                }}
                className="text-capitalize w-100"
                isClearable={true}
                styles={{
                    control: (base) => ({
                        ...base,
                        margin: 0,
                        padding: 0,
                    }),
                }}
            />
        </div>
    )
}
