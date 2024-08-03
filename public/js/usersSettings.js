const usersSettingsContainer = document.getElementById(
  "usersSettingsContainer"
);

// console.log("users:", users);

const handleRolChange = (event, id) => {
  const value = event.target.value;
  var url = BASE_URL + `api/auth/change_rol/` + id + "/" + value;
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      getUsers();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const deleteUser = (id) => {
  var url = BASE_URL + `api/users/` + id;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      getUsers();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const deleteAllInactive = () => {
  var url = BASE_URL + `api/users/`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      getUsers();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const renderTemplate = (data) => {
  const source = document.getElementById("user-template").innerHTML;
  const template = Handlebars.compile(source);
  const context = { users: data };
  const html = template(context);

  document.getElementById("usersSettingsContainer").innerHTML = html;

  for (let user of data) {
    const select = document.getElementById(user._id + "Select");
    if (select) {
      select.value = user.rol;
      select.addEventListener("change", (e) => handleRolChange(e, user._id));
    }

    const deleteButton = document.getElementById(user._id + "Delete");
    if (deleteButton) {
      deleteButton.addEventListener("click", () => deleteUser(user._id));
    }
  }
  const deleteAllInactiveUsersButton = document.getElementById(
    "deleteAllInactiveButton"
  );
  deleteAllInactiveUsersButton.addEventListener("click", (e) =>
    deleteAllInactive()
  );
};

const getUsers = () => {
  var url = BASE_URL + `api/users`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderTemplate(data);
    })
    .catch((error) => console.log("Error fetching users:", error));
};

getUsers();

document.addEventListener("DOMContentLoaded", () => {
  // Your initialization code here, including renderTemplate function call
  getUsers(); // Assuming usersData is your data array
});

// renderTemplate(users);
