import React, { useState } from 'react'
import { AddApplicanTypeApi } from "../../../api/api"
export default function AddApplicantType() {
    const [formData, setFormData] = useState({
        selectedParent: "",    // Selected parent id
        selectedChild: "",     // Selected child id
        title: "",             // Item title
        level: 0
    });

    const addItem = async () => {
        if (!formData.title.trim()) return;

        const newItem = {
            title: formData.title,
            parent_id: formData.id,
            level: formData.level,
            all_parent_id: formData.all_parent_id ? `${formData.all_parent_id},${formData.id}` : `${formData.id}`,
        };

        try {
            // Replace with your API endpoint
            const response = await AddApplicanTypeApi(newItem);
            console.log(response)
            setFormData(prevState => ({
                ...prevState,
                title: "",               // Clear title
                selectedParent: "",      // Clear parent selection
                selectedChild: "",       // Clear child selection
                level: 0
            }));
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            <select name="selectedParent" onChange={handleChange} value={formData.selectedParent}>
                <option value="">Select Parent</option>
                {formData.data.filter(item => item.level === 0).map(parent => (
                    <option key={parent.id} value={parent.id}>{parent.title}</option>
                ))}
            </select>
            <select name="selectedChild" onChange={handleChange} value={formData.selectedChild}>
                <option value="">Select Child</option>
                {formData.data.filter(item => item.level === 1).map(child => (
                    <option key={child.id} value={child.id}>{child.title}</option>
                ))}
            </select>
            <button onClick={addItem}>Add Item</button>
            <pre>{JSON.stringify(formData.data, null, 2)}</pre>
        </div>
    );
}
