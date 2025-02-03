/*Function to set the color code to the background of the user name */
export default function determineBackgroundColor(item) {
    const colorClasses = [
        "bg-secondary",
        "bg-info",
        "bg-dark",
        "bg-green",
        "bg-blue",
        "bg-eastern",
        "bg-denim",
        "bg-dodger",
        "bg-dodger-2",
        "bg-spray",
        "bg-turquoise",
        "bg-regent",
        "bg-coral",
        "bg-orange",
        "bg-orange-2",
        "bg-red",
        "bg-red-2",
        "bg-yellow",
        "bg-yellow-2",
        "bg-casablanca",
        "bg-indigo",
        "bg-shamrock",
        "bg-black",
        "bg-black-2",
        "bg-gray",
        "bg-smoke",
        "bg-pink",
        "bg-violet",
        "bg-ebony-clay",
        "bg-hit-gray",
        "bg-helio",
        "bg-allports",
        "bg-marino",
        "bg-poppy",
        "bg-egg-blue",
        "bg-conch",
        "bg-danger",
        "bg-warning",
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