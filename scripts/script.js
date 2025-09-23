// Dark Mode Toggle
$(document).ready(function () {
    const $body = $("body");
    const $toggle = $("#changeModeButton");
    const $logo = $("#logo");

    // Load saved preference
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
        $body.addClass("dark-mode");
        $logo.attr("src", "./images/dark-mode-logo.png");
        $toggle.html('<i class="bi bi-sun"></i>');
    } else {
        $logo.attr("src", "./images/light-mode-logo.png");
    }

    // Toggle dark/light mode
    $toggle.on("click", function () {
        $body.toggleClass("dark-mode");
        const isDark = $body.hasClass("dark-mode");

        if (isDark) {
            $logo.attr("src", "./images/dark-mode-logo.png");
            $toggle.html('<i class="bi bi-sun"></i>');
        } else {
            $logo.attr("src", "./images/light-mode-logo.png");
            $toggle.html('<i class="bi bi-moon"></i>');
        }

        localStorage.setItem("darkMode", isDark);
    });
});


// Salon Information Object
const salon = {
  Name: "Whisker Wonders",
  Phone: "555-1234",
  Address: {
    Street: "123 Paws Lane",
    City: "Petville",
    Zip: "98765"
  }
};

// Initial Array Of Registered Pets
let petsList = [
  { Name: "Appa", Age: 2, Gender: "Male", Service: "Bath & Groom", Breed: "Ginger Cat", Type: "Cat"},
  { Name: "Zoro", Age: 6, Gender: "Male", Service: "Nail Trim", Breed: "Tuxedo Cat", Type: "Cat"},
  { Name: "Bugsy", Age: 6, Gender: "Male", Service: "Vaccination", Breed: "Tuxedo Cat", Type: "Cat"},
  { Name: "Captain Doodle", Age: 9, Gender: "Male", Service: "Spa Day", Breed: "Flat Faced", Type: "Cat"}
];

// Pet Constructor Function
function Pet(Name, Age, Gender, Breed, Service, Type, Payment) {
  this.Name = Name;
  this.Age = Age;
  this.Gender = Gender;
  this.Breed = Breed;
  this.Service = Service;
  this.Type = Type;
  this.Payment = Payment;
}

// Salon Info
function populateSalonInfo() {
  const salonNameEl = document.getElementById("salonName");
  const salonPhoneEl = document.getElementById("salonPhone");
  const salonAddressEl = document.getElementById("salonAddress");

  if (salonNameEl) salonNameEl.textContent = `Name: ${salon.Name}`;
  if (salonPhoneEl) salonPhoneEl.textContent = `Phone: ${salon.Phone}`;
  if (salonAddressEl) {
    const { Street, City, Zip } = salon.Address;
    salonAddressEl.textContent = `Address: ${Street}, ${City}, ${Zip}`;
  }
}

// Total Pets and Average Age
function updateDashboard() {
  const countEl = document.getElementById("petCount");
  const avgEl = document.getElementById("averageAge");

  if (countEl) countEl.textContent = `Total Pets: ${petsList.length}`;

  if (avgEl) {
    const averageAge = petsList.length
      ? (petsList.reduce((sum, pet) => sum + pet.Age, 0) / petsList.length).toFixed(1)
      : 0;

    avgEl.textContent = `Average Age: ${averageAge} years`;
  }
}

// Registered Pets Table
function displayTable() {
  const tableBody = document.getElementById("petsTableBody");
  if (!tableBody) return;

  // Clear Rows
  tableBody.innerHTML = "";

  // Add Pet Table Row
  petsList.forEach((pet, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${pet.Name}</td>
      <td>${pet.Age}</td>
      <td>${pet.Gender}</td>
      <td>${pet.Breed}</td>
      <td>${pet.Service}</td>
      <td>${pet.Type}</td>
      <td>
      <button class="btn btn-sm btn-delete" data-index="${index}">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Delete Pet From List
function deletePet(index) {
  petsList.splice(index, 1);
  updateDashboard();
  displayTable();
}

// Populate Services Dropdown (Static + Stored)
function populateServicesDropdown() {
  const serviceDropdown = document.getElementById("petServices");
  if (!serviceDropdown) return;

  // Reset dropdown with static services first
  serviceDropdown.innerHTML = `
    <option value="">Select type</option>
    <option value="Trim-Wash">Trim & Wash</option>
    <option value="Nail-Clipping">Nail Clipping</option>
    <option value="Spa-Day">Spa Day</option>
    <option value="Daycare">Daycare</option>
  `;

  // Get services from localStorage
  const services = JSON.parse(localStorage.getItem("servicesList")) || [];

  // Append user-registered services
  services.forEach(service => {
    const option = document.createElement("option");
    option.value = service.name;
    option.textContent = `${service.name} - $${service.price.toFixed(2)}`;
    serviceDropdown.appendChild(option);
  });
}

// DOMContentLoaded Event Listener And Initial Data
document.addEventListener("DOMContentLoaded", function () {
  populateSalonInfo();        // Salon Info
  updateDashboard();          // Dashboard Stats
  displayTable();             // Pet Table
  populateServicesDropdown(); // Merge static + stored services

  // Pet Registration Form Handler
  const form = document.getElementById("petForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Retrieve Form Values
      const name = document.getElementById("petName").value.trim();
      const age = parseInt(document.getElementById("petAge").value);
      const gender = document.getElementById("petGender").value;
      const breed = document.getElementById("petBreed").value.trim();
      const service = document.getElementById("petServices").value;
      const type = document.getElementById("petType").value;
      const payment = document.getElementById("petPayment").value;

      // Validate Age Is Positive Number
      if (isNaN(age) || age < 0) {
        alert("Please enter a valid age.");
        return;
      }

      // New Pet And Add To List
      const newPet = new Pet(name, age, gender, breed, service, type, payment);
      petsList.push(newPet);

      // Update Dashboard And Table
      updateDashboard();
      displayTable();

      // Reset The Form
      form.reset();

      // Show modal confirmation
    const registrationModalEl = document.getElementById("registrationModal");
    const registrationModal = new bootstrap.Modal(registrationModalEl);
    registrationModal.show();
    });
  }
});