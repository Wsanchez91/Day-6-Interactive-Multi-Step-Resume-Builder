// === Step 1: Select DOM Elements ===
// Select all form inputs, buttons, and review span targets

// === Step 2: Set up resumeData object ===
// This will hold all the form data in memory

// === Step 3: Handle "Next" from Step 1 to Step 2 ===
// Validate personal info (name, email, phone)
// If valid, hide Step 1 and show Step 2

// === Step 4: Handle "Next" from Step 2 to Step 3 ===
// Gather work info, skills, and experience
// Validate fields (position selected, years >= 0)
// Dynamically collect all skill inputs
// Update preview and review step

// === Step 5: Handle "Back" buttons ===
// Step 2 → Step 1
// Step 3 → Step 2

// === Step 6: Handle "Submit" ===
// Log resumeData to console
// Save to localStorage
// Show confirmation message

// === Step 7: Dynamic Skill Fields ===
// Add and remove skill input fields on button click

// === Step 8: Live Preview (Optional Bonus) ===
// Update #preview section in real-time with resumeData

const step1 = document.querySelector("#step-1");
const step2 = document.querySelector("#step-2");
const step3 = document.querySelector("#step-3");
const preview = document.querySelector("#preview");

const next1Btn = document.querySelector("#next-1");
const next2Btn = document.querySelector("#next-2");
const back1Btn = document.querySelector("#back-1");
const back2Btn = document.querySelector("#back-2");
const submitBtn = document.querySelector("#submit");
const addBtn = document.querySelector(".add");

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
  const firstName = document.querySelector("#first-name-input");
  const lastName = document.querySelector("#last-name-input");
  const email = document.querySelector("#email-input");
  const phoneNum = document.querySelector("#phone-input");
  const errorEmail = document.querySelector("#error-email");
  const errorPhone = document.querySelector("#error-phoneNum");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^(\(\d{3}\)\s*|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

  errorEmail.textContent = "";
  errorPhone.textContent = "";

  //   if (!emailPattern.test(email.value)) {
  //     errorEmail.textContent = "Need to enter valid Email";
  //     return;
  //   }
  //   if (!phonePattern.test(phoneNum.value)) {
  //     errorPhone.textContent = "Need to enter valid Phone Number";
  //     return;
  //   }

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
  //   const addSkills = document.querySelector("#add-skills");
  const yearsOfExp = document.querySelector("#years-of-exp-input");

  

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

submitBtn.addEventListener("click", () => {
  localStorage.setItem("inputs", JSON.stringify(resumeData));
  alert(
    "You have successfully submitted your resume inputs, now review your inputs"
  );
});
