import React, { useState } from 'react'
import Select from "react-select";

export default function SelectBox(props) {
    let [defValue, setDefValue] = useState("")
    return (
        <div>
            <Select
                options={props.options}
                name={props.type}
                id={props.type}
                value={
                    props.options.find((option) => option.value === (props.selectedValue || defValue))
                }
                onChange={(e) => {
                    props.onChange(e)
                    setDefValue(e ? e.value : null)
                }}
                className="text-capitalize w-100"
                isClearable={true}
                styles={{
                    control: (base) => ({
                        ...base,
                        margin: 0,
                        padding: 0,
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 9999, // 👈 Set z-index here
                    }),
                }}
            />
        </div>
    )
}
