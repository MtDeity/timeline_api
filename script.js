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
  fetch(signUpUrl, {
    method: 'POST',
    body: JSON.stringify(signUpParams),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => {
      console.log('Success:', JSON.stringify(response));
      localStorage.token = response.token
      const sign_up_render = document.createElement("p");
      sign_up_render.textContent = JSON.stringify(response);
      const sign_up = document.querySelector(".sign_up");
      sign_up.appendChild(sign_up_render);
    })
  .catch(error => {
    console.error(error);
    const sign_up_render = document.createElement("p");
    sign_up_render.textContent = JSON.stringify(response);
    const sign_up = document.querySelector(".sign_up");
    sign_up.appendChild(sign_up_render);
  });
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
  fetch(signInUrl, {
    method: 'POST',
    body: JSON.stringify(signInParams),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => {
      console.log(JSON.stringify(response));
      localStorage.token = response.token
      const sign_in_render = document.createElement("p");
      sign_in_render.textContent = JSON.stringify(response);
      const sign_in = document.querySelector(".sign_in");
      sign_in.appendChild(sign_in_render);
    })
  .catch(error => {
    console.error(error);
    const sign_in_render = document.createElement("p");
    sign_in_render.textContent = error;
    const sign_in = document.querySelector(".sign_in");
    sign_in.appendChild(sign_in_render);
  });
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
  fetch(`${usersUrl}?${usersQs}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then(res => res.json())
  .then(response => {
      console.log(JSON.stringify(response));
      const users_render = document.createElement("p");
      users_render.textContent = JSON.stringify(response);
      const users = document.querySelector(".users");
      users.appendChild(users_render);
    })
  .catch(error => {
    console.error(error);
    const users_render = document.createElement("p");
    users_render.textContent = error;
    const users = document.querySelector(".users");
    users.appendChild(users_render);
  });
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
  fetch(userEditUrl, {
    method: 'PUT',
    body: JSON.stringify(userEditParams),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then(res => res.json())
  .then(response => {
      console.log(JSON.stringify(response));
      const user_edit_render = document.createElement("p");
      user_edit_render.textContent = JSON.stringify(response);
      const user_edit = document.querySelector(".user_edit");
      user_edit.appendChild(user_edit_render);
    })
  .catch(error => {
    console.error(error);
    const user_edit_render = document.createElement("p");
    user_edit_render.textContent = error;
    const user_edit = document.querySelector(".user_edit");
    user_edit.appendChild(user_edit_render);
  });
});

// ユーザー削除
document.getElementById("delete_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const deleteUrl = `https://teachapi.herokuapp.com/users/${document.getElementById("delete_id").value}`;
  fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then(res => res.json())
  .then(response => {
      console.log(JSON.stringify(response));
      const delete_render = document.createElement("p");
      delete_render.textContent = JSON.stringify(response);
      const deletediv = document.querySelector(".delete");
      deletediv.appendChild(delete_render);
    })
  .catch(error => {
    console.error(error);
    const delete_render = document.createElement("p");
    delete_render.textContent = error;
    const deletediv = document.querySelector(".delete");
    deletediv.appendChild(delete_render);
  });
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
  fetch(`${timelineUrl}?${timelineQs}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then(res => res.json())
  .then(response => {
      console.log(JSON.stringify(response));
      const timeline_render = document.createElement("p");
      timeline_render.textContent = JSON.stringify(response);
      const timeline = document.querySelector(".timeline");
      timeline.appendChild(timeline_render);
    })
  .catch(error => {
    console.error(error);
    const timeline_render = document.createElement("p");
    timeline_render.textContent = error;
    const timeline = document.querySelector(".timeline");
    timeline.appendChild(timeline_render);
  });
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
  fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify(postParams),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then(res => res.json())
  .then(response => {
      console.log(JSON.stringify(response));
      const post_render = document.createElement("p");
      post_render.textContent = JSON.stringify(response);
      const post = document.querySelector(".post");
      post.appendChild(post_render);
    })
  .catch(error => {
    console.error(error);
    const post_render = document.createElement("p");
    post_render.textContent = error;
    const post = document.querySelector(".post");
    post.appendChild(post_render);
  });
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
  fetch(editPostUrl, {
    method: 'PUT',
    body: JSON.stringify(editPostParams),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then(res => res.json())
  .then(response => {
      console.log(JSON.stringify(response));
      const edit_post_render = document.createElement("p");
      edit_post_render.textContent = JSON.stringify(response);
      const edit_post = document.querySelector(".edit_post");
      edit_post.appendChild(edit_post_render);
    })
  .catch(error => {
    console.error(error);
    const edit_post_render = document.createElement("p");
    edit_post_render.textContent = error;
    const edit_post = document.querySelector(".edit_post");
    edit_post.appendChild(edit_post_render);
  });
});

// 投稿削除
document.getElementById("delete_post_submit").addEventListener("click", (event) => {
  event.preventDefault();
  const deletePostUrl = `https://teachapi.herokuapp.com/posts/${document.getElementById("delete_post_id").value}`;
  fetch(deletePostUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then(res => res.json())
  .then(response => {
      console.log(JSON.stringify(response));
      const delete_post_render = document.createElement("p");
      delete_post_render.textContent = JSON.stringify(response);
      const delete_post = document.querySelector(".delete_post");
      delete_post.appendChild(delete_post_render);
    })
  .catch(error => {
    console.error(error);
    const delete_post_render = document.createElement("p");
    delete_post_render.textContent = error;
    const delete_post = document.querySelector(".delete_post");
    delete_post.appendChild(delete_post_render);
  });
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
  fetch(`${allPostsUrl}?${allPostsQs}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then(res => res.json())
  .then(response => {
      console.log(JSON.stringify(response));
      const all_posts_render = document.createElement("p");
      all_posts_render.textContent = JSON.stringify(response);
      const all_posts = document.querySelector(".all_posts");
      all_posts.appendChild(all_posts_render);
    })
  .catch(error => {
    console.error(error);
    const all_posts_render = document.createElement("p");
    all_posts_render.textContent = error;
    const all_posts = document.querySelector(".all_posts");
    all_posts.appendChild(all_posts_render);
  });
});