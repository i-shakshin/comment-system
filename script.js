const form = document.forms[0];

const button = form.button;
const name = form.name;
const date = form.date;
const body = form.comment;

name.onblur = function () {
  if (!name.value.match(/^[a-zA-Zа-яА-Я]{2,}$/)) {
    name.classList.add("invalid");
    const errorName = document.querySelector("#error\\-name");
    errorName.innerHTML =
      "Пожалуйста, введите правильное имя. Имя должно состоять из русских или английских букв. Поле должно иметь не менее двух символов";
  }
};
name.onfocus = function () {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    const errorName = document.querySelector("#error\\-name");
    errorName.innerHTML = "";
  }
};

const inputElement = document.getElementById("date");

inputElement.addEventListener("input", () => {
  if (inputElement.value) {
    date.onblur = function () {
      if (!date.value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)) {
        date.classList.add("invalid");
        const errorDate = document.querySelector("#error\\-date");
        errorDate.innerHTML =
          "Пожалуйста, введите правильную дату. Поле даты должно быть в формате dd/mm/yyyy";
      }
    };
    date.onfocus = function () {
      if (this.classList.contains("invalid")) {
        this.classList.remove("invalid");
        const errorDate = document.querySelector("#error\\-date");
        errorDate.innerHTML = "";
      }
    };
  } else {
    date.onblur = function () {
      date.classList.remove("invalid");
    };
    date.onfocus = function () {
      date.classList.remove("invalid");
    };
  }
  date.onblur = function () {
    date.classList.remove("invalid");
  };
  date.onfocus = function () {
    date.classList.remove("invalid");
  };
});

body.onblur = function () {
  if (!body.value.match(/^\S.{8,497}\S$/m)) {
    body.classList.add("invalid");
    const errorBody = document.querySelector("#error\\-body");
    errorBody.innerHTML = `
       Поле не должно начинаться с пробела или других пробельных символов.
       Длина строки должна быть не меньше 10 символов и не больше 500 символов`;
  }
};
body.onfocus = function () {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    const errorBody = document.querySelector("#error\\-body");
    errorBody.innerHTML = "";
  }
};

let comments = [];

button.onclick = function () {
  const name = form.name;
  const date = form.date;
  const body = form.comment;

  if (!name.value || !comment.value) {
    alert("Пожалуйста, заполните все поля формы.");
    event.preventDefault();
    return;
  } else {
    event.preventDefault();
    let commentName = name;
    let commentDate = date;
    let commentBody = body;

    let comment = {
      name: commentName.value,
      date: commentDate.value,
      body: commentBody.value,
      time: Date.now(),
      liked: false,
    };

    commentName.value = "";
    commentDate.value = "";
    commentBody.value = "";

    comments.push(comment);

    showComments(comments);
  }
};

document.addEventListener("keydown", function (event) {
  let focusedElement = document.activeElement.tagName;
  if (focusedElement === "BODY" && event.keyCode === 13) {
    const button = document.getElementById("comment-add");
    button.click();
  }
});

const commentsContainer = document.getElementById("comments");
commentsContainer.addEventListener("click", function (event) {
  const timestamp = event.target.closest("button");
  for (let [index, comment] of comments.entries()) {
    if (comment.time === +timestamp.dataset.commentid) {
      comments.splice(index, 1);
      showComments(comments);
    }
  }
});

commentsContainer.addEventListener("click", function (event) {
  const likeButton = event.target.closest("button");
  likeButton.classList.toggle("liked");
  const timestamp = event.target.closest("button");
  for (let [index, comment] of comments.entries()) {
    if (comment.time === +timestamp.dataset.likeid) {
      comment.liked = !comment.liked;
      if (comment.liked) {
        likeButton.classList.add("liked");
      } else {
        likeButton.classList.remove("liked");
      }
    }
  }
});

function showComments(comments) {
  let initComm = `Список комментариев:`;
  if (!comments.length) {
    initComm = `Комментарии пока отсутствуют`;
  }
  let commentField = document.getElementById("comments");
  let list = `<ul>
  <h2>${initComm}</h2>
  `;
  comments.forEach((comment) => {
    let liked = "";
    if (comment.liked) {
      liked = "liked";
    }
    list += `
  <li class="user-comment" id="${comment.time}">
    <div class="left">
      <div class="text-top">
        <p class="user-name">${comment.name}</p>
        <p class="user-date">${formatDate(comment.date)}</p>
      </div>
      <p class="user-text">
      ${comment.body}
      </p>
    </div>
    <div class="right">
    <button class="trash" data-commentid=${comment.time}>
      <svg
        fill="#000000"
        width="30px"
        height="30px"
        viewBox="-7 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        
      >
        <path
          d="M13.781 7.875h3.094c0.563 0 1 0.438 1 1v0.719c0 0.469-0.344 0.906-0.781 1v14.844c0 0.969-0.813 1.75-1.813 1.75h-12.688c-1 0-1.781-0.781-1.781-1.75v-14.844c-0.438-0.094-0.813-0.531-0.813-1v-0.719c0-0.563 0.469-1 1.031-1h3.063v-1.313c0-0.969 0.781-1.781 1.781-1.781h6.125c1 0 1.781 0.813 1.781 1.781v1.313zM12 6.344h-6.125c-0.156 0-0.25 0.094-0.25 0.219v1.313h6.625v-1.313c0-0.125-0.094-0.219-0.25-0.219zM3.094 25.188h11.719c0.125 0 0.219-0.156 0.219-0.281v-14.281h-12.188v14.281c0 0.125 0.094 0.281 0.25 0.281zM5.5 24.031h-0.188c-0.563 0-1.031-0.469-1.031-1.031v-10.219c0-0.531 0.469-0.969 1.031-0.969h0.188c0.531 0 1 0.438 1 0.969v10.219c0 0.563-0.469 1.031-1 1.031zM9.031 24.031h-0.156c-0.563 0-1.031-0.469-1.031-1.031v-10.219c0-0.531 0.469-0.969 1.031-0.969h0.156c0.563 0 1.031 0.438 1.031 0.969v10.219c0 0.563-0.469 1.031-1.031 1.031zM12.563 24.031h-0.156c-0.563 0-1-0.469-1-1.031v-10.219c0-0.531 0.438-0.969 1-0.969h0.156c0.563 0 1.031 0.438 1.031 0.969v10.219c0 0.563-0.469 1.031-1.031 1.031z"
        ></path>
        </svg>
      </button>
      <button class="like ${liked}" data-likeid=${comment.time}>
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 192 192"
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
      >
        <path
          d="M60.732 29.7C41.107 29.7 22 39.7 22 67.41c0 27.29 45.274 67.29 74 94.89 28.744-27.6 74-67.6 74-94.89 0-27.71-19.092-37.71-38.695-37.71C116 29.7 104.325 41.575 96 54.066 87.638 41.516 76 29.7 60.732 29.7z"
          style="
            clip-rule: evenodd;
            display: inline;
            stroke-width: 12;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-miterlimit: 2;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
        />
      </svg>
      </button>
    </div>
  </li>`;
  });
  list += "</ul>";
  commentField.innerHTML = list;
}

function formatDate(dateString) {
  if (!dateString) {
    const today = new Date();
    const hours = today.getHours().toString().padStart(2, "0");
    const minutes = today.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    return `сегодня, ${currentTime}`;
  }
  const today = new Date();
  const [day, month, year] = dateString.split("/");
  const date = new Date(`${year}-${month}-${day}`);
  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}`;

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return `сегодня, ${currentTime}`;
  } else {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return `вчера, ${currentTime}`;
    } else {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      return `${day}/${month}/${year}, ${currentTime}`;
    }
  }
}
