/*Function to set the color code to the background of the user name */
export default function determineBackgroundColor(item) {
    const colorClasses = [
        "bg-primary-opacity-7",
        "bg-warning-opacity-7",
        "bg-orange-opacity-6",
        "bg-info-opacity-7",
        "bg-secondary-opacity-7",
        "bg-danger-opacity-6",
        "bg-info-opacity-visible",
    ];

    const assignedUserId = item.assigned_to_user_id;

    // Create a mapping dynamically based on assignedUserId
    const userColorMap = {};

    // Check if assignedUserId is present in the mapping
    if (assignedUserId && userColorMap.hasOwnProperty(assignedUserId)) {
        return userColorMap[assignedUserId];
    }

    // If not found in the mapping, use the colorClasses logic
    const id = item.id || item.employee_id;
    const hashCode = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
        }
        return hash;
    };

    const hash = Math.abs(hashCode(id.toString()));
    const index = hash % colorClasses.length;

    return colorClasses[index];
};