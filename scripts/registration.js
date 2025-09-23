let petToDeleteIndex = null; // store the index of the pet to delete

// Attach delete listener dynamically
$(document).on("click", ".btn-delete", function() {
    // Find the index of the pet from the row
    petToDeleteIndex = $(this).closest("tr").index();
    
    // Optional: show pet name in modal
    const petName = $(this).closest("tr").find("td:first").text();
    $("#deleteModal .modal-body").text(`Are you sure you want to delete ${petName}?`);
    
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
    deleteModal.show();
});

// Confirm deletion
$("#confirmDeleteBtn").click(function() {
    if (petToDeleteIndex !== null) {
        // Remove from petsList array
        petsList.splice(petToDeleteIndex, 1);

        // Re-render table and dashboard
        displayTable();
        updateDashboard();

        petToDeleteIndex = null;

        // Hide modal
        const deleteModalEl = document.getElementById("deleteModal");
        const modal = bootstrap.Modal.getInstance(deleteModalEl);
        modal.hide();
    }
});