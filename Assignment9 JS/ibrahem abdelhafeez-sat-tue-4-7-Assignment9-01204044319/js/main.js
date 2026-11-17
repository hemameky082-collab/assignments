// Inputs
var contactImageInput = document.getElementById("contactImage");
var contactNameInput = document.getElementById("fullName");
var contactPhoneInput = document.getElementById("phone");
var contactEmailInput = document.getElementById("email");
var contactAddressInput = document.getElementById("address");
var contactGroupInput = document.getElementById("group");
var contactNotesInput = document.getElementById("notes");
var favoriteInput = document.getElementById("favorite");
var emergencyInput = document.getElementById("emergency");

// Form
var contactForm = document.getElementById("contactForm");

// Search
var searchInput = document.getElementById("searchInput");

// Containers
var contactsContainer = document.getElementById("contacts");
var favoritesContainer = document.getElementById("favoritesContainer");
var emergencyContainer = document.getElementById("emergencyContainer");

// Empty States
var contactsEmpty = document.getElementById("contactsEmpty");
var favoritesEmpty = document.getElementById("favoritesEmpty");
var emergencyEmpty = document.getElementById("emergencyEmpty");

// Statistics
var totalCount = document.getElementById("totalCount");
var favoriteCount = document.getElementById("favoriteCount");
var emergencyCount = document.getElementById("emergencyCount");
var contactsTextCount = document.getElementById("contactsTextCount");

// Data
var contactsList = [];
var updateIndex = -1;
var localStorageKey = "contactsList";

var regex = {
  contactNameInput: {
    value: /^[A-Za-z ]{3,20}$/,
    isValid: false,
  },

  contactPhoneInput: {
    value: /^01[0125][0-9]{8}$/,
    isValid: false,
  },

  contactEmailInput: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    isValid: false,
  },
};
contactNameInput.oninput = function () {
  validate(contactNameInput, regex.contactNameInput);
};

contactPhoneInput.oninput = function () {
  validate(contactPhoneInput, regex.contactPhoneInput);
};

contactEmailInput.oninput = function () {
  validate(contactEmailInput, regex.contactEmailInput);
};
if (localStorage.getItem(localStorageKey) != null) {
  contactsList = JSON.parse(localStorage.getItem(localStorageKey));
  displayContacts();
  displayStatistics();
  displayFavorites();
  displayEmergency();
}
function addContact() {
  if (
    !regex.contactNameInput.isValid ||
    !regex.contactPhoneInput.isValid ||
    !regex.contactEmailInput.isValid
  ) {
    return;
  }
  var contact = {
    image: `images/${contactImageInput.files[0]?.name}`,
    name: contactNameInput.value,
    phone: contactPhoneInput.value,
    email: contactEmailInput.value,
    address: contactAddressInput.value,
    group: contactGroupInput.value,
    notes: contactNotesInput.value,
    favorite: favoriteInput.checked,
    emergency: emergencyInput.checked,
  };

  var message = "";

  if (updateIndex == -1) {
    contactsList.push(contact);
    message = "Contact has been added successfully.";
  } else {
    contactsList[updateIndex] = contact;
    updateIndex = -1;
    message = "Contact has been updated successfully.";
  }
  //   if (updateIndex == -1) {
  //     contactsList.push(contact);

  //     Swal.fire({
  //       title: "Added!",
  //       text: "Contact has been added successfully.",
  //       icon: "success",
  //     });
  //   } else {
  //     contactsList[updateIndex] = contact;
  //     updateIndex = -1;

  //     Swal.fire({
  //       title: "Updated!",
  //       text: "Contact has been updated successfully.",
  //       icon: "success",
  //     });
  //   }

  //   if (updateIndex == -1) {
  //     contactsList.push(contact);
  //   } else {
  //     contactsList[updateIndex] = contact;
  //     updateIndex = -1;
  //   }

  updateLocalStorage();
  displayContacts();
  displayStatistics();
  displayFavorites();
  displayEmergency();
  clearForm();

  var modal = bootstrap.Modal.getInstance(
    document.getElementById("staticBackdrop"),
  );
  modal.hide();
  Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
  });
}
function displayContacts() {
  var cartona = "";
  for (var i = 0; i < contactsList.length; i++) {
    var contact = contactsList[i];
    var favoriteIcon;

    if (contact.favorite) {
      favoriteIcon = `<i class="fa-solid fa-star text-warning"></i>`;
    } else {
      favoriteIcon = `<i class="fa-regular fa-star text-secondary"></i>`;
    }
    var favoriteButton;
    if (contact.favorite) {
      favoriteButton = `
    <button onclick="toggleFavorite(${i})" class="btn btn-warning-subtle text-warning">
      <i class="fa-solid fa-star"></i>
    </button>
  `;
    } else {
      favoriteButton = `
    <button onclick="toggleFavorite(${i})" class="btn btn-light text-secondary">
      <i class="fa-regular fa-star"></i>
    </button>
  `;
    }
    var emergencyIcon;

    if (contact.emergency) {
      emergencyIcon = `<i class="fa-solid fa-heart text-danger"></i>`;
    } else {
      emergencyIcon = `<i class="fa-regular fa-heart text-secondary"></i>`;
    }
    var emergencyButton;

    if (contact.emergency) {
      emergencyButton = `
    <button onclick="toggleEmergency(${i})" class="btn btn-danger-subtle text-danger">
      <i class="fa-solid fa-heart"></i>
    </button>
  `;
    } else {
      emergencyButton = `
    <button onclick="toggleEmergency(${i})" class="btn btn-light text-secondary">
      <i class="fa-regular fa-heart"></i>
    </button>
  `;
    }

    cartona += ` <div class="col-12 col-md-6">
                <article class="contact-card bg-white border shadow-sm rounded-4 overflow-hidden h-100">
                  <div class="p-3 p-md-4">
                    <div class="d-flex gap-3 align-items-start mb-3">
                     <div class="contact-avatar rounded-4 overflow-hidden">
                     <img src="${contact.image}" class="w-100 h-100 object-fit-cover" alt="">
                                  </div>
                      <div class="flex-grow-1">
                        <h3 class="fs-5 fw-semibold mb-2">${contact.name}</h3>
                        <p class="mb-0 text-secondary"><i class="fa-solid fa-phone text-primary me-2"></i>${contact.phone}
                        </p>
                      </div>
                     ${favoriteIcon}
                     ${emergencyIcon}
                    </div>
                    
                    <p class="text-secondary mb-3"><i
                        class="fa-solid fa-envelope text-primary me-3"></i>${contact.email}</p>
                    <p class="text-secondary mb-3"><i class="fa-solid fa-location-dot text-success me-3"></i> ${contact.address}
                      </p>
                    <span class="badge text-bg-primary-subtle text-primary fw-medium">${contact.group}</span>
                  </div>
                  <div class="border-top p-3 d-flex align-items-center justify-content-between">
                    <div class="d-flex gap-2">
                  <a href="tel:${contact.phone}" class="btn btn-success-subtle text-success">
                          <i class="fa-solid fa-phone"></i>
                              </a>
                        <a href="mailto:${contact.email}" class="btn btn-primary-subtle text-primary">
                                <i class="fa-solid fa-envelope"></i>
                                        </a>
                          </div>
                    <div class="d-flex gap-2">
                    ${favoriteButton}
                    ${emergencyButton}
                         
                          <button onclick="updateContact(${i})" class="btn btn-light text-secondary"><i
                          class="fa-solid fa-pen"></i></button>
                          <button onclick="deleteContact(${i})" class="btn btn-light text-secondary"><i
                          class="fa-solid fa-trash"></i></button></div>
                  </div>
                </article>
              </div>`;
  }
  contactsContainer.innerHTML = cartona;
  if (contactsList.length == 0) {
    contactsEmpty.classList.remove("d-none");
  } else {
    contactsEmpty.classList.add("d-none");
  }
}

function clearForm() {
  contactNameInput.value = "";
  contactPhoneInput.value = "";
  contactEmailInput.value = "";
  contactAddressInput.value = "";
  contactGroupInput.selectedIndex = 0;
  contactNotesInput.value = "";
  contactImageInput.value = "";
  favoriteInput.checked = false;
  emergencyInput.checked = false;

  // Reset validation state
  regex.contactNameInput.isValid = false;
  regex.contactPhoneInput.isValid = false;
  regex.contactEmailInput.isValid = false;

  contactNameInput.classList.remove("is-valid", "is-invalid");
  contactPhoneInput.classList.remove("is-valid", "is-invalid");
  contactEmailInput.classList.remove("is-valid", "is-invalid");
}
function deleteContact(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then(function (result) {
    if (result.isConfirmed) {
      contactsList.splice(index, 1);

      updateLocalStorage();
      displayContacts();
      displayStatistics();
      displayFavorites();
      displayEmergency();

      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
      });
    }
  });
}

function updateContact(index) {
  updateIndex = index;
  contactNameInput.value = contactsList[updateIndex].name;
  contactPhoneInput.value = contactsList[updateIndex].phone;
  contactEmailInput.value = contactsList[updateIndex].email;
  contactAddressInput.value = contactsList[updateIndex].address;
  contactGroupInput.value = contactsList[updateIndex].group;
  contactNotesInput.value = contactsList[updateIndex].notes;
  favoriteInput.checked = contactsList[updateIndex].favorite;
  emergencyInput.checked = contactsList[updateIndex].emergency;
  validate(contactNameInput, regex.contactNameInput);
  validate(contactPhoneInput, regex.contactPhoneInput);
  validate(contactEmailInput, regex.contactEmailInput);
  var modal = document.getElementById("staticBackdrop");
  var myModal = new bootstrap.Modal(modal);
  myModal.show();
}
function toggleFavorite(index) {
  contactsList[index].favorite = !contactsList[index].favorite;
  updateLocalStorage();
  displayContacts();
  displayStatistics();
  displayFavorites();
  displayEmergency();
}
function toggleEmergency(index) {
  contactsList[index].emergency = !contactsList[index].emergency;
  updateLocalStorage();
  displayContacts();
  displayStatistics();
  displayFavorites();
  displayEmergency();
}

function displayStatistics() {
  var favorites = 0;
  var emergency = 0;

  for (var i = 0; i < contactsList.length; i++) {
    if (contactsList[i].favorite) {
      favorites++;
    }

    if (contactsList[i].emergency) {
      emergency++;
    }
  }

  totalCount.innerHTML = contactsList.length;
  favoriteCount.innerHTML = favorites;
  emergencyCount.innerHTML = emergency;
  contactsTextCount.innerHTML = contactsList.length;
}
function displayFavorites() {
  var cartona = "";

  for (var i = 0; i < contactsList.length; i++) {
    if (contactsList[i].favorite) {
      var contact = contactsList[i];

      cartona += `
      <div class="bg-light rounded-4 p-3 d-flex align-items-center gap-3">
        <div class="contact-avatar contact-avatar-sm rounded-3 overflow-hidden">
          <img src="${contact.image}" class="w-100 h-100 object-fit-cover" alt="">
        </div>

        <div class="flex-grow-1">
          <h4 class="fs-6 mb-1">${contact.name}</h4>
          <p class="small text-secondary mb-0">${contact.phone}</p>
        </div>

        <i class="fa-solid fa-phone text-success"></i>
      </div>
      `;
    }
  }

  if (cartona == "") {
    favoritesContainer.innerHTML = `
      <div class="d-flex align-items-center justify-content-center h-100 text-secondary">
        No favorites yet
      </div>
    `;
  } else {
    favoritesContainer.innerHTML = cartona;
  }
}
function displayEmergency() {
  var cartona = "";

  for (var i = 0; i < contactsList.length; i++) {
    if (contactsList[i].emergency) {
      var contact = contactsList[i];

      cartona += `
      <div class="bg-light rounded-4 p-3 d-flex align-items-center gap-3">
        <div class="contact-avatar contact-avatar-sm rounded-3 overflow-hidden">
          <img src="${contact.image}" class="w-100 h-100 object-fit-cover" alt="">
        </div>

        <div class="flex-grow-1">
          <h4 class="fs-6 mb-1">${contact.name}</h4>
          <p class="small text-secondary mb-0">${contact.phone}</p>
        </div>

        <i class="fa-solid fa-phone text-danger"></i>
      </div>
      `;
    }
  }

  if (cartona == "") {
    emergencyContainer.innerHTML = `
      <div class="d-flex align-items-center justify-content-center h-100 text-secondary">
        No emergency contacts
      </div>
    `;
  } else {
    emergencyContainer.innerHTML = cartona;
  }
}
function search(searchValue) {
  var cartona = "";

  for (var i = 0; i < contactsList.length; i++) {
    var contact = contactsList[i];
    var favoriteIcon;

    if (contact.favorite) {
      favoriteIcon = `<i class="fa-solid fa-star text-warning"></i>`;
    } else {
      favoriteIcon = `<i class="fa-regular fa-star text-secondary"></i>`;
    }
    var favoriteButton;
    if (contact.favorite) {
      favoriteButton = `
    <button onclick="toggleFavorite(${i})" class="btn btn-warning-subtle text-warning">
      <i class="fa-solid fa-star"></i>
    </button>
  `;
    } else {
      favoriteButton = `
    <button onclick="toggleFavorite(${i})" class="btn btn-light text-secondary">
      <i class="fa-regular fa-star"></i>
    </button>
  `;
    }
    var emergencyIcon;

    if (contact.emergency) {
      emergencyIcon = `<i class="fa-solid fa-heart text-danger"></i>`;
    } else {
      emergencyIcon = `<i class="fa-regular fa-heart text-secondary"></i>`;
    }
    var emergencyButton;

    if (contact.emergency) {
      emergencyButton = `
    <button onclick="toggleEmergency(${i})" class="btn btn-danger-subtle text-danger">
      <i class="fa-solid fa-heart"></i>
    </button>
  `;
    } else {
      emergencyButton = `
    <button onclick="toggleEmergency(${i})" class="btn btn-light text-secondary">
      <i class="fa-regular fa-heart"></i>
    </button>
  `;
    }
    if (
      contact.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      contact.phone.includes(searchValue) ||
      contact.email.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      cartona += ` <div class="col-12 col-md-6">
                <article class="contact-card bg-white border shadow-sm rounded-4 overflow-hidden h-100">
                  <div class="p-3 p-md-4">
                    <div class="d-flex gap-3 align-items-start mb-3">
                     <div class="contact-avatar rounded-4 overflow-hidden">
                     <img src="${contact.image}" class="w-100 h-100 object-fit-cover" alt="">
                                  </div>
                      <div class="flex-grow-1">
                        <h3 class="fs-5 fw-semibold mb-2">${contact.name}</h3>
                        <p class="mb-0 text-secondary"><i class="fa-solid fa-phone text-primary me-2"></i>${contact.phone}
                        </p>
                      </div>
                     ${favoriteIcon}
                     ${emergencyIcon}
                    </div>
                    
                    <p class="text-secondary mb-3"><i
                        class="fa-solid fa-envelope text-primary me-3"></i>${contact.email}</p>
                    <p class="text-secondary mb-3"><i class="fa-solid fa-location-dot text-success me-3"></i> ${contact.address}
                      </p>
                    <span class="badge text-bg-primary-subtle text-primary fw-medium">${contact.group}</span>
                  </div>
                  <div class="border-top p-3 d-flex align-items-center justify-content-between">
                    <div class="d-flex gap-2">
                  <a href="tel:${contact.phone}" class="btn btn-success-subtle text-success">
                  <i class="fa-solid fa-phone"></i>
                          </a>
                         <a href="mailto:${contact.email}" class="btn btn-primary-subtle text-primary">
                         <i class="fa-solid fa-envelope"></i>
                                 </a> 
                          </div>
                    <div class="d-flex gap-2">
                    ${favoriteButton}
                    ${emergencyButton}
                         
                          <button onclick="updateContact(${i})" class="btn btn-light text-secondary"><i
                          class="fa-solid fa-pen"></i></button>
                          <button onclick="deleteContact(${i})" class="btn btn-light text-secondary"><i
                          class="fa-solid fa-trash"></i></button></div>
                  </div>
                </article>
              </div>`;
    }
  }
  contactsContainer.innerHTML = cartona;
}
function validate(element, regex) {
  if (regex.value.test(element.value)) {
    regex.isValid = true;
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    regex.isValid = false;
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
function updateLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(contactsList));
}
