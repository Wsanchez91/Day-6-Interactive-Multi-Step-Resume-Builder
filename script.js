const step1 = document.querySelector("#step-1");
const step2 = document.querySelector("#step-2");
const step3 = document.querySelector("#step-3");
const preview = document.querySelector("#preview");
const form = document.querySelector("#form");
const firstName = document.querySelector("#first-name-input");
const lastName = document.querySelector("#last-name-input");
const email = document.querySelector("#email-input");
const phoneNum = document.querySelector("#phone-input");
const errorEmail = document.querySelector("#error-email");
const errorPhone = document.querySelector("#error-phoneNum");
const position = document.querySelector("#positions");
const yearsOfExp = document.querySelector("#years-of-exp-input");
const allSkillInputs = document.querySelectorAll("input[id^='skill-'");
const next1Btn = document.querySelector("#next-1");
const next2Btn = document.querySelector("#next-2");
const back1Btn = document.querySelector("#back-1");
const back2Btn = document.querySelector("#back-2");
const previewBtn = document.querySelector("#submit");
const addBtn = document.querySelector(".add");
const submitFinalBtn = document.querySelector("#submit-final");

const resumeInputs = JSON.parse(localStorage.getItem("inputs"));

const resumeData = {
  firstName: "William",
  lastName: "Sanchez",
  email: "will@example.com",
  phone: "1234567890",
  position: "Frontend",
  skills: ["JavaScript", "HTML", "CSS"],
  experience: 3,
};

next1Btn.addEventListener("click", () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^(\(\d{3}\)\s*|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

  errorEmail.textContent = "";
  errorPhone.textContent = "";

  // if (!emailPattern.test(email.value)) {
  //   errorEmail.textContent = "Need to enter valid Email";
  //   return;
  // }
  // if (!phonePattern.test(phoneNum.value)) {
  //   errorPhone.textContent = "Need to enter valid Phone Number";
  //   return;
  // }

  resumeData.firstName = firstName.value.trim();
  resumeData.lastName = lastName.value.trim();
  resumeData.email = email.value.trim();
  resumeData.phone = phoneNum.value.trim();

  console.log(resumeData);

  step1.style.display = "none";
  step2.style.display = "block";
});

addBtn.addEventListener("click", () => {
  const addSkillsContainer = document.querySelector("#add-skills");
  const skillCount = addSkillsContainer.children.length + 2; // Skill 1 already exists

  const skillDiv = document.createElement("div");
  skillDiv.id = `skill-${skillCount}`;

  skillDiv.innerHTML = `
  <label for="skill-${skillCount}-input">Skill <span>${skillCount}</span>:</label>
  <input type="text" id="skill-${skillCount}-input" placeholder="Enter Skill" />
  <button type="button" class="remove">Remove</button>
  <button type="button" class="add">+ Add</button>
`;

  addSkillsContainer.appendChild(skillDiv);

  // Bind the new buttons
  const newAddBtn = skillDiv.querySelector(".add");
  const newRemoveBtn = skillDiv.querySelector(".remove");

  newAddBtn.addEventListener("click", () => {
    addBtn.click(); // Trigger the same function recursively
  });

  newRemoveBtn.addEventListener("click", () => {
    skillDiv.remove();
  });
});

next2Btn.addEventListener("click", () => {
  const position = document.querySelector("#positions");
  const yearsOfExp = document.querySelector("#years-of-exp-input");
  const allSkillInputs = document.querySelectorAll("input[id^='skill-'");

  const skills = [];
  allSkillInputs.forEach((input) => {
    const value = input.value.trim();
    if (value) {
      skills.push(value);
    }
  });

  resumeData.position = position.value;
  resumeData.skills = skills;
  resumeData.experience = parseInt(yearsOfExp.value) || 0;

  // Fill Step 3 review spans with data
  document.querySelector("#first-name-rev span").textContent =
    resumeData.firstName;
  document.querySelector("#last-name-rev span").textContent =
    resumeData.lastName;
  document.querySelector("#email-rev span").textContent = resumeData.email;
  document.querySelector("#phone-rev span").textContent = resumeData.phone;
  document.querySelector("#positions-rev span").textContent =
    resumeData.position;
  document.querySelector("#skills-rev span").textContent =
    resumeData.skills.join(", ");
  document.querySelector("#years-of-exp-rev span").textContent =
    resumeData.experience;

  localStorage.setItem("inputs", JSON.stringify(resumeData));

  step2.style.display = "none";
  step3.style.display = "block";
});

back1Btn.addEventListener("click", () => {
  step1.style.display = "block";
  step2.style.display = "none";
});

back2Btn.addEventListener("click", () => {
  step3.style.display = "none";
  step2.style.display = "block";
});

previewBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const skills = [];
  allSkillInputs.forEach((input) => {
    const value = input.value.trim();
    if (value) {
      skills.push(value);
    }
  });

  resumeData.position = position.value;
  resumeData.skills = skills;
  resumeData.experience = parseInt(yearsOfExp.value) || 0;

  // === Inline Resume Preview Editing ===
  const previewFields = {
    firstName: (document.querySelector("#preview-firstName").textContent =
      resumeData.firstName),
    lastName: (document.querySelector("#preview-lastName").textContent =
      resumeData.lastName),
    email: (document.querySelector("#preview-email").textContent =
      resumeData.email),
    phone: document.querySelector("#preview-phone"),
    position: (document.querySelector("#preview-position").textContent =
      resumeData.position),
    skills: (document.querySelector("#preview-skills").textContent =
      resumeData.skills),
    experience: (document.querySelector("#preview-experience").textContent =
      resumeData.experience),
  };

  //   Object.keys(previewFields).forEach((key) => {
  //     previewFields[key].textContent = Array.isArray(resumeData[key])
  //       ? resumeData[key].join(", ")
  //       : resumeData[key];
  //   });

  form.style.display = "none";
  preview.style.display = "block";

  localStorage.setItem("inputs", JSON.stringify(resumeData));
});

submitFinalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  preview.style.display = "none";
  form.style.display = "block";
  step1.style.display = "block";
  step2.style.display = "none";
  step3.style.display = "none";
  form.reset();
});
