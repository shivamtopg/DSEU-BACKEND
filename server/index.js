const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const homeRoutes = require("./routes/home");
const aboutUsMemoir = require("./routes/about/memoir/memoir.js");
const aboutUsMemoirConvocation = require("./routes/about/memoir/convocation.js");
const aboutUsMemoirFormerVcs = require("./routes/about/memoir/formerVc.js");
const aboutUsUniversityCalender = require("./routes/about/vcMessage.js");
const aboutUsVisionAndMission = require("./routes/about/visionAndMission.js");
const aboutUsVcMessage = require("./routes/about/vcMessage.js");
const aboutUsAnnualReport = require("./routes/about/annualReport/year.js");
const aboutUsGoverningBodies = require("./routes/about/governingBodies.js");
const aboutUsBrouchure = require("./routes/about/brouchure.js");
const aboutUsColleges = require("./routes/about/aboutColleges.js");
const aboutUsDisabledFriendliness = require("./routes/about/policies/disabledFriendliness.js");
const aboutUsPoliciesGreenPolicy = require("./routes/about/policies/greenPolicy.js");
const aboutUsPoliciesEgovernance = require("./routes/about/policies/egovernance.js");

const academicsResearch = require("./routes/academics/research.js");
const listOfColleges = require("./routes/academics/listOfColleges.js");
const academicsFaculty = require("./routes/academics/faculty.js");
const academicsSyllabus = require("./routes/academics/syllabus/revisedSyllabus.js");
const UGSyllabus = require("./routes/academics/syllabus/UGSyllabus.js");
const PGSyllabus = require("./routes/academics/syllabus/PGSyllabus.js");
const DiplomaSyllabus = require("./routes/academics/syllabus/diplomaSyllabus.js");
const CertificateSyllabus = require("./routes/academics/syllabus/certificateCourse.js");
const academicCalender = require("./routes/academics/academicCalender.js");

const coursesDiploma = require("./routes/courses/diploma.js");
const coursesUG = require("./routes/courses/UG/UG.js");
const coursesBSC = require("./routes/courses/UG/BSC.js");
const coursesCertificate = require("./routes/courses/certificateCourse.js");

app.use("/api/", homeRoutes);
//about us routes
app.use("/api/aboutUs/memoir", aboutUsMemoir);
app.use("/api/aboutUs/memoir/convocation", aboutUsMemoirConvocation);
app.use("/api/aboutUs/memoir/formerVcs", aboutUsMemoirFormerVcs);
app.use("/api/aboutUs/universityCalender", aboutUsUniversityCalender);
app.use("/api/aboutUs/vcMessage", aboutUsVcMessage);
app.use("/api/aboutUs/visionAndMission", aboutUsVisionAndMission);
app.use("/api/aboutUs/annualReport", aboutUsAnnualReport);
app.use("/api/aboutUs/governingBodies", aboutUsGoverningBodies);
app.use("/api/aboutUs/brochure", aboutUsBrouchure);
app.use("/api/aboutUs/colleges", aboutUsColleges);
app.use(
  "/api/aboutUs/policies/disabledFriendliness",
  aboutUsDisabledFriendliness
);
app.use("/api/aboutUs/policies/greenPolicy", aboutUsPoliciesGreenPolicy);
app.use("/api/aboutUs/policies/egovernance", aboutUsPoliciesEgovernance);

//academics routes
app.use("/api/academics/research", academicsResearch);
app.use("/api/academics/listofcolleges", listOfColleges);
app.use("/api/academics/faculty", academicsFaculty);
app.use("/api/academics/syllabus", academicsSyllabus);
app.use("/api/academics/revisedSyllabus", academicsSyllabus);
app.use("/api/academics/UGSyllabus", academicsSyllabus);
app.use("/api/academics/PGSyllabus", academicsSyllabus);
app.use("/api/academics/diplomaSyllabus", academicsSyllabus);
app.use("/api/academics/certificateSyllabus", academicsSyllabus);
app.use("/api/academics/academicCalender", academicCalender);

//courses routes
app.use("/api/courses/diploma", coursesDiploma);
app.use("/api/courses/UG", coursesUG);
app.use("/api/courses/UG/BSC", coursesBSC);
app.use("/api/courses/certificate", coursesCertificate);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
