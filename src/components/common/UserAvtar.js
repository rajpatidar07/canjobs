const UserAvatar = ({ profileImage, name, userType, index, userId }) => {
  return profileImage ? (
    <img
      src={profileImage}
      alt={name}
      title={`${name} (${userType})`}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        zIndex: index,
        border: "2px solid #ccc",
        transition: "transform 0.2s ease, z-index 0.2s ease",
      }}
      data-user-id={userId} // Optional: Add user ID as a data attribute
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
      className="bg-info"
      title={`${name} (${userType})`}
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        zIndex: index,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "bold",
        border: "2px solid #ccc",
        transition: "transform 0.2s ease, z-index 0.2s ease",
      }}
      data-user-id={userId} // Optional: Add user ID as a data attribute
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.2)";
        e.target.style.zIndex = 9999;
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.zIndex = index;
      }}
    >
      {name?.charAt(0).toUpperCase() || "?"}
    </div>
  );
};

export default UserAvatar;
