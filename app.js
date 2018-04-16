window.addEventListener('load', () => {
  const focusPost = document.querySelector('#focus-posts');
  const blogpostButton = document.querySelector('#postButton');

  const baseURL =  'http://localhost:3000/api/blogposts';
  const getAllPosts = () => {
    const blogpostsListEl = document.createElement('ul');
    axios.get(`${baseURL}`)
    .then(response => {
      response.data.forEach(blogpost => {
        const blogpostItemEl = document.createElement('li');

        blogpostItemEl.addEventListener('click', () => {
          focusPost.innerHTML = '';
          const titleEl = document.createElement('h3');
          titleEl.innerHTML = blogpost.title;
          focusPost.appendChild(titleEl);
          const contentEl = document.createElement('p');
          contentEl.innerHTML = blogpost.content;
          focusPost.appendChild(contentEl);
          const editButton = document.createElement('button');
          editButton.innerHTML = 'edit';
          focusPost.appendChild(editButton);
          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'delete';
          focusPost.appendChild(deleteButton);

          editButton.addEventListener('click', () => {
            focusPost.innerHTML = '';
            const focusLabel = document.createElement('label');
            focusLabel.innerHTML = 'Title';
            focusPost.appendChild(focusLabel);
            const focusInput = document.createElement('input')
            focusPost.appendChild(focusInput);
            const paraLabel = document.createElement('label');
            paraLabel.innerHTML = 'Content';
            focusPost.appendChild(paraLabel);
            const paraTextArea = document.createElement('textarea')
            focusPost.appendChild(paraTextArea);
            focusInput.value = blogpost.title;
            paraTextArea.innerHTML = blogpost.content;
            const submitButton = document.createElement('button');
            submitButton.innerHTML = "Submit";
            focusPost.appendChild(submitButton);

            submitButton.addEventListener('click', (event) => {
              const newTitle = focusInput.value;
              const newTextArea = paraTextArea.innerHTML;
              axios.put(`${baseURL}`, {title: newTitle, content: newTextArea})

              .catch(error => {console.error(error);});
              event.preventDefault;
            })

          });

      -    deleteButton.addEventListener('click', () => {

          });

        });

        blogpostItemEl.innerHTML = blogpost.title;
        blogpostsListEl.appendChild(blogpostItemEl);
      });
      document.querySelector('#all-posts').appendChild(blogpostsListEl);
    })
    .catch(error => {console.error(error);});
  }
  getAllPosts();
})
