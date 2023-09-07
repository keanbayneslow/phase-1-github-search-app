document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchTerm = searchInput.value;

        userList.innerHTML = '';
        reposList.innerHTML = '';

        searchUsers(searchTerm);
    });

    function searchUsers(searchTerm) {
        fetch(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                const users = data.items;
                users.forEach(user => {
                    const userItem = document.createElement('li');
                    userItem.innerHTML = `
                        <img src="${user.avatar_url}" alt="${user.login}" width="50">
                        <a href="${user.html_url}" target="_blank">${user.login}</a>
                    `;
                    userList.appendChild(userItem);

                    userItem.addEventListener('click', function () {

                        reposList.innerHTML = '';

                        loadUserRepos(user.login);
                    });
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function loadUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(data => {
                const repos = data;
                repos.forEach(repo => {
                    const repoItem = document.createElement('li');
                    repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                    reposList.appendChild(repoItem);
                });
            })
            .catch(error => console.error('Error:', error));
    }
});