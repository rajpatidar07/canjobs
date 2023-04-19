import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { EmployeeDetails } from "../../api/api";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    fontSize: "10px",
  },
  section_right: {
    padding: "0 0 10px 10px",
    width: "70%",
    flexGrow: 1,
    color: "#333",
  },
  section_left: {
    width: "40%",
    padding: 10,
    backgroundColor: "#253846",
    color: "#fff",
  },
  pagesetup: {
    width: "100%",
    height: "100vh",
  },
  profile: {
    maxWidth: "60%",
    margin: "15px auto",
    border: "5px",
    borderColor: "#fff",
  },
  contact: {
    padding: "15px 5px",
    marginTop: "15px",
    // borderTop: "1px solid #fff",
    textAlign: "left",
  },
  divBox: {
    padding: "15px 0",
    // marginTop: "15px",
    // borderTop: "1px solid #fff",
    textAlign: "left",
  },
  contactRow: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
    lineHeight: 2,
  },
  icon: {
    fontWeight: "600",
    color: "#ccc",
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 10,
    textTransform: "uppercase",
    borderBottom: "1px solid #fff",
    width: "auto",
    paddingBottom: "5px",
  },
  subHeadingRight: {
    fontSize: 16,
    marginBottom: 10,
    textTransform: "uppercase",
    borderBottom: "1px solid #333",
    width: "auto",
    paddingBottom: "5px",
  },
  skillDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "5px",
  },
  Skill: {
    backgroundColor: "#fff",
    color: "#333",
    padding: "3px 5px",
    textTransform: "uppercase",
    borderRadius: "3px",
  },
  userName: {
    padding: "30px 15px",
    backgroundColor: "#f5f5f5",
    name: {
      fontSize: 24,
      textTransform: "uppercase",
    },
  },
});

// Create Document Component
function ResumeGrerator(props) {
  const [User, setUser] = useState([]);
  const [Skills, setSkills] = useState([]);
  const UserData = async () => {
    const userData = await EmployeeDetails(7);
    setUser(userData.data.employee[0]);
    setSkills(userData.data.skill);
  };
  useEffect(() => {
    UserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  console.log(Skills);
  return (
    <PDFViewer style={styles.pagesetup}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section_left}>
            <View style={styles.profile}>
              <Image
                src={
                  User.profile_photo !== null || ""
                    ? User.profile_photo
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeOWS60zE0_pk40_4fF40IWkb7nyLRRml0mzMgeY2GcSNXT32ZMhqyLhWEkWpXfggrLcI&usqp=CAU"
                }
              />
            </View>
            <View style={styles.contact}>
              <Text style={styles.subHeading}>Personal</Text>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>Phone:</Text>
                <Text style={styles.conValue}>{User.contact_no}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>Email:</Text>
                <Text style={styles.conValue}>{User.email}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>DOB:</Text>
                <Text style={styles.conValue}>{User.date_of_birth}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>Gender:</Text>
                <Text style={styles.conValue}>{User.gender}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>Marital Status:</Text>
                <Text style={styles.conValue}>{User.marital_status}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>Nationality:</Text>
                <Text style={styles.conValue}>{User.nationality}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>Current Location:</Text>
                <Text style={styles.conValue}>{User.current_location}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>Language:</Text>
                <Text style={styles.conValue}>{User.language}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>Religion:</Text>
                <Text style={styles.conValue}>{User.religion}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>Expert:</Text>
                <Text style={styles.conValue}>{User.experience} Year</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>Canada Work Permit:</Text>
                <Text style={styles.conValue}>{User.work_permit_canada}</Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>Other Country Work Permit:</Text>
                <Text style={styles.conValue}>
                  {User.work_permit_other_country}
                </Text>
              </View>
            </View>
            <View style={styles.contact}>
              <Text style={styles.subHeading}>SKILLS</Text>
              <View style={styles.skillDiv}>
                {(Skills || []).map((skill) => (
                  <Text key={skill.skill_id} style={styles.Skill}>
                    {skill.skill}
                  </Text>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.section_right}>
            <View style={styles.userName}>
              <Text style={styles.userName.name}>{User.name}</Text>
            </View>

            <View style={styles.divBox}>
              <Text style={styles.subHeadingRight}>About</Text>
              <View style={styles.AboutDiv}>
                <Text style={styles.aboutText}>{User.description}</Text>
              </View>
            </View>
            <View style={styles.divBox}>
              <Text style={styles.subHeadingRight}>Education</Text>
              <View style={styles.eduDiv}>
                {(Skills || []).map((skill) => (
                  <Text key={skill.skill_id} style={styles.eduInner}>
                    {skill.skill}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.divBox}>
              <Text style={styles.subHeadingRight}>Experience</Text>
              <View style={styles.expDiv}>
                {(Skills || []).map((skill) => (
                  <Text key={skill.skill_id} style={styles.expInner}>
                    {skill.skill}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default ResumeGrerator;
