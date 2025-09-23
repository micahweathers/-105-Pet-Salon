$(document).ready(function () {
  const $form = $("#contactForm");
  const $confirmation = $("#confirmation");

  $form.on("submit", function (event) {
    event.preventDefault(); // Stop default submission

    let isValid = true;

    // Remove previous invalid borders
    $("#contactName, #contactEmail, #contactDetails").removeClass("is-invalid");

    const name = $("#contactName").val().trim();
    const email = $("#contactEmail").val().trim();
    const message = $("#contactDetails").val().trim();

    // Simple JS validation
    if (!name) {
      $("#contactName").addClass("is-invalid");
      isValid = false;
    }
    if (!email || !validateEmail(email)) {
      $("#contactEmail").addClass("is-invalid");
      isValid = false;
    }
    if (!message) {
      $("#contactDetails").addClass("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      $confirmation.hide();
      return;
    }

    // Show confirmation if valid
    $confirmation
      .stop(true, true)
      .text(`Thank you, ${name}! Your message has been sent.`)
      .css({ color: "green", "font-weight": "bold", "margin-top": "10px", display: "block" })
      .fadeIn(400)
      .delay(3000)
      .fadeOut(1000);

    $form[0].reset();
  });

  // Remove red border on typing
  $("#contactName, #contactEmail, #contactDetails").on("input", function () {
    if ($(this).val().trim() !== "") {
      $(this).removeClass("is-invalid");
    }
  });

  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
