// -------------------------
// Validation phone
// -------------------------
function validatePhone() {
  const phoneInput = document.querySelector(".phone-input");
  const errorMessage = document.querySelector(".error-message");

  if (phoneInput.value.trim() === "") {
    phoneInput.classList.add("error-border");
    errorMessage.style.display = "inline";
  } else {
    phoneInput.classList.remove("error-border");
    errorMessage.style.display = "none";
    goNext(); // لو اتملأ صح، روح للخطوة التالية
  }
}

// -------------------------
// Plan selection
// -------------------------
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
  });
});

// -------------------------
// Billing Toggle
// -------------------------
const billingToggle = document.getElementById("billing-toggle");
const prices = document.querySelectorAll(".price");

billingToggle.addEventListener("change", () => {
  if (billingToggle.checked) {
    prices[0].textContent = "$90/yr";
    prices[1].textContent = "$120/yr";
    prices[2].textContent = "$150/yr";
  } else {
    prices[0].textContent = "$9/mo";
    prices[1].textContent = "$12/mo";
    prices[2].textContent = "$15/mo";
  }
});

// -------------------------
// Add-ons selection
// -------------------------
const addonCards = document.querySelectorAll(".addon-card");

addonCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("selected");
  });
});

// -------------------------
// Progress bar updater
// -------------------------
function updateProgressBar(stepIndex) {
  const progressSteps = document.querySelectorAll(".progress-step");
  progressSteps.forEach((step, index) => {
    if (index <= stepIndex) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

// -------------------------
// Steps Navigation
// -------------------------
const steps = document.querySelectorAll(".steps");
const sidebarSteps = document.querySelectorAll(".step-indicator");
let currentStep = 0;

function showStep(index) {
  // Hide all steps
  steps.forEach((step) => step.classList.add("hidden"));

  // Remove active from all side indicators
  sidebarSteps.forEach((s) => {
    const num = s.querySelector("span");
    if (num) {
      num.classList.remove("step-number-active");
      num.classList.add("step-number");
    }
  });

  // Show selected step
  steps[index].classList.remove("hidden");

  // Highlight sidebar step if in range
  if (index < sidebarSteps.length) {
    const activeNum = sidebarSteps[index].querySelector("span");
    if (activeNum) {
      activeNum.classList.remove("step-number");
      activeNum.classList.add("step-number-active");
    }
  }

  currentStep = index;

  // ✅ Update progress bar
  updateProgressBar(index);
}

function goNext() {
  if (currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  }
}

function goBack() {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
}

// Attach events
document.querySelectorAll(".next, .next-step").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep === 0) {
      validatePhone();
    } else {
      goNext();
    }
  });
});

document.querySelectorAll(".back, .go-back").forEach((btn) => {
  btn.addEventListener("click", () => {
    goBack();
  });
});

// Initialize
showStep(0);

// Confirm button
document.querySelector(".confirm").addEventListener("click", () => {
  steps.forEach((step) => step.classList.add("hidden"));

  sidebarSteps.forEach((s) => {
    const num = s.querySelector("span");
    if (num) {
      num.classList.remove("step-number-active");
      num.classList.add("step-number");
    }
  });

  const thankYouStep = document.querySelector(".steps.thank-you");
  thankYouStep.style.display = "block";
  thankYouStep.classList.remove("hidden");

  currentStep = -1;
});
