import React from "react";

const AssignedUserList = ({
  assined_to_user_id,
  assigned_to_name,
  assigned_to_profile_image,
  assigned_user_type_new,
}) => {
  // Function to map assigned user details
  const mapAssignedDetails = () => {
    const userIds = assined_to_user_id.split(",").map((id) => id.trim());
    const names = assigned_to_name.split(",").map((name) => name.trim());
    const profileImages = assigned_to_profile_image
      .split(",")
      .map((img) => img.trim());
    const userTypes = assigned_user_type_new
      .split(",")
      .map((type) => type.trim());

    return userIds.map((id, index) => ({
      userId: id || "N/A",
      name: names[index] || "N/A",
      profileImage: profileImages[index] || null,
      userType: userTypes[index] || "N/A",
    }));
  };

  const assignedUsers = mapAssignedDetails();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {assignedUsers.map((user, index) => (
        <div key={index}>
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              title={user.name + "(" + user.userType + ")"}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginLeft: "-15px",
                zIndex: index,
                border: "2px solid #ccc",
                transition: "transform 0.2s ease, z-index 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.2)";
                e.target.style.zIndex = 9999;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.zIndex = index;
              }}
            />
          ) : (
            <div
              title={user.name + "(" + user.userType + ")"}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginLeft: "-15px",
                zIndex: index,
                backgroundColor: "#ccc",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
                border: "2px solid #ccc",
                transition: "transform 0.2s ease, z-index 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.2)";
                e.target.style.zIndex = 9999;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.zIndex = index;
              }}
            >
              {user.name?.charAt(0).toUpperCase() || "?"}
            </div>
          )}
          {/* <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>User ID:</strong> {user.userId}
            </p>
            <p>
              <strong>Type:</strong> {user.userType}
            </p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default AssignedUserList;
