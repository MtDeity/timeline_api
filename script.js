const fetchWrap = (divName, method, isTokenExist, url, params) => {
  const render = (response) => {
    const p = document.createElement("p");
    p.textContent = JSON.stringify(response);
    const div = document.querySelector(`.${divName}`);
    div.appendChild(p);
  }

  if (!isTokenExist) {
    fetch(url, {
      method: method,
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
      localStorage.token = response.token
      render(response);
    })
    .catch(error => {
      console.error(error);
      render(response);
    })
  } else if (params) {
    fetch(url, {
      method: method,
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    }).then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
      render(response);
    })
    .catch(error => {
      console.error(error);
      render(response);
    })
  } else {
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    }).then(res => res.json())
    .then(response => {
      console.log(JSON.stringify(response));
      render(response);
    })
    .catch(error => {
      console.error(error);
      render(response);
    })
  }
}

// ユーザー登録
document.getElementById("sign_up_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const signUpUrl = 'https://teachapi.herokuapp.com/sign_up';
  const signUpParams = {
    sign_up_user_params: {
      name: document.getElementById("sign_up_name").value,
      bio: document.getElementById("sign_up_bio").value,
      email: document.getElementById("sign_up_email").value,
      password: document.getElementById("sign_up_password").value,
      password_confirmation: document.getElementById("sign_up_password_confirmation").value
    }
  };
  fetchWrap("sign_up", "POST", false, signUpUrl, signUpParams);
});

// ユーザーログイン
document.getElementById("sign_in_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const signInUrl = 'https://teachapi.herokuapp.com/sign_in';
  const signInParams = {
    sign_in_user_params: {
      email: document.getElementById("sign_in_email").value,
      password: document.getElementById("sign_in_password").value,
      password_confirmation: document.getElementById("sign_in_password_confirmation").value
    }
  };
  fetchWrap("sign_in", "POST", false, signInUrl, signInParams);
});

// ユーザー一覧
document.getElementById("users_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const usersUrl = 'https://teachapi.herokuapp.com/users';
  const usersParams = {
    page: document.getElementById("users_page").value,
    limit: document.getElementById("users_limit").value,
    query: document.getElementById("users_query").value
  };
  const usersQs = new URLSearchParams(usersParams);
  fetchWrap("users", "GET", true, `${usersUrl}?${usersQs}`);
});

// ユーザー編集
document.getElementById("user_edit_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const userEditUrl = `https://teachapi.herokuapp.com/users/${document.getElementById("user_edit_id").value}`;
  const userEditParams = {
    user_params: {
      name: document.getElementById("user_edit_name").value,
      bio: document.getElementById("user_edit_bio").value
    }
  };
  fetchWrap("user_edit", "PUT", true, userEditUrl, userEditParams);
});

// ユーザー削除
document.getElementById("delete_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const deleteUrl = `https://teachapi.herokuapp.com/users/${document.getElementById("delete_id").value}`;
  fetchWrap("delete", "DELETE", true, deleteUrl);
});

// ユーザーのタイムライン
document.getElementById("timeline_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const timelineUrl = `https://teachapi.herokuapp.com/users/${document.getElementById("timeline_id").value}/timeline`;
  const timelineParams = {
    page: document.getElementById("timeline_page").value,
    limit: document.getElementById("timeline_limit").value,
    query: document.getElementById("timeline_query").value
  };
  const timelineQs = new URLSearchParams(timelineParams);
  fetchWrap("timeline", "GET", true, `${timelineUrl}?${timelineQs}`);
});

// 投稿作成
document.getElementById("post_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const postUrl = 'https://teachapi.herokuapp.com/posts';
  const postParams = {
    post_params: {
      text: document.getElementById("post_text").value,
    }
  };
  fetchWrap("post", "POST", true, postUrl, postParams);
});

// 投稿編集
document.getElementById("edit_post_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const editPostUrl = `https://teachapi.herokuapp.com/posts/${document.getElementById("edit_post_id").value}`;
  const editPostParams = {
    post_params: {
      text: document.getElementById("edit_post_text").value
    }
  };
  fetchWrap("edit_post", "PUT", true, editPostUrl, editPostParams);
});

// 投稿削除
document.getElementById("delete_post_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const deletePostUrl = `https://teachapi.herokuapp.com/posts/${document.getElementById("delete_post_id").value}`;
  fetchWrap("delete_post", "DELETE", true, deletePostUrl);
});

// 投稿一覧
document.getElementById("all_posts_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const allPostsUrl = 'https://teachapi.herokuapp.com/posts';
  const allPostsParams = {
    page: document.getElementById("all_posts_page").value,
    limit: document.getElementById("all_posts_limit").value,
    query: document.getElementById("all_posts_query").value
  };
  const allPostsQs = new URLSearchParams(allPostsParams);
  fetchWrap("all_posts", "GET", true, `${allPostsUrl}?${allPostsQs}`);
});