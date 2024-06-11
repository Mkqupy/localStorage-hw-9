// 1
const button = document.querySelector(".input-cont button");
const input = document.querySelector(".input-cont input");
const list = document.querySelector(".todo-list");

let todoList = [];

function saveTodoList() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

button.addEventListener("click", () => {
  const li = document.createElement("li");
  li.className = "todo-list-item";
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  li.innerText = input.value;
  list.appendChild(li);
  li.appendChild(doneBtn);

  const newTodo = { text: input.value, completed: false };
  todoList.push(newTodo);
  saveTodoList(); 

  input.value = "";

  doneBtn.addEventListener("click", () => {
    li.style.color = "grey";
    newTodo.completed = true;
    saveTodoList(); 
  });
});

window.addEventListener("load", () => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todoList = JSON.parse(storedTodos);
    todoList.forEach((todo) => {
      const li = document.createElement("li");
      li.className = "todo-list-item";
      const doneBtn = document.createElement("button");
      doneBtn.innerText = "Done";
      li.innerText = todo.text;
      list.appendChild(li);
      li.appendChild(doneBtn);

      if (todo.completed) {
        li.style.color = "grey";
      }

      doneBtn.addEventListener("click", () => {
        li.style.color = "grey";
        todo.completed = true;
        saveTodoList();
      });
    });
  }
});


// 2
const formData = document.getElementById('formData');
const savedDataDiv = document.getElementById('savedData');

formData.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const userData = {
        name,
        email
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    displaySavedData();
});

function displaySavedData() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        savedDataDiv.innerHTML = `
            <h2>Збережені дані:</h2>
            <p>Ім'я: ${userData.name}</p>
            <p>Email: ${userData.email}</p>
        `;
    } else {
        savedDataDiv.innerHTML = '<p>Збережених даних немає</p>';
    }
}

displaySavedData();


// 3
const bookmarksList = document.getElementById('bookmarksList');
const addBookmarkForm = document.getElementById('addBookmarkForm');

function getBookmarks() {
    const bookmarksJSON = localStorage.getItem('bookmarks');
    return bookmarksJSON ? JSON.parse(bookmarksJSON) : [];
}

function displayBookmarks() {
    const bookmarks = getBookmarks();

    bookmarksList.innerHTML = '';
    bookmarks.forEach((bookmark) => {
        const bookmarkItem = document.createElement('li');
        bookmarkItem.innerHTML = `
            <a href="${bookmark.url}">${bookmark.title}</a>
            <button onclick="editBookmark('${bookmark.url}')">Редагувати</button>
            <button onclick="deleteBookmark('${bookmark.url}')">Видалити</button>
        `;
        bookmarksList.appendChild(bookmarkItem);
    });
}

function addBookmark(url, title) {
    const bookmarks = getBookmarks();
    bookmarks.push({ url, title });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}

function editBookmark(url) {
    const bookmarks = getBookmarks();
    const bookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.url === url);

    if (bookmarkIndex !== -1) {
        const newUrl = prompt('Введіть нову URL:', bookmarks[bookmarkIndex].url);
        const newTitle = prompt('Введіть нову назву:', bookmarks[bookmarkIndex].title);

        if (newUrl && newTitle) {
            bookmarks[bookmarkIndex].url = newUrl;
            bookmarks[bookmarkIndex].title = newTitle;
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            displayBookmarks();
        }
    }
}

function deleteBookmark(url) {
    const bookmarks = getBookmarks();
    const bookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.url === url);

    if (bookmarkIndex !== -1) {
        bookmarks.splice(bookmarkIndex, 1);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        displayBookmarks();
    }
}

addBookmarkForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const title = document.getElementById('title').value;

    addBookmark(url, title);
    addBookmarkForm.reset();
});

displayBookmarks();


// 4
const contactsList = document.getElementById('contactsList');
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');

function getContacts() {
    const contactsJSON = localStorage.getItem('contacts');
    return contactsJSON ? JSON.parse(contactsJSON) : [];
}

function displayContacts() {
    const contacts = getContacts();

    contactsList.innerHTML = '';
    contacts.forEach((contact) => {
        const contactItem = document.createElement('li');
        contactItem.innerHTML = `
            <span class="contact-name">${contact.name} <span class="math-inline">\{contact\.lastName\}</span\>
<button onclick\="editContact\('</span>{contact.id}')">Редагувати</button>
            <button onclick="deleteContact('${contact.id}')">Видалити</button>
        `;
        contactsList.appendChild(contactItem);
    });
}

function addContact() {
    contactForm.style.display = 'block';
    nameInput.focus();
}

function saveContact() {
    const id = generateContactId();
    const name = nameInput.value;
    const lastName = lastNameInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;

    const contact = { id, name, lastName, phone, email };
    const contacts = getContacts();
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
    clearContactForm();
    contactForm.style.display = 'none';
}

function cancelContact() {
    clearContactForm();
    contactForm.style.display = 'none';
}

function editContact(id) {
    const contacts = getContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === id);

    if (contactIndex !== -1) {
        const contact = contacts[contactIndex];
        nameInput.value = contact.name;
        lastNameInput.value = contact.lastName;
        phoneInput.value = contact.phone;
        emailInput.value = contact.email;
        currentContactId = id; // Збережіть ID для оновлення
        contactForm.style.display = 'block';
        nameInput.focus();
    }
}

function deleteContact(id) {
    const contacts = getContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === id);

    if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        displayContacts();
    }
}

function clearContactForm() {
    nameInput.value = '';
    lastNameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
}
