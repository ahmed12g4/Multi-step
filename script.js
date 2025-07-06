// We wrap all our code in an IIFE (Immediately Invoked Function Expression)
// to avoid polluting the global scope.
(function () {
  "use strict"; // Enforce stricter parsing and error handling

  // --- DOM Elements ---
  const steps = document.querySelectorAll(".steps:not(.thank-you)");
  const sidebarSteps = document.querySelectorAll(".step-indicator");
  const thankYouStep = document.querySelector(".steps.thank-you");
  const cards = document.querySelectorAll(".card");
  const billingToggle = document.getElementById("billing-toggle");
  const prices = document.querySelectorAll(".price");
  const addonCards = document.querySelectorAll(".addon-card");
  const nextButtons = document.querySelectorAll(".next, .next-step");
  const backButtons = document.querySelectorAll(".back, .go-back");
  const confirmButton = document.querySelector(".confirm");

  // --- State ---
  let currentStep = 0;

  // --- Validation ---
  function validateStep1() {
    // This function can be expanded to validate name and email as well.
    const phoneInput = document.querySelector(".phone-input");
    const errorMessage = document.querySelector(".error-message");
    let isValid = true;

    if (phoneInput.value.trim() === "") {
      phoneInput.classList.add("error-border");
      errorMessage.style.display = "inline";
      isValid = false;
    } else {
      phoneInput.classList.remove("error-border");
      errorMessage.style.display = "none";
    }
    // Example for other fields:
    // const nameInput = document.querySelector('#name');
    // if (nameInput.value.trim() === '') { isValid = false; /* show error */ }

    return isValid;
  }

  // --- UI Updates ---
  function updateSidebar(activeIndex) {
    sidebarSteps.forEach((step, index) => {
      const num = step.querySelector("span");
      if (num) {
        if (index === activeIndex) {
          num.classList.add("step-number-active");
          num.classList.remove("step-number");
        } else {
          num.classList.remove("step-number-active");
          num.classList.add("step-number");
        }
      }
    });
  }

  function showStep(index) {
    if (index < 0 || index >= steps.length) {
      return;
    }
    steps.forEach((step, i) => {
      step.classList.toggle("hidden", i !== index);
    });
    thankYouStep.style.display = "none";
    updateSidebar(index);
    currentStep = index;
  }

  // --- Navigation ---
  function goNext() {
    // Step-specific validation
    if (currentStep === 0) {
      if (!validateStep1()) {
        return; // Stop if validation fails
      }
    }
    // Add validation for other steps here if needed

    if (currentStep < steps.length - 1) {
      showStep(currentStep + 1);
    }
  }

  function goBack() {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  }

  function showThankYou() {
    steps.forEach((step) => step.classList.add("hidden"));
    // Use 'flex' to match the CSS for centering
    thankYouStep.style.display = "flex";
    thankYouStep.classList.remove("hidden");
  }

  // --- Event Listeners ---

  // Navigation buttons
  nextButtons.forEach((btn) => btn.addEventListener("click", goNext));
  backButtons.forEach((btn) => btn.addEventListener("click", goBack));
  confirmButton.addEventListener("click", showThankYou);

  // Plan selection
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
    });
  });

  // Billing Toggle
  billingToggle.addEventListener("change", () => {
    // This logic can also be improved by using data-* attributes in HTML
    // to avoid hardcoding prices in JS.
    const isYearly = billingToggle.checked;
    prices[0].textContent = isYearly ? "$90/yr" : "$9/mo";
    prices[1].textContent = isYearly ? "$120/yr" : "$12/mo";
    prices[2].textContent = isYearly ? "$150/yr" : "$15/mo";
  });

  // Add-ons selection
  addonCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("selected");
      // Also toggle the checkbox inside for accessibility
      const checkbox = card.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
      }
    });
  });

  // --- Initialization ---
  showStep(0);
})();
