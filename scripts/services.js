// Constructor for a Service object
function Service(name, description, price) {
  this.name = name;
  this.description = description;
  this.price = parseFloat(price);
}

// Save services to localStorage
function saveServiceToStorage(service) {
  let services = JSON.parse(localStorage.getItem("servicesList")) || [];
  services.push(service);
  localStorage.setItem("servicesList", JSON.stringify(services));
}

// Service Registration Form Handler
$("#servicesRegistrationForm").on("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get values and trim text fields
  const serviceName = $("#serviceName").val().trim();
  const serviceDescription = $("#serviceDescription").val().trim();
  const servicePrice = parseFloat($("#servicePrice").val());

  let isValid = true; // Validation flag

  // Clear previous invalid states before validating
  $("#serviceName, #serviceDescription, #servicePrice").removeClass("is-invalid");

  // Validate Service Name
  if (!serviceName) {
    $("#serviceName").addClass("is-invalid");
    isValid = false;
  }

  // Validate Description
  if (!serviceDescription) {
    $("#serviceDescription").addClass("is-invalid");
    isValid = false;
  }

  // Validate Price (must be a number greater than 0)
  if (isNaN(servicePrice) || servicePrice <= 0) {
    $("#servicePrice").addClass("is-invalid");
    isValid = false;
  }

  // If any input is invalid, stop execution
  if (!isValid) {
    $("#confirmation").text(""); // clear confirmation on invalid
    return;
  }

  // Create new Service object
  const newService = new Service(serviceName, serviceDescription, servicePrice);
  console.log("New Service Registered:", newService);

  // Save service to localStorage
  saveServiceToStorage(newService);

  // Reset form fields
  $("#servicesRegistrationForm")[0].reset();

  // Clear invalid highlights after successful registration
  $("#serviceName, #serviceDescription, #servicePrice").removeClass("is-invalid");

  // Add confirmation message
  $("#confirmation")
    .text(`"${serviceName}" has been successfully registered.`)
    .css({ "color": "green", "font-weight": "bold", "margin-top": "10px" });
});
