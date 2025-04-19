
// Admin API URL
const API_URL = "https://localhost:7238/api";
const API_URL2 = "https://localhost:7238";

// === About Page ===
async function fetchAboutPage() {
  try {
    const response = await fetch(`${API_URL}/AboutPage`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const aboutPage = await response.json();
    return aboutPage;
  } catch (error) {
    console.error("Error fetching Data in about Page:", error);
  }
}
async function updateAboutPage(aboutPage) {
  const formData = new FormData();
  if (aboutPage.aboutTitle) formData.append("AboutTitle", aboutPage.aboutTitle);
  if (aboutPage.aboutImageUrl)
    formData.append("AboutImage", aboutPage.aboutImageUrl);
  if (aboutPage.aboutDescription)
    formData.append("AboutDescription", aboutPage.aboutDescription);
  if (aboutPage.missionTitle)
    formData.append("MissionTitle", aboutPage.missionTitle);
  if (aboutPage.missionImageUrl)
    formData.append("MissionImage", aboutPage.missionImageUrl);
  if (aboutPage.missionDescription)
    formData.append("MissionDescription", aboutPage.missionDescription);

  const response = await fetch(`${API_URL}/AboutPage`, {
    method: "PUT",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const updatedAboutPage = await response.json();
  return updatedAboutPage;
}

// === Certifications ===
async function fetchCertifications() {
  try {
    const response = await fetch(`${API_URL}/Certifications`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const certifications = await response.json();
    return certifications;
  } catch (error) {
    console.error("Error fetching Data in certifications:", error);
  }
}
async function fetchCertificationById(certificationId) {
  try {
    const response = await fetch(
      `${API_URL}/Certifications/${certificationId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const certification = await response.json();
    return certification;
  } catch (error) {
    console.error("Error fetching Data in certifications:", error);
  }
}
async function addCertification(certification) {
  const formData = new FormData();
  formData.append("CertificationId", certification.CertificationId);
  formData.append("Name", certification.Name);
  formData.append("Description", certification.Description);
  formData.append("Image", certification.Image);
  formData.append("DateAcquired", certification.DateAcquired);
  formData.append("IsActive", certification.IsActive);

  const response = await fetch(`${API_URL}/Certifications`, {
    method: "POST",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function updateCertification(certification) {
  const formData = new FormData();
  if (certification.CertificationId)
    formData.append("CertificationId", certification.CertificationId);
  if (certification.Name) formData.append("Name", certification.Name);
  if (certification.Description)
    formData.append("Description", certification.Description);
  if (certification.Image) formData.append("Image", certification.Image);
  if (certification.DateAcquired)
    formData.append("DateAcquired", certification.DateAcquired);
  if (certification.IsActive)
    formData.append("IsActive", certification.IsActive);
  const response = await fetch(
    `${API_URL}/Certifications/${certification.Id}`,
    {
      method: "PUT",
      headers: {
        Authorization: AdminToken,
      },
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function deleteCertification(certificationId) {
  const response = await fetch(`${API_URL}/Certifications/${certificationId}`, {
    method: "DELETE",
    headers: {
      Authorization: AdminToken,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function toggleCertificationStatus(certificationId) {
  try {
    const response = await fetch(
      `${API_URL}/Certifications/toggle/${certificationId}`,
      {
        method: "PUT",
        headers: {
          Authorization: AdminToken,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const updatedCertification = await response.json();
    return updatedCertification;
  } catch (error) {
    console.error("Error toggling certification status:", error);
  }
}

// === Contact ===
async function sendMessage(event) {
  event.preventDefault();

  const name = document.getElementById("form-name").value.trim();
  const email = document.getElementById("form-email").value.trim();
  const phone = document.getElementById("form-phone").value.trim();
  const subject = document.getElementById("form-subject").value;
  const message = document.getElementById("form-message").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const phoneRegex = /^\+?\d{10,15}$/;
  if (phone && !phoneRegex.test(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  const data = {
    name,
    email,
    phone,
    subject,
    message,
  };

  try {
    const response = await fetch(`${API_URL}/Contact/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Your message was sent successfully!");
      document.getElementById("contactForm").reset();
    } else {
      const error = await response.text();
      alert("Failed to send message: " + error);
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong. Please try again later.");
  }
}
async function getAllMessages() {
  try {
    const response = await fetch(`${API_URL}/Contact/all`, {
      method: "GET",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const messages = await response.json();
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}
async function fetchMessageById(messageId) {
  try {
    const response = await fetch(`${API_URL}/Contact/${messageId}`, {
      method: "GET",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const message = await response.json();
    return message;
  } catch (error) {
    console.error("Error fetching message:", error);
  }
}

// === Courses ===
async function fetchCourses() {
  try {
    const response = await fetch(`${API_URL}/Courses`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const courses = await response.json();
    return courses;
  } catch (error) {
    console.error("Error fetching Data in courses:", error);
  }
}
async function fetchCourseById(courseId) {
  try {
    const response = await fetch(`${API_URL}/Courses/${courseId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const course = await response.json();
    return course;
  } catch (error) {
    console.error("Error fetching Data in courses:", error);
  }
}
async function addCourse(course) {
  const formData = new FormData();
  formData.append("Name", course.Name);
  formData.append("ShortDescription", course.ShortDescription);
  formData.append("HoursCount", course.HoursCount);
  formData.append("Rating", course.Rating);
  formData.append("CourseInfo", course.CourseInfo);
  formData.append("WhatYouWillLearn", course.WhatYouWillLearn);
  formData.append("PriceBeforeDiscount", course.PriceBeforeDiscount);
  formData.append("PriceAfterDiscount", course.PriceAfterDiscount);
  formData.append("DiscountPercentage", course.DiscountPercentage);
  formData.append("ScheduleStart", course.ScheduleStart);
  formData.append("WeeksCount", course.WeeksCount);
  formData.append("SessionTimings", course.SessionTimings);
  formData.append("InstructorId", course.InstructorId);
  formData.append("CourseTypeId", course.CourseTypeId);
  formData.append("Image", course.Image);
  formData.append("Location", course.Location);

  const response = await fetch(`${API_URL}/Courses`, {
    method: "POST",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function updateCourse(course) {
  const formData = new FormData();
  if (course.Name) formData.append("Name", course.Name);
  if (course.ShortDescription)
    formData.append("ShortDescription", course.ShortDescription);
  if (course.HoursCount) formData.append("HoursCount", course.HoursCount);
  if (course.Rating) formData.append("Rating", course.Rating);
  if (course.CourseInfo) formData.append("CourseInfo", course.CourseInfo);
  if (course.WhatYouWillLearn)
    formData.append("WhatYouWillLearn", course.WhatYouWillLearn);
  if (course.PriceBeforeDiscount)
    formData.append("PriceBeforeDiscount", course.PriceBeforeDiscount);
  if (course.PriceAfterDiscount)
    formData.append("PriceAfterDiscount", course.PriceAfterDiscount);
  if (course.DiscountPercentage)
    formData.append("DiscountPercentage", course.DiscountPercentage);
  if (course.ScheduleStart)
    formData.append("ScheduleStart", course.ScheduleStart);
  if (course.WeeksCount) formData.append("WeeksCount", course.WeeksCount);
  if (course.SessionTimings)
    formData.append("SessionTimings", course.SessionTimings);
  if (course.Location) formData.append("Location", course.Location);
  if (course.InstructorId) formData.append("InstructorId", course.InstructorId);
  if (course.CourseTypeId) formData.append("CourseTypeId", course.CourseTypeId);
  if (course.Image) formData.append("Image", course.Image);

  const response = await fetch(`${API_URL}/Courses/${course.Id}`, {
    method: "PUT",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function deleteCourse(courseId) {
  const response = await fetch(`${API_URL}/Courses/${courseId}`, {
    method: "DELETE",
    headers: {
      Authorization: AdminToken,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function fetchCourseComments(courseId) {
  try {
    const response = await fetch(
      `${API_URL}/Courses/get-courses-comments/${courseId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error("Error fetching Data in course comments:", error);
  }
}
async function addCourseComment(comment, courseId) {
  const formData = new FormData();
  formData.append("Name", comment.Name);
  formData.append("Image", comment.Image);
  formData.append("JobTitle", comment.JobTitle);
  formData.append("Text", comment.Text);

  const response = await fetch(`${API_URL}/Courses/${courseId}/add-comment`, {
    method: "POST",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function deleteCourseComment(commentId) {
  const response = await fetch(
    `${API_URL}/Courses/delete-comment/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: AdminToken,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}

// === Course Types ===
async function fetchCourseTypes() {
  try {
    const response = await fetch(`${API_URL}/CourseTypes`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const courseTypes = await response.json();
    return courseTypes;
  } catch (error) {
    console.error("Error fetching Data in courses:", error);
  }
}
async function fetchCourseTypeById(courseTypeId) {
  try {
    const response = await fetch(`${API_URL}/CourseTypes/${courseTypeId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const courseType = await response.json();
    return courseType;
  } catch (error) {
    console.error("Error fetching Data in courses:", error);
  }
}
async function addCourseType(courseType) {
  const formData = new FormData();
  formData.append("Name", courseType.Name);
  formData.append("Description", courseType.Description);
  formData.append("Image", courseType.Image);
  const response = await fetch(`${API_URL}/CourseTypes`, {
    method: "POST",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const addedCourseType = await response.json();
  return addedCourseType;
}
async function updateCourseType(courseType) {
  const formData = new FormData();
  if (courseType.Name) formData.append("Name", courseType.Name);
  if (courseType.Description)
    formData.append("Description", courseType.Description);
  if (courseType.Image) formData.append("Image", courseType.Image);

  const response = await fetch(`${API_URL}/CourseTypes/${courseType.Id}`, {
    method: "PUT",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const updatedCourseType = await response.json();
  return updatedCourseType;
}
async function deleteCourseType(courseTypeId) {
  const response = await fetch(`${API_URL}/CourseTypes/${courseTypeId}`, {
    method: "DELETE",
    headers: {
      Authorization: AdminToken,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const deletedCourseType = await response.json();
  return deletedCourseType;
}

// === Email List ===
async function submitEmail(Email) {
  try {
    const response = await fetch(`${API_URL}/EmailList/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: Email }),
    });
    if (response.status == 409) {
      alert("Email already exists");
      return;
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    if (response.status == 201) {
      alert("Email added successfully");
    }
    const result = await response.json();
  } catch (error) {
    console.error("Error submitting email:", error);
  }
}
async function fetchEmailList() {
  try {
    const response = await fetch(`${API_URL}/subscribe`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const emailList = await response.json();
    return emailList;
  } catch (error) {
    console.error("Error fetching Data in email list:", error);
  }
}
async function getCsvEmailsFile() {
  try {
    const response = await fetch(`${API_URL}/subscribe/csv`, {
      method: "GET",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emails.csv";
    a.click();
  } catch (error) {
    console.error("Error downloading CSV file:", error);
  }
}

// === Events ===
async function fetchEvents() {
  try {
    const response = await fetch(`${API_URL}/Events`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error("Error fetching Data in events:", error);
  }
}
async function fetchEventById(eventId) {
  try {
    const response = await fetch(`${API_URL}/Events/${eventId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const event = await response.json();
    return event;
  } catch (error) {
    console.error("Error fetching Data in events:", error);
  }
}
async function addEvent(event) {
  const formData = new FormData();
  formData.append("Name", event.Name);
  formData.append("Description", event.Description);
  formData.append("Location", event.Location);
  formData.append("Image", event.Image);
  formData.append("StartDate", event.StartDate);
  formData.append("EndDate", event.EndDate);
  formData.append("Status", event.Status);
  formData.append("Capacity", event.Capacity);
  formData.append("IsFeaturedEvent", event.IsFeaturedEvent);
  const response = await fetch(`${API_URL}/Events`, {
    method: "POST",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function updateEvent(event) {
  const formData = new FormData();
  if (event.Name) formData.append("Name", event.Name);
  if (event.Description) formData.append("Description", event.Description);
  if (event.Location) formData.append("Location", event.Location);
  if (event.Image) formData.append("Image", event.Image);
  if (event.StartDate) formData.append("StartDate", event.StartDate);
  if (event.EndDate) formData.append("EndDate", event.EndDate);
  if (event.Status) formData.append("Status", event.Status);
  if (event.Capacity) formData.append("Capacity", event.Capacity);
  if (event.IsFeaturedEvent)
    formData.append("IsFeaturedEvent", event.IsFeaturedEvent);
  const response = await fetch(`${API_URL}/Events/${event.Id}`, {
    method: "PUT",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function deleteEvent(eventId) {
  const response = await fetch(`${API_URL}/Events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: AdminToken,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}

// === Footer ===
async function fetchFooter() {
  try {
    const response = await fetch(`${API_URL}/Footer`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const footer = await response.json();
    return footer;
  } catch (error) {
    console.error("Error fetching Data in footer:", error);
  }
}
async function updateFooter(footer) {
  const formData = new FormData();
  if (footer.Image) formData.append("Image", footer.Image);
  if (footer.Description) formData.append("Description", footer.Description);
  if (footer.Copyright) formData.append("Copyright", footer.Copyright);
  if (footer.Address) formData.append("Address", footer.Address);
  if (footer.Phone) formData.append("Phone", footer.Phone);
  if (footer.Email) formData.append("Email", footer.Email);
  if (footer.WorkingHours) formData.append("WorkingHours", footer.WorkingHours);
  if (footer.SocialMediaHTML)
    formData.append("SocialMediaHTML", footer.SocialMediaHTML);
  const response = await fetch(`${API_URL}/Footer`, {
    method: "PUT",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}

// === General Info ===
async function fetchGeneralInfo() {
  try {
    const response = await fetch(`${API_URL}/GeneralInfo`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const GeneralInfo = await response.json();
    return GeneralInfo;
  } catch (error) {
    console.error("Error fetching Data in general info:", error);
  }
}
async function updateGeneralInfo(GeneralInfo) {
  const formData = new FormData();
  if (GeneralInfo.Image) formData.append("Image", GeneralInfo.Image);
  if (GeneralInfo.Video) formData.append("Video", GeneralInfo.Video);
  if (GeneralInfo.WelcomeMessage)
    formData.append("WelcomeMessage", GeneralInfo.WelcomeMessage);
  if (GeneralInfo.ShortMessage)
    formData.append("ShortMessage", GeneralInfo.ShortMessage);
  if (GeneralInfo.ButtonText)
    formData.append("ButtonText", GeneralInfo.ButtonText);
  if (GeneralInfo.TotalStudents)
    formData.append("TotalStudents", GeneralInfo.TotalStudents);
  if (GeneralInfo.TotalInstructors)
    formData.append("TotalInstructors", GeneralInfo.TotalInstructors);
  if (GeneralInfo.TotalHours)
    formData.append("TotalHours", GeneralInfo.TotalHours);
  if (GeneralInfo.TotalStars)
    formData.append("TotalStars", GeneralInfo.TotalStars);

  const response = await fetch(`${API_URL}/GeneralInfo`, {
    method: "PUT",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return "GeneralInfo updated successfully";
}

// === Home Page Comments ===
async function fetchHomePageComments() {
  try {
    const response = await fetch(`${API_URL}/HomePageComments`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error("Error fetching Data in home page comments:", error);
  }
}
async function addHomePageComment(comment) {
  const formData = new FormData();
  formData.append("Name", comment.Name);
  formData.append("Image", comment.Image);
  formData.append("JobTitle", comment.JobTitle);
  formData.append("Text", comment.Text);
  formData.append("Rating", comment.Rating);
  const response = await fetch(`${API_URL}/HomePageComments`, {
    method: "POST",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function deleteHomePageComment(commentId) {
  const response = await fetch(`${API_URL}/HomePageComments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: AdminToken,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const deletedComment = await response;
  return deletedComment;
}

// === Instructors ===
async function fetchInstructors() {
  try {
    const response = await fetch(`${API_URL}/Instructors`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const instructors = await response.json();
    return instructors;
  } catch (error) {
    console.error("Error fetching Data in instructors:", error);
  }
}
async function fetchInstructorById(instructorId) {
  try {
    const response = await fetch(`${API_URL}/Instructors/${instructorId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const instructor = await response.json();
    return instructor;
  } catch (error) {
    console.error("Error fetching Data in instructors:", error);
  }
}
async function addInstructor(instructor) {
  const formData = new FormData();
  formData.append("Name", instructor.Name);
  formData.append("JobTitle", instructor.JobTitle);
  formData.append("Description", instructor.Description);
  formData.append("Image", instructor.Image);
  formData.append("SocialMediaHTML", instructor.SocialMediaHTML);
  formData.append("Rating", instructor.Rating);
  const response = await fetch(`${API_URL}/Instructors`, {
    method: "POST",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function updateInstructor(instructor) {
  const formData = new FormData();
  if (instructor.Name) formData.append("Name", instructor.Name);
  if (instructor.JobTitle) formData.append("JobTitle", instructor.JobTitle);
  if (instructor.Description)
    formData.append("Description", instructor.Description);
  if (instructor.Image) formData.append("Image", instructor.Image);
  if (instructor.SocialMediaHTML)
    formData.append("SocialMediaHTML", instructor.SocialMediaHTML);
  if (instructor.Rating) formData.append("Rating", instructor.Rating);

  const response = await fetch(`${API_URL}/Instructors/${instructor.Id}`, {
    method: "PUT",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function deleteInstructor(instructorId) {
  const response = await fetch(`${API_URL}/Instructors/${instructorId}`, {
    method: "DELETE",
    headers: {
      Authorization: AdminToken,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}

// === Partners ===
async function fetchPartners() {
  try {
    const response = await fetch(`${API_URL}/Partners`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const partners = await response.json();
    return partners;
  } catch (error) {
    console.error("Error fetching Data in partners:", error);
  }
}
async function addPartner(partner) {
  const formData = new FormData();
  formData.append("Name", partner.Name);
  formData.append("Image", partner.Image);

  const response = await fetch(`${API_URL}/Partners`, {
    method: "POST",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function deletePartner(partnerId) {
  const response = await fetch(`${API_URL}/Partners/${partnerId}`, {
    method: "DELETE",
    headers: {
      Authorization: AdminToken,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}

// === Professional Team ===
async function fetchProfessionalTeam() {
  try {
    const response = await fetch(`${API_URL}/ProfessionalTeam`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const professionalTeam = await response.json();
    return professionalTeam;
  } catch (error) {
    console.error("Error fetching Data in professional team:", error);
  }
}
async function addProfessionalTeamMember(member) {
  const formData = new FormData();
  formData.append("FullName", member.FullName);
  formData.append("Position", member.Position);
  formData.append("Description", member.Description);
  formData.append("Image", member.Image);
  if (member.SocialMediaHTML)
    formData.append("SocialMediaHTML", member.SocialMediaHTML);

  const response = await fetch(`${API_URL}/ProfessionalTeam`, {
    method: "POST",
    headers: {
      Authorization: AdminToken,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}
async function deleteProfessionalTeamMember(memberId) {
  const response = await fetch(`${API_URL}/ProfessionalTeam/${memberId}`, {
    method: "DELETE",
    headers: {
      Authorization: AdminToken,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response;
}

// === Statistics ===
async function fetchTotal() {
  try {
    const response = await fetch(`${API_URL}/Statistics/totals`, {
      method: "GET",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const total = await response.json();
    return total;
  } catch (error) {
    console.error("Error fetching Data in total:", error);
  }
}
async function fetchTrafficMonthly() {
  try {
    const response = await fetch(`${API_URL}/Statistics/Traffic/Monthly`, {
      method: "GET",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const total = await response.json();
    return total;
  } catch (error) {
    console.error("Error fetching Data in traffic monthly:", error);
  }
}
async function fetchTrafficYearly() {
  try {
    const response = await fetch(`${API_URL}/Statistics/Traffic/Yearly`, {
      method: "GET",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const total = await response.json();
    return total;
  } catch (error) {
    console.error("Error fetching Data in traffic yearly:", error);
  }
}
async function fetchTrafficCsv() {
  try {
    const response = await fetch(`${API_URL}/Traffic/Csv`, {
      method: "GET",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "traffic.csv";
    a.click();
  } catch (error) {
    console.error("Error downloading CSV file:", error);
  }
}
async function fetchAdminLog() {
  try {
    const response = await fetch(`${API_URL}/Statistics/AdminLog`, {
      method: "GET",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const total = await response.json();
    return total;
  } catch (error) {
    console.error("Error fetching Data in admin log:", error);
  }
}

// === Student Enrollment ===
async function fetchStudentEnrollment() {
  try {
    const response = await fetch(`${API_URL}/StudentEnrollment`, {
      method: "GET",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const studentEnrollment = await response.json();
    return studentEnrollment;
  } catch (error) {
    console.error("Error fetching student enrollment data:", error);
  }
}
async function fetchStudentEnrollmentById(Id) {
  try {
    const response = await fetch(`${API_URL}/StudentEnrollment/${Id}`, {
      method: "GET",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const studentEnrollment = await response.json();
    return studentEnrollment;
  } catch (error) {
    console.error("Error fetching student enrollment data:", error);
  }
}
async function deleteStudentEnrollment(Id) {
  try {
    const response = await fetch(`${API_URL}/StudentEnrollment/${Id}`, {
      method: "DELETE",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response;
  } catch (error) {
    console.error("Error deleting student enrollment data:", error);
  }
}
async function fetchStudentEnrollmentByCourseId(courseId) {
  try {
    const response = await fetch(
      `${API_URL}/StudentEnrollment/Course/${courseId}`,
      {
        method: "GET",
        headers: {
          Authorization: AdminToken,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const studentEnrollment = await response.json();
    return studentEnrollment;
  } catch (error) {
    console.error("Error fetching student enrollment data:", error);
  }
}
async function fetchUnreadStudentEnrollment() {
  try {
    const response = await fetch(`${API_URL}/StudentEnrollment/Unread`, {
      method: "GET",
      headers: {
        Authorization: AdminToken,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const studentEnrollment = await response.json();
    return studentEnrollment;
  } catch (error) {
    console.error("Error fetching student enrollment data:", error);
  }
}
async function markStudentEnrollmentAsRead(Id) {
  try {
    const response = await fetch(
      `${API_URL}/StudentEnrollment/MarkAsRead/${Id}`,
      {
        method: "PUT",
        headers: {
          Authorization: AdminToken,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response;
  } catch (error) {
    console.error("Error marking student enrollment as read:", error);
  }
}
async function fetchStudentEnrollmentCsv() {
  try {
    const response = await fetch(
      `${API_URL}/StudentEnrollment/export-csv-all`,
      {
        method: "GET",
        headers: {
          Authorization: AdminToken,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_enrollment.csv";
    a.click();
  } catch (error) {
    console.error("Error downloading CSV file:", error);
  }
}

// === Session Management ===
let AdminToken = JSON.parse(localStorage.getItem("userData"))?.token;

if (!AdminToken) {
  window.location.href = "../../login/login.html";
} else {
  const expiresAt = new Date(
    JSON.parse(localStorage.getItem("userData"))?.expiresAt
  );
  const now = new Date();
  if (expiresAt < now) {
    alert("Session expired. Please log in again.");
    localStorage.removeItem("userData");
    window.location.href = "../../login/login.html";
  }
  AdminToken = "Bearer " + AdminToken;
}

// === DashBoard Management ===

document.addEventListener("DOMContentLoaded", async function () {
  const totals = await fetchTotal();
  const targetValues = {
    coursesCount: Number(totals.totalCourses),
    trainersCount: totals.totalInstructors,
    studentsCount: totals.totalUsers,
    eventsCount: totals.totalEvents,
  };

  function animateCounter(elementId, target, duration = 2000) {
    const element = document.getElementById(elementId);
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  animateCounter("coursesCount", targetValues.coursesCount);
  animateCounter("trainersCount", targetValues.trainersCount);
  animateCounter("studentsCount", targetValues.studentsCount);
  animateCounter("eventsCount", targetValues.eventsCount);
});

document.addEventListener("DOMContentLoaded", async function () {
  const trafficData = await fetchTrafficMonthly();

  const yearGroups = {};
  trafficData.forEach((entry) => {
    if (!yearGroups[entry.year]) {
      yearGroups[entry.year] = new Array(12).fill(0);
    }
    yearGroups[entry.year][entry.month - 1] = entry.count;
  });

  const datasets = Object.entries(yearGroups).map(
    ([year, monthlyCounts], index) => ({
      label: `Visitors ${year}`,
      data: monthlyCounts,
      fill: false,
      borderColor: getColor(index),
      backgroundColor: getColor(index, 0.2),
      borderWidth: 2,
    })
  );

  const ctx = document.getElementById("siteActivityChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: datasets,
    },
  });
});

document.addEventListener("DOMContentLoaded", displayRecentUpdates);

document
  .getElementById("loadMoreBtn")
  .addEventListener("click", loadMoreUpdates);

function getColor(index, opacity = 1) {
  const colors = ["#FF6384", "#36A2EB", "#4BC0C0", "#9966FF", "#FF9F40"];
  const color = colors[index % colors.length];
  return opacity === 1 ? color : color.replace("1)", `${opacity})`);
}

let allUpdates = [];
let displayedCount = 0;
const pageSize = 5;

async function displayRecentUpdates() {
  const recentUpdates = await fetchAdminLog();
  allUpdates = recentUpdates;
  displayedCount = 0;
  document.getElementById("recentUpdates").innerHTML = "";
  loadMoreUpdates();
}
function loadMoreUpdates() {
  const updatesContainer = document.getElementById("recentUpdates");
  const updatesToShow = allUpdates.slice(
    displayedCount,
    displayedCount + pageSize
  );
  updatesToShow.forEach((update) => {
    const updateElement = document.createElement("a");
    const updateTime = new Date(update.timestamp);
    const egyptTime = new Intl.DateTimeFormat("en-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Africa/Cairo",
    }).format(updateTime);
    updateElement.className = "list-group-item list-group-item-action";
    updateElement.innerHTML = `
                <div class="d-flex justify-content-between">
                    <div>
                        <h6 class="mb-1">${update.action}</h6>
                        <small class="text-muted">${update.details}</small>
                    </div>
                    <div class="text-end">
                        <small class="text-muted">${egyptTime}</small><br>
                        <small class="text-muted">By: ${update.role}</small>
                    </div>
                </div>
            `;
    updatesContainer.appendChild(updateElement);
  });
  displayedCount += updatesToShow.length;
  if (displayedCount >= allUpdates.length) {
    document.getElementById("loadMoreBtn").style.display = "none";
  }
}
displayRecentUpdates();

// === Edit Home Page and Course Type ===

const homePageBtn = document.getElementById("HomePageButton");
const homePageBtn1 = document.getElementById("HomePageButton1");
const HeroForm = document.getElementById("editHeroForm");
const CourseCategoryTable = document.getElementById("courseCategoriesTable");
const StatesForm = document.getElementById("editStatsForm");
const AddCategoryForm = document.getElementById("addCategoryForm");
const HomePageCommentsTable = document.getElementById("homePageCommentsTable");
const AddHomePageCommentForm = document.getElementById(
  "addHomePageCommentForm"
);

homePageBtn.addEventListener("click", HomePageFunction());
homePageBtn1.addEventListener("click", HomePageFunction());

HeroForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const heroData = {
    Image: HeroForm.querySelector("#heroLogo").files[0],
    Video: HeroForm.querySelector("#heroVideo").files[0],
    WelcomeMessage: HeroForm.querySelector("#heroTitle").value,
    ShortMessage: HeroForm.querySelector("#heroSubtitle").value,
    ButtonText: HeroForm.querySelector("#heroButtonText").value,
  };
  try {
    await updateGeneralInfo(heroData);
    showToast("Data saved successfully");
  } catch (error) {
    showToast2("Error saving data");
  }
});
StatesForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const statesData = {
    TotalStudents: StatesForm.querySelector("#studentsStat").value,
    TotalInstructors: StatesForm.querySelector("#instructorsStat").value,
    TotalHours: StatesForm.querySelector("#hoursStat").value,
    TotalStars: StatesForm.querySelector("#ratingStat").value,
  };
  try {
    await updateGeneralInfo(statesData);
    showToast("Data saved successfully");
    HomePageFunction();
  } catch (error) {
    showToast2("Error saving data");
  }
});
AddCategoryForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const courseTypeData = {
    Name: AddCategoryForm.querySelector("#categoryName").value,
    Description: AddCategoryForm.querySelector("#DescriptionOfCourses").value,
    Image: AddCategoryForm.querySelector("#categoryImage").files[0],
  };
  try {
    await addCourseType(courseTypeData);
    showToast("Data saved successfully");
    HomePageFunction();
  } catch (error) {
    showToast2("Error saving data");
  }
});
AddHomePageCommentForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const homePageCommentData = {
    Name: AddHomePageCommentForm.querySelector("#nameInput").value,
    Image: AddHomePageCommentForm.querySelector("#imgInput").files[0],
    JobTitle: AddHomePageCommentForm.querySelector("#jobInput").value,
    Text: AddHomePageCommentForm.querySelector("#commentInput").value,
    Rating: AddHomePageCommentForm.querySelector("#starsInput").value,
  };
  try {
    await addHomePageComment(homePageCommentData);
    showToast("Data saved successfully");
    HomePageFunction();
  } catch (error) {
    showToast2("Error saving data");
  }
});

async function HomePageFunction() {
  const heroData = await fetchGeneralInfo();
  const courseTypesData = await fetchCourseTypes();
  const homePageCommentsData = await fetchHomePageComments();

  HeroForm.querySelector("#heroTitle").value = heroData.welcomeMessage;
  HeroForm.querySelector("#heroSubtitle").value = heroData.shortMessage;
  HeroForm.querySelector("#heroButtonText").value = heroData.buttonText;

  let CourseTypesTableData = ``;
  let HomePageCommentsTableData = ``;

  for (const courseType of courseTypesData) {
    CourseTypesTableData += `
                <tr>
                <td>${courseType.id}</td>
                <td><img src="${API_URL2}/${courseType.imageUrl}" alt="${courseType.name}" style="width:50px; height:50px; object-fit:cover; border-radius:50%;"></td>
                <td>${courseType.name}</td>
                <td>${courseType.description}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="checkEditCourseType(${courseType.id})">
                        <i class="bi bi-pencil"></i>
                    </button>            
                    <button class="btn btn-sm btn-danger" onclick="checkDeleteCourseType(${courseType.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                </tr>
            `;
  }

  for (const comment of homePageCommentsData) {
    HomePageCommentsTableData += `
                <tr>
                <td><img src="${API_URL2}/${comment.imageUrl}" alt="${comment.name}" style="width:50px; height:50px; object-fit:cover; border-radius:50%;"></td>
                <td>${comment.name}</td>
                <td>${comment.rating}</td>
                <td>${comment.jobTitle}</td>
                <td>${comment.text}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="CheckDeleteHomePageComment(${comment.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                </tr>
            `;
  }

  CourseCategoryTable.querySelector("tbody").innerHTML = CourseTypesTableData;
  HomePageCommentsTable.querySelector("tbody").innerHTML =
    HomePageCommentsTableData;
  StatesForm.querySelector("#studentsStat").value = heroData.totalStudents;
  StatesForm.querySelector("#instructorsStat").value =
    heroData.totalInstructors;
  StatesForm.querySelector("#hoursStat").value = heroData.totalHours;
  StatesForm.querySelector("#ratingStat").value = heroData.totalStars;
}

async function CheckDeleteHomePageComment(commentId) {
  const confirmation = confirm("Are you sure you want to delete this comment?");
  if (confirmation) {
    try {
      await deleteHomePageComment(commentId);
      showToast("Comment deleted successfully");
      HomePageFunction();
    } catch (error) {
      showToast2("Error deleting comment");
    }
  }
}

async function checkEditCourseType(courseTypeId) {
  const courseType = await fetchCourseTypeById(courseTypeId);
  // console.log(courseType);
  const EditCategoryForm = document.getElementById("EditCategoryForm");
  EditCategoryForm.querySelector("#EditCategoryName").value = courseType.name;
  EditCategoryForm.querySelector("#EditDescriptionOfCourses").value =
    courseType.description;
  EditCategoryForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const UpdatedCategoryData = {
      Id: courseTypeId,
      Name: EditCategoryForm.querySelector("#EditCategoryName").value,
      Description: EditCategoryForm.querySelector("#EditDescriptionOfCourses")
        .value,
      Image: EditCategoryForm.querySelector("#EditCategoryImage").files[0],
    };
    const confirmation = confirm(
      "Are you sure you want to Update This Category?"
    );
    if (!confirmation) {
      return;
    }
    try {
      await updateCourseType(UpdatedCategoryData);
      showToast("Data saved successfully");
      HomePageFunction();
    } catch (error) {
      showToast2("Error saving data");
    }
  });
  const modal = new bootstrap.Modal(
    document.getElementById("EditCategoryModal")
  );
  modal.show();
}

async function checkDeleteCourseType(courseTypeId) {
  confirmation = confirm("Are you sure you want to delete this course type?");
  if (confirmation) {
    try {
      await deleteCourseType(courseTypeId);
      showToast("Course type deleted successfully");
      HomePageFunction();
    } catch (error) {
      showToast2("Error deleting course type");
    }
  }
}

// === About Management ===
const aboutPageBtn = document.getElementById("AboutPageButton");
const aboutPageBtn1 = document.getElementById("AboutPageButton1");

const aboutForm = document.getElementById("aboutEditForm");

aboutPageBtn.addEventListener("click", AboutPageFunction());
aboutPageBtn1.addEventListener("click", AboutPageFunction());

async function AboutPageFunction() {
  const aboutData = await fetchAboutPage();
  aboutForm.querySelector("#aboutTitle").value = aboutData.aboutTitle;
  aboutForm.querySelector("#aboutDescription").value =
    aboutData.aboutDescription;
  aboutForm.querySelector("#missionTitle").value = aboutData.missionTitle;
  aboutForm.querySelector("#missionDescription").value =
    aboutData.missionDescription;
}

aboutForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const aboutData = {
    aboutTitle: aboutForm.querySelector("#aboutTitle").value,
    aboutDescription: aboutForm.querySelector("#aboutDescription").value,
    aboutImageUrl: aboutForm.querySelector("#aboutImage").files[0],
    missionTitle: aboutForm.querySelector("#missionTitle").value,
    missionDescription: aboutForm.querySelector("#missionDescription").value,
    missionImageUrl: aboutForm.querySelector("#missionImage").files[0],
  };
  console.log(aboutData);
  const confirmation = confirm("Are you sure you want to Update This Data?");
  if (!confirmation) {
    return;
  }
  try {
    await updateAboutPage(aboutData);
    showToast("Data saved successfully");
    AboutPageFunction();
  } catch (error) {
    showToast2("Error saving data");
  }
});

// === footer Management ===
const footerBtn = document.getElementById("FooterButton");
const footerBtn1 = document.getElementById("FooterButton1");

const footerForm = document.getElementById("footerForm");
footerBtn.addEventListener("click", FooterFunction());
footerBtn1.addEventListener("click", FooterFunction());

async function FooterFunction() {
  const footerData = await fetchFooter();
  footerForm.querySelector("#footerDescription").value = footerData.description;
  footerForm.querySelector("#footerCopyright").value = footerData.copyright;
  footerForm.querySelector("#footerAddress").value = footerData.address;
  footerForm.querySelector("#footerPhone").value = footerData.phone;
  footerForm.querySelector("#footerEmail").value = footerData.email;
  footerForm.querySelector("#footerWorkingHours").value =
    footerData.workingHours;
  footerForm.querySelector("#footerSocialMediaHtml").value =
    footerData.socialMediaHTML;
}

footerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const footerData = {
    Description: footerForm.querySelector("#footerDescription").value,
    Copyright: footerForm.querySelector("#footerCopyright").value,
    Address: footerForm.querySelector("#footerAddress").value,
    Phone: footerForm.querySelector("#footerPhone").value,
    Email: footerForm.querySelector("#footerEmail").value,
    WorkingHours: footerForm.querySelector("#footerWorkingHours").value,
    SocialMediaHTML: footerForm.querySelector("#footerSocialMediaHtml").value,
  };
  const confirmation = confirm("Are you sure you want to Update This Data?");
  if (!confirmation) {
    return;
  }
  try {
    await updateFooter(footerData);
    showToast("Data saved successfully");
    FooterFunction();
  } catch (error) {
    showToast2("Error saving data");
  }
});

// === Events Management ===

const eventsTable = document.getElementById("eventsTable");

const addEventForm = document.getElementById("addEventForm");
const editEventForm = document.getElementById("editEventForm");

const EventBtn = document.getElementById("EventsButton");
const EventBtn1 = document.getElementById("EventsButton1");
const addEventBtn = document.getElementById("addEventBtn");

EventBtn.addEventListener("click", EventsFunction());
EventBtn1.addEventListener("click", EventsFunction());

addEventBtn.addEventListener("click", function () {
  const modal = new bootstrap.Modal(
    document.getElementById("addEventFormModal")
  );
  modal.show();
  addEventForm.reset();
});

addEventForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newEvent = {
    Name: addEventForm.querySelector("#addEventName").value,
    Location: addEventForm.querySelector("#addEventLocation").value,
    StartDate: addEventForm.querySelector("#addEventStartDate").value,
    EndDate: addEventForm.querySelector("#addEventEndDate").value,
    Description: addEventForm.querySelector("#addEventDescription").value,
    Status: addEventForm.querySelector("#addEventStatus").value,
    Capacity: addEventForm.querySelector("#addEventCapacity").value,
    IsFeaturedEvent: addEventForm.querySelector("#addEventFeatured").checked,
    Image: addEventForm.querySelector("#addEventImage").files[0],
  };
  const confirmation = confirm("Are you sure you want to Add This Event?");
  if (!confirmation) {
    return;
  }
  try {
    await addEvent(newEvent);
    showToast("Data saved successfully");
    EventsFunction();
  } catch (error) {
    showToast2("Error saving data");
  }
});

async function EventsFunction() {
  const eventsData = await fetchEvents();
  let eventsTableData = ``;
  for (const event of eventsData) {
    eventsTableData += `
                <tr>
                <td>${event.id}</td>
                <td>${event.name}</td>
                <td>${new Date(event.startDate).toISOString().slice(0, 16)}</td>
                <td>${event.location}</td>
                <td>${event.status}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="CheckUpdateEvent(${
                      event.id
                    })">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="CheckDeleteEvent(${
                      event.id
                    })">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                </tr>
            `;
  }
  eventsTable.querySelector("tbody").innerHTML = eventsTableData;
}
async function CheckDeleteEvent(eventid) {
  const confirmation = confirm("Are you sure you want to Delete This Event?");
  if (!confirmation) {
    return;
  }
  try {
    await deleteEvent(eventid);
    showToast("Event deleted successfully");
    EventsFunction();
  } catch (error) {
    showToast2("Error deleting event");
  }
}
async function CheckUpdateEvent(eventid) {
  const event = await fetchEventById(eventid);
  console.log(event);
  editEventForm.querySelector("#editEventName").value = event.name;
  editEventForm.querySelector("#editEventLocation").value = event.location;
  editEventForm.querySelector("#editEventStartDate").value = new Date(
    event.startDate
  )
    .toISOString()
    .slice(0, 16);
  editEventForm.querySelector("#editEventEndDate").value = new Date(
    event.endDate
  )
    .toISOString()
    .slice(0, 16);
  editEventForm.querySelector("#editEventDescription").value =
    event.description;
  editEventForm.querySelector("#editEventStatus").value = event.status;
  editEventForm.querySelector("#editEventCapacity").value = event.capacity;
  editEventForm.querySelector("#editEventFeatured").checked =
    event.isFeaturedEvent;

  const modal = new bootstrap.Modal(
    document.getElementById("editEventFormModal")
  );
  modal.show();
  editEventForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const updatedEvent = {
      Id: eventid,
      Name: editEventForm.querySelector("#editEventName").value,
      Location: editEventForm.querySelector("#editEventLocation").value,
      StartDate: editEventForm.querySelector("#editEventStartDate").value,
      EndDate: editEventForm.querySelector("#editEventEndDate").value,
      Description: editEventForm.querySelector("#editEventDescription").value,
      Status: editEventForm.querySelector("#editEventStatus").value,
      Capacity: editEventForm.querySelector("#editEventCapacity").value,
      IsFeaturedEvent:
        editEventForm.querySelector("#editEventFeatured").checked,
      Image: editEventForm.querySelector("#editEventImage").files[0],
    };
    const confirmation = confirm("Are you sure you want to Update This Event?");
    if (!confirmation) {
      return;
    }
    try {
      await updateEvent(updatedEvent);
      showToast("Data saved successfully");
      EventsFunction();
    } catch (error) {
      showToast2("Error saving data");
    }
  });
}

// === Courses Management ===

const coursesBtn = document.getElementById("CoursesButton");
const coursesBtn1 = document.getElementById("CoursesButton1");
const addCourseBtn = document.getElementById("addCourseBtn");
const coursesTable = document.getElementById("coursesTable");
const addCourseForm = document.getElementById("addCourseForm");
const updateCourseForm = document.getElementById("updateCourseForm");
const updateCourseCategory1 = document.getElementById("updateCourseCategory1");
const addCourseCategory1 = document.getElementById("addCourseCategory1");
const addCourseInstructor = document.getElementById("addCourseInstructor");
const updateCourseInstructor = document.getElementById(
  "updateCourseInstructor"
);
const commentCourseTable = document.getElementById("commentCourseTable");
const addCommentForm = document.getElementById("addCommentForm");

let CourseID = 0;

coursesBtn.addEventListener("click", CoursesFunction());
coursesBtn1.addEventListener("click", CoursesFunction());

async function CoursesFunction() {
  const coursesData = await fetchCourses();
  let coursesTableData = ``;
  for (const course of coursesData) {
    coursesTableData += `
                <tr>
                <td>${course.id}</td>
                <td><img src="${API_URL2}/${course.imageUrl}" alt="${course.name}" style="width:50px; height:50px; object-fit:cover; border-radius:50%;"></td>
                <td>${course.name}</td>
                <td>${course.courseType.name}</td>
                <td>${course.hoursCount}</td>
                <td>
                  <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#commentCorsModal" onclick="OpenCommentCorsModal(${course.id})">
                    <i class="bi bi-chat-left-text me-2"></i>
                  </button>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="CheckUpdateCourse(${course.id})">
                        <i class="bi bi-pencil"></i>
                    </button>            
                    <button class="btn btn-sm btn-danger" onclick="CheckDeleteCourse(${course.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                </tr>
            `;
  }
  coursesTable.querySelector("tbody").innerHTML = coursesTableData;
}
async function CheckDeleteCourse(courseId) {
  const confirmation = confirm("Are you sure you want to delete this course?");
  if (confirmation) {
    try {
      await deleteCourse(courseId);
      showToast("Course deleted successfully");
      CoursesFunction();
    } catch (error) {
      showToast2("Error deleting course");
    }
  }
}
async function CheckUpdateCourse(courseId) {
  const course = await fetchCourseById(courseId);
  const courseTypes = await fetchCourseTypes();
  const instructors = await fetchInstructors();
  let courseTypesOptions = ``;
  let instructorsOptions = ``;
  for (const instructor of instructors) {
    instructorsOptions += `
        <option value="${instructor.id}">${instructor.name}</option>
      `;
  }
  updateCourseInstructor.innerHTML = instructorsOptions;
  for (const courseType of courseTypes) {
    courseTypesOptions += `
                <option value="${courseType.id}">${courseType.name}</option>
            `;
  }
  updateCourseCategory1.innerHTML = courseTypesOptions;
  updateCourseForm.querySelector("#updateCourseName").value = course.name;
  updateCourseForm.querySelector("#updateCourseCategory1").value =
    course.courseType.id;
  updateCourseForm.querySelector("#updateCourseDuration").value =
    course.hoursCount;
  updateCourseForm.querySelector("#updateCourseDescription").value =
    course.shortDescription;
  updateCourseForm.querySelector("#updateCourseFullInformation").value =
    course.courseInfo;
  updateCourseForm.querySelector("#updateCourseLocation").value =
    course.location;
  updateCourseForm.querySelector("#updateCourseSessionTiming").value =
    course.sessionTimings;
  updateCourseForm.querySelector("#updateCourseWhatYouLearn").value =
    course.whatYouWillLearn;
  updateCourseForm.querySelector("#updateCourseRate").value = course.rating;
  updateCourseForm.querySelector("#updateCourseOriginalPrice").value =
    course.priceBeforeDiscount;
  updateCourseForm.querySelector("#updateCourseDiscountedPrice").value =
    course.priceAfterDiscount;
  updateCourseForm.querySelector("#updateCourseDiscountPercent").value =
    course.discountPercentage;
  updateCourseForm.querySelector("#updateCourseStartDate").value = new Date(
    course.scheduleStart
  )
    .toISOString()
    .slice(0, 10);

  updateCourseForm.querySelector("#updateCourseWeeksCount").value =
    course.weeksCount;
  updateCourseForm.querySelector("#updateCourseInstructor").value =
    course.instructor.id;
  console.log(course.instructor.id);

  const modal = new bootstrap.Modal(
    document.getElementById("updateCourseModal")
  );
  modal.show();
  updateCourseForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const updatedCourse = {
      Id: courseId,
      Name: updateCourseForm.querySelector("#updateCourseName").value,
      Image: updateCourseForm.querySelector("#updateCourseImage").files[0],
      HoursCount: updateCourseForm.querySelector("#updateCourseDuration").value,
      ShortDescription: updateCourseForm.querySelector(
        "#updateCourseDescription"
      ).value,
      CourseInfo: updateCourseForm.querySelector("#updateCourseFullInformation")
        .value,
      WhatYouWillLearn: updateCourseForm.querySelector(
        "#updateCourseWhatYouLearn"
      ).value,
      Rating: updateCourseForm.querySelector("#updateCourseRate").value,
      PriceBeforeDiscount: updateCourseForm.querySelector(
        "#updateCourseOriginalPrice"
      ).value,
      PriceAfterDiscount: updateCourseForm.querySelector(
        "#updateCourseDiscountedPrice"
      ).value,
      DiscountPercentage: updateCourseForm.querySelector(
        "#updateCourseDiscountPercent"
      ).value,
      ScheduleStart: updateCourseForm.querySelector("#updateCourseStartDate")
        .value,
      WeeksCount: updateCourseForm.querySelector("#updateCourseWeeksCount")
        .value,
      InstructorId: updateCourseForm.querySelector("#updateCourseInstructor")
        .value,
      Location: updateCourseForm.querySelector("#updateCourseLocation").value,
      SessionTimings: updateCourseForm.querySelector(
        "#updateCourseSessionTiming"
      ).value,
      CourseTypeId: updateCourseForm.querySelector("#updateCourseCategory1")
        .value,
    };
    const confirmation = confirm(
      "Are you sure you want to Update This Course?"
    );
    if (!confirmation) {
      return;
    }
    try {
      await updateCourse(updatedCourse);
      showToast("Data saved successfully");
      CoursesFunction();
    } catch (error) {
      showToast2("Error saving data");
    }
  });
}
async function OpenCommentCorsModal(courseId) {
  CourseID = courseId;
  const courseComments = await fetchCourseComments(courseId);
  let commentCourseTableData = ``;
  for (const comment of courseComments) {
    commentCourseTableData += `
                <tr>
                <td><img src="${API_URL2}/${comment.imageUrl}" alt="${comment.name}" style="width:50px; height:50px; object-fit:cover; border-radius:50%;"></td>
                <td>${comment.name}</td>
                <td>${comment.jobTitle}</td>
                <td>${comment.text}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="CheckDeleteComment(${comment.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                </tr>
            `;
  }
  commentCourseTable.querySelector("tbody").innerHTML = commentCourseTableData;
}
async function CheckDeleteComment(commentId) {
  const confirmation = confirm("Are you sure you want to delete this comment?");
  if (confirmation) {
    try {
      await deleteCourseComment(commentId);
      showToast("Comment deleted successfully");
      OpenCommentCorsModal(commentId);
    } catch (error) {
      showToast2("Error deleting comment");
    }
  }
}
addCourseBtn.addEventListener("click", async function () {
  const courseTypes = await fetchCourseTypes();
  const instructors = await fetchInstructors();
  let courseTypesOptions = `<option value="" selected disabled >Select Category</option>`;
  let instructorsOptions = `<option value="" selected disabled >Select Instructor</option>`;
  for (const instructor of instructors) {
    instructorsOptions += `
        <option value="${instructor.id}">${instructor.name}</option>
      `;
  }
  addCourseInstructor.innerHTML = instructorsOptions;
  for (const courseType of courseTypes) {
    courseTypesOptions += `
                <option value="${courseType.id}">${courseType.name}</option>
            `;
  }
  addCourseCategory1.innerHTML = courseTypesOptions;
  const modal = new bootstrap.Modal(document.getElementById("addCourseModal"));
  modal.show();
});
addCourseForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newCourse = {
    Name: addCourseForm.querySelector("#addCourseName").value,
    Image: addCourseForm.querySelector("#addCourseImage").files[0],
    HoursCount: addCourseForm.querySelector("#addCourseDuration").value,
    ShortDescription: addCourseForm.querySelector("#addCourseDescription")
      .value,
    CourseInfo: addCourseForm.querySelector("#addCourseFullInformation").value,
    WhatYouWillLearn: addCourseForm.querySelector("#addCourseWhatYouLearn")
      .value,
    Rating: addCourseForm.querySelector("#addCourseRate").value,
    PriceBeforeDiscount: addCourseForm.querySelector("#addCourseOriginalPrice")
      .value,
    PriceAfterDiscount: addCourseForm.querySelector("#addCourseDiscountedPrice")
      .value,
    DiscountPercentage: addCourseForm.querySelector("#addCourseDiscountPercent")
      .value,
    ScheduleStart: addCourseForm.querySelector("#addCourseStartDate").value,
    WeeksCount: addCourseForm.querySelector("#addCourseWeeksCount").value,
    InstructorId: addCourseForm.querySelector("#addCourseInstructor").value,
    Location: addCourseForm.querySelector("#addCourseLocation").value,
    SessionTimings: addCourseForm.querySelector("#addCourseSessionTiming")
      .value,
    CourseTypeId: addCourseForm.querySelector("#addCourseCategory1").value,
  };
  const confirmation = confirm("Are you sure you want to Add This Course?");
  if (!confirmation) {
    return;
  }
  try {
    console.log(newCourse);
    await addCourse(newCourse);
    showToast("Data saved successfully");
    CoursesFunction();
  } catch (error) {
    showToast2("Error saving data");
  }
});
addCommentForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newComment = {
    Name: addCommentForm.querySelector("#userName").value,
    Image: addCommentForm.querySelector("#userImage").files[0],
    JobTitle: addCommentForm.querySelector("#userTitle").value,
    Text: addCommentForm.querySelector("#commentText").value,
    Rating: addCommentForm.querySelector("#ratingInput").value,
  };
  const confirmation = confirm("Are you sure you want to Add This Comment?");
  if (!confirmation) {
    return;
  }
  try {
    await addCourseComment(newComment, CourseID);
    showToast("Data saved successfully");
    OpenCommentCorsModal(CourseID);
  } catch (error) {
    showToast2("Error saving data");
  }
});

// Student Enrollment Management

const studentEnrollmentBtn = document.getElementById("StudentsButton");
const studentEnrollmentBtn1 = document.getElementById("StudentsButton1");
const allStudents = [
  {
    id: 1,
    name: "John Doe",
    phone: "1234567890",
    email: "g3D0P@example.com",
    courseName: "Flutter",
    isReaded: false,
    DateTime: "2023-10-01T12:00:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "9876543210",
    email: "jane@example.com",
    courseName: "React",
    isReaded: false,
    DateTime: "2023-10-01T12:00:00",
  },
  {
    id: 3,
    name: "Ali Kamal",
    phone: "0111111111",
    email: "ali@example.com",
    courseName: "Node.js",
    isReaded: true,
    DateTime: "2023-10-01T12:00:00",
  },
  {
    id: 4,
    name: "Sarah Noor",
    phone: "0100000000",
    email: "sarah@example.com",
    courseName: "AI",
    isReaded: false,
    DateTime: "2023-10-01T12:00:00",
  },
  {
    id: 5,
    name: "Omar Ali",
    phone: "0123456789",
    email: "omar@example.com",
    courseName: "Python",
    isReaded: false,
    DateTime: "2023-10-01T12:00:00",
  },
  {
    id: 6,
    name: "Lina Fathy",
    phone: "0198765432",
    email: "lina@example.com",
    courseName: "Java",
    isReaded: true,
    DateTime: "2023-10-01T12:00:00",
  },
  {
    id: 7,
    name: "Mohamed Ahmed",
    phone: "0101234567",
    email: "mohamed@example.com",
    courseName: "Flutter",
    isReaded: false,
    DateTime: "2023-10-01T12:00:00",
  },
  {
    id: 8,
    name: "Hana Youssef",
    phone: "0112345678",
    email: "hana@example.com",
    courseName: "React",
  },
  {
    id: 9,
    name: "Yasser Ibrahim",
    phone: "0123456789",
    email: "yasser@example.com",
    courseName: "Node.js",
    isReaded: true,
    DateTime: "2023-10-01T12:00:00",
  },
  {
    id: 10,
    name: "Nada Walid",
    phone: "0156789012",
    email: "nada@example.com",
    courseName: "AI",
    isReaded: false,
    DateTime: "2023-10-01T12:00:00",
  },
  {
    id: 11,
    name: "Karim Samy",
    phone: "0167890123",
    email: "karim@example.com",
    courseName: "Python",
    isReaded: false,
    DateTime: "2023-10-01T12:00:00",
  },
  {
    id: 12,
    name: "Dina Hossam",
    phone: "0178901234",
    email: "dina@example.com",
    courseName: "Java",
    isReaded: true,
    DateTime: "2023-10-01T12:00:00",
  },
];
function loadMoreStudents() {
  const tbody = document.getElementById("studentsTbody");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  const nextStudents = filteredStudents.slice(
    displayedStudents,
    displayedStudents + 4
  );

  nextStudents.forEach((student) => {
    const row = document.createElement("tr");
    let button = student.isReaded
      ? `<button class="btn btn-sm btn-outline-success"><i class="bi bi-check"></i> Readed</button>`
      : `<button class="btn btn-sm btn-outline-danger"><i class="bi bi-x"></i> Not Readed</button>`;
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.phone}</td>
      <td>${student.email}</td>
      <td>${student.courseName}</td>
      <td>${new Date(student.DateTime).toISOString().slice(0, 16)}</td>
      <td>${button}</td>
      <td><button class="btn btn-sm btn-outline-danger delete-btn"><i class="bi bi-trash"></i> Delete</button></td>
    `;
    tbody.appendChild(row);
  });

  displayedStudents += nextStudents.length;

  if (displayedStudents >= filteredStudents.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

function filterStudents() {
  const searchTerm = document
    .getElementById("studentSearch")
    .value.toLowerCase();
  const courseFilter = document.getElementById("courseFilter").value;

  filteredStudents = allStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm);
    const matchesCourse =
      courseFilter === "all" || student.courseName === courseFilter;
    return matchesSearch && matchesCourse;
  });

  document.getElementById("studentsTbody").innerHTML = "";
  displayedStudents = 0;

  loadMoreStudents();
}
studentEnrollmentBtn.addEventListener("click", StudentEnrollmentFunction);
studentEnrollmentBtn1.addEventListener("click", StudentEnrollmentFunction);

function StudentEnrollmentFunction() {
  filterStudents();
}

let displayedStudents = 0;
let filteredStudents = [];

document.addEventListener("DOMContentLoaded", function () {
  filteredStudents = [...allStudents];
  loadMoreStudents();
});



// Partner Management
const partnersTable = document.getElementById("partnersTable");
const addPartnerForm = document.getElementById("partnerForm");

const partnersBtn = document.getElementById("PartnersButton");
const partnersBtn1 = document.getElementById("PartnersButton1");

partnersBtn.addEventListener("click", PartnersFunction());
partnersBtn1.addEventListener("click", PartnersFunction());

async function PartnersFunction() {
  const partnersData = await fetchPartners();
  let partnersTableData = ``;
  for (const partner of partnersData) {
    partnersTableData += `
                <tr>
                <td>${partner.id}</td>
                <td><img src="${API_URL2}/${partner.imageUrl}" alt="${partner.name}" style="width:50px; height:50px; object-fit:cover; border-radius:50%;"></td>
                <td>${partner.name}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="CheckDeletePartner(${partner.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                </tr>
            `;
  }
  partnersTable.querySelector("tbody").innerHTML = partnersTableData;
}
async function CheckDeletePartner(partnerId) {
  const confirmation = confirm("Are you sure you want to delete this partner?");
  if (confirmation) {
    try {
      await deletePartner(partnerId);
      showToast("Partner deleted successfully");
      PartnersFunction();
    } catch (error) {
      showToast2("Error deleting partner");
    }
  }
}
addPartnerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newPartner = {
    Name: addPartnerForm.querySelector("#partnerName").value,
    Image: addPartnerForm.querySelector("#partnerLogo").files[0],
  };
  const confirmation = confirm("Are you sure you want to Add This Partner?");
  if (!confirmation) {
    return;
  }
  try {
    await addPartner(newPartner);
    showToast("Data saved successfully");
    PartnersFunction();
  } catch (error) {
    showToast2("Error saving data");
  }
});

// === Instructors Management ===
const instructorsTable = document.getElementById("instructorsTable");
const addInstructorForm = document.getElementById("addInstructorForm");
const updateInstructorForm = document.getElementById("updateInstructorForm");
const instructorsBtn = document.getElementById("InstructorButton");
const instructorsBtn1 = document.getElementById("InstructorButton1");

instructorsBtn.addEventListener("click", InstructorsFunction());
instructorsBtn1.addEventListener("click", InstructorsFunction());

async function InstructorsFunction() {
  const instructorsData = await fetchInstructors();
  let instructorsTableData = ``;
  for (const instructor of instructorsData) {
    instructorsTableData += `
                <tr>
                <td>${instructor.id}</td>
                <td><img src="${API_URL2}/${instructor.imageUrl}" alt="${instructor.name}" style="width:50px; height:50px; object-fit:cover; border-radius:50%;"></td>
                <td>${instructor.name}</td>
                <td>${instructor.jobTitle}</td>
                <td>${instructor.description}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="CheckUpdateInstructor(${instructor.id})">
                        <i class="bi bi-pencil"></i>
                    </button>            
                    <button class="btn btn-sm btn-danger" onclick="CheckDeleteInstructor(${instructor.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                </tr>
            `;
  }
  instructorsTable.querySelector("tbody").innerHTML = instructorsTableData;
}
async function CheckDeleteInstructor(instructorId) {
  const confirmation = confirm(
    "Are you sure you want to delete this instructor?"
  );
  if (confirmation) {
    try {
      await deleteInstructor(instructorId);
      showToast("Instructor deleted successfully");
      InstructorsFunction();
    } catch (error) {
      showToast2("Error deleting instructor");
    }
  }
}
async function CheckUpdateInstructor(instructorId) {
  const instructor = await fetchInstructorById(instructorId);
  updateInstructorForm.querySelector("#updateInstructorName").value =
    instructor.name;
  updateInstructorForm.querySelector("#updateInstructorJobTitle").value =
    instructor.jobTitle;
  updateInstructorForm.querySelector("#updateInstructorDescription").value =
    instructor.description;
  updateInstructorForm.querySelector("#updateInstructorRating").value =
    instructor.rating;
  updateInstructorForm.querySelector("#updateInstructorSocialMedia").value =
    instructor.socialMediaHTML;

  const modal = new bootstrap.Modal(
    document.getElementById("updateInstructorFormModal")
  );
  modal.show();
  updateInstructorForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const updatedInstructor = {
      Id: instructorId,
      Name: updateInstructorForm.querySelector("#updateInstructorName").value,
      Image: updateInstructorForm.querySelector("#updateInstructorImage")
        .files[0],
      JobTitle: updateInstructorForm.querySelector("#updateInstructorJobTitle")
        .value,
      Description: updateInstructorForm.querySelector(
        "#updateInstructorDescription"
      ).value,
      Rating: updateInstructorForm.querySelector("#updateInstructorRating")
        .value,
      SocialMediaHTML: updateInstructorForm.querySelector(
        "#updateInstructorSocialMedia"
      ).value,
    };
    const confirmation = confirm(
      "Are you sure you want to Update This Instructor?"
    );
    if (!confirmation) {
      return;
    }
    try {
      await updateInstructor(updatedInstructor);
      showToast("Data saved successfully");
      InstructorsFunction();
    } catch (error) {
      showToast2("Error saving data");
    }
  });
}
addInstructorForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newInstructor = {
    Name: addInstructorForm.querySelector("#addInstructorName").value,
    Image: addInstructorForm.querySelector("#addInstructorImage").files[0],
    JobTitle: addInstructorForm.querySelector("#addInstructorJobTitle").value,
    Description: addInstructorForm.querySelector("#addInstructorDescription")
      .value,
    Rating: addInstructorForm.querySelector("#addInstructorRating").value,
    SocialMediaHTML: addInstructorForm.querySelector(
      "#addInstructorSocialMedia"
    ).value,
  };
  const confirmation = confirm("Are you sure you want to Add This Instructor?");
  if (!confirmation) {
    return;
  }
  try {
    await addInstructor(newInstructor);
    showToast("Data saved successfully");
    InstructorsFunction();
  } catch (error) {
    showToast2("Error saving data");
  }
});

// === Accreditation Management ===
const accreditationTable = document.getElementById("accreditationTable");
const addAccreditationForm = document.getElementById("addAccreditationForm");
const updateAccreditationForm = document.getElementById(
  "updateAccreditationForm"
);
const accreditationBtn = document.getElementById("AccreditationButton");
const accreditationBtn1 = document.getElementById("AccreditationButton1");

accreditationBtn.addEventListener("click", AccreditationFunction());
accreditationBtn1.addEventListener("click", AccreditationFunction());

async function AccreditationFunction() {
  const accreditationData = await fetchCertifications();
  let accreditationTableData = ``;
  for (const accreditation of accreditationData) {
    accreditationTableData += `
                <tr>
                <td>${accreditation.certificationId}</td>
                <td><img src="${API_URL2}/${accreditation.imageUrl}" alt="${accreditation.name}" style="width:50px; height:50px; object-fit:cover; border-radius:50%;"></td>
                <td>${accreditation.name}</td>
                <td>${accreditation.dateAcquired}</td>
                <td>${accreditation.isActive}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="CheckUpdateAccreditation(${accreditation.id})">
                        <i class="bi bi-pencil"></i>
                    </button>            
                    <button class="btn btn-sm btn-danger" onclick="CheckDeleteAccreditation(${accreditation.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                </tr>
            `;
  }
  accreditationTable.querySelector("tbody").innerHTML = accreditationTableData;
}
async function CheckDeleteAccreditation(accreditationId) {
  const confirmation = confirm(
    "Are you sure you want to delete this accreditation?"
  );
  if (confirmation) {
    try {
      await deleteCertification(accreditationId);
      showToast("Accreditation deleted successfully");
      AccreditationFunction();
    } catch (error) {
      showToast2("Error deleting accreditation");
    }
  }
}
async function CheckUpdateAccreditation(Id) {
  const accreditation = await fetchCertificationById(Id);
  updateAccreditationForm.querySelector("#updateAccreditationName").value =
    accreditation.name;
  updateAccreditationForm.querySelector(
    "#updateAccreditationDateAcquired"
  ).value = new Date(accreditation.dateAcquired).toISOString().slice(0, 10);
  updateAccreditationForm.querySelector("#updateAccreditationStatus").checked =
    accreditation.isActive;
  updateAccreditationForm.querySelector("#updateAccreditationId").value =
    accreditation.certificationId;
  updateAccreditationForm.querySelector(
    "#updateAccreditationDescription"
  ).value = accreditation.description;

  const modal = new bootstrap.Modal(
    document.getElementById("updateAccreditationFormModal")
  );
  modal.show();
  updateAccreditationForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const updatedAccreditation = {
      Id: Id,
      Name: updateAccreditationForm.querySelector("#updateAccreditationName")
        .value,
      Image: updateAccreditationForm.querySelector("#updateAccreditationImage")
        .files[0],
      DateAcquired: updateAccreditationForm.querySelector(
        "#updateAccreditationDateAcquired"
      ).value,
      IsActive: updateAccreditationForm.querySelector(
        "#updateAccreditationStatus"
      ).checked,
      Description: updateAccreditationForm.querySelector(
        "#updateAccreditationDescription"
      ).value,
      CertificationId: updateAccreditationForm.querySelector(
        "#updateAccreditationId"
      ).value,
    };
    const confirmation = confirm(
      "Are you sure you want to Update This Accreditation?"
    );
    if (!confirmation) {
      return;
    }
    try {
      await updateCertification(updatedAccreditation);
      showToast("Data saved successfully");
      AccreditationFunction();
    } catch (error) {
      showToast2("Error saving data");
    }
  });
}
addAccreditationForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newAccreditation = {
    Name: addAccreditationForm.querySelector("#addAccreditationName").value,
    Image: addAccreditationForm.querySelector("#addAccreditationImage")
      .files[0],
    DateAcquired: addAccreditationForm.querySelector(
      "#addAccreditationDateAcquired"
    ).value,
    IsActive: addAccreditationForm.querySelector("#addAccreditationStatus")
      .checked,
    Description: addAccreditationForm.querySelector(
      "#addAccreditationDescription"
    ).value,
    CertificationId: addAccreditationForm.querySelector("#addAccreditationId")
      .value,
  };
  const confirmation = confirm(
    "Are you sure you want to Add This Accreditation?"
  );
  if (!confirmation) {
    return;
  }
  try {
    await addCertification(newAccreditation);
    showToast("Data saved successfully");
    AccreditationFunction();
  } catch (error) {
    showToast2("Error saving data");
  }
});

// === Message Management ===
// letter

// Team Management

const teamTable = document.getElementById("teamTable");
const teamBtn = document.getElementById("TeamButton");
const teamBtn1 = document.getElementById("TeamButton1");
const addTeamForm = document.getElementById("addMemberForm");

teamBtn.addEventListener("click", TeamFunction());
teamBtn1.addEventListener("click", TeamFunction());

async function TeamFunction() {
  const teamData = await fetchProfessionalTeam();
  let teamTableData = ``;
  for (const member of teamData) {
    teamTableData += `
                <tr>
                <td><img src="${API_URL2}/${member.imageUrl}" alt="${member.fullName}" style="width:50px; height:50px; object-fit:cover; border-radius:50%;"></td>
                <td>${member.fullName}</td>
                <td>${member.position}</td>
                <td>${member.description}</td>
                <td>          
                    <button class="btn btn-sm btn-danger" onclick="CheckDeleteMember(${member.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                </tr>
            `;
  }
  teamTable.querySelector("tbody").innerHTML = teamTableData;
}
async function CheckDeleteMember(memberId) {
  const confirmation = confirm("Are you sure you want to delete this member?");
  if (confirmation) {
    try {
      await deleteProfessionalTeamMember(memberId);
      showToast("Member deleted successfully");
      TeamFunction();
    } catch (error) {
      showToast2("Error deleting member");
    }
  }
}
addTeamForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newMember = {
    FullName: addTeamForm.querySelector("#addMemberName").value,
    Image: addTeamForm.querySelector("#addMemberImage").files[0],
    Position: addTeamForm.querySelector("#addMemberPosition").value,
    Description: addTeamForm.querySelector("#addMemberDescription").value,
    SocialMediaHTML: addTeamForm.querySelector("#addMemberSocialMedia").value,
  };
  const confirmation = confirm("Are you sure you want to Add This Member?");
  if (!confirmation) {
    return;
  }
  try {
    await addProfessionalTeamMember(newMember);
    showToast("Data saved successfully");
    TeamFunction();
  } catch (error) {
    showToast2("Error saving data");
  }
});

//=== Toasts ===

function showToast2(message) {
  const toastBody = document.getElementById("toastBody2");
  toastBody.textContent = message;
  const toast = new bootstrap.Toast(document.getElementById("saveToast2"));
  toast.show();
}
function showToast(message) {
  const toastBody = document.getElementById("toastBody");
  toastBody.textContent = message;
  const toast = new bootstrap.Toast(document.getElementById("saveToast"));
  toast.show();
}

// === Students Management ===

function filterMessages() {
  const selectedSubject = document.getElementById("subjectFilter").value;
  const rows = document.querySelectorAll("#messagesModal tbody tr");

  rows.forEach((row) => {
    const subject = row.getAttribute("data-subject");
    if (selectedSubject === "all" || subject === selectedSubject) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function showMessage(message) {
  document.getElementById("messageContent").textContent = message;
}
