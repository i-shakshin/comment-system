const form = document.forms[0];
const name = form.name;
const date = form.date;
const body = form.comment;
const button = form.button;

// const name2 = document.getElementById("name");
// console.log(name2);
let comments = [];
console.log(comments);
button.onclick = function () {
  event.preventDefault();
  let commentName = name;
  let commentDate = date;
  let commentBody = body;

  let comment = {
    name: commentName.value,
    date: commentDate.value,
    body: commentBody.value,
    time: Math.floor(Date.now() / 1000),
  };

  commentName.value = "";
  commentDate.value = "";
  commentBody.value = "";

  comments.push(comment);
  const commentIndex = comments.indexOf(comment);

  showComments(comments);

  const commentElement = document.querySelectorAll(".user-comment");
  var firstDiv = commentElement[0];
  console.log(firstDiv.id);

  const commentsContainer = document.getElementById("comments");
  // commentsContainer.onclick = function (event) {
  //   // let target = event.target;
  //   // console.log(target);
  // };

  commentsContainer.addEventListener("click", function (event) {
    if (event.target.closest(".trash")) {
      console.log(event.target.parentNode.parentNode.id);
    }
  });
};

function showComments(comments) {
  let commentField = document.getElementById("comments");
  let list = `<ul>
  <h2>Комментарии</h2>
  `;
  comments.forEach((comment) => {
    list += `
  <li class="user-comment" id="${comment.time}">
    <div class="left">
      <div class="test">
        <p class="user-name">${comment.name}</p>
        <p class="user-date">${comment.date}</p>
      </div>
      <p class="user-text">
      ${comment.body}
      </p>
    </div>
    <div class="right">
      <svg
        fill="#000000"
        width="30px"
        height="30px"
        viewBox="-7 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        class="trash"
      >
        <path
          d="M13.781 7.875h3.094c0.563 0 1 0.438 1 1v0.719c0 0.469-0.344 0.906-0.781 1v14.844c0 0.969-0.813 1.75-1.813 1.75h-12.688c-1 0-1.781-0.781-1.781-1.75v-14.844c-0.438-0.094-0.813-0.531-0.813-1v-0.719c0-0.563 0.469-1 1.031-1h3.063v-1.313c0-0.969 0.781-1.781 1.781-1.781h6.125c1 0 1.781 0.813 1.781 1.781v1.313zM12 6.344h-6.125c-0.156 0-0.25 0.094-0.25 0.219v1.313h6.625v-1.313c0-0.125-0.094-0.219-0.25-0.219zM3.094 25.188h11.719c0.125 0 0.219-0.156 0.219-0.281v-14.281h-12.188v14.281c0 0.125 0.094 0.281 0.25 0.281zM5.5 24.031h-0.188c-0.563 0-1.031-0.469-1.031-1.031v-10.219c0-0.531 0.469-0.969 1.031-0.969h0.188c0.531 0 1 0.438 1 0.969v10.219c0 0.563-0.469 1.031-1 1.031zM9.031 24.031h-0.156c-0.563 0-1.031-0.469-1.031-1.031v-10.219c0-0.531 0.469-0.969 1.031-0.969h0.156c0.563 0 1.031 0.438 1.031 0.969v10.219c0 0.563-0.469 1.031-1.031 1.031zM12.563 24.031h-0.156c-0.563 0-1-0.469-1-1.031v-10.219c0-0.531 0.438-0.969 1-0.969h0.156c0.563 0 1.031 0.438 1.031 0.969v10.219c0 0.563-0.469 1.031-1.031 1.031z"
        ></path>
      </svg>
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 192 192"
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        fill="none"
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
          class="like"
        />
      </svg>
    </div>
  </li>`;
  });
  list += "</ul>";
  commentField.innerHTML = list;
}
