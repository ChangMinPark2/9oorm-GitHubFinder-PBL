function showImage() {
    var userId = document.getElementById("userId").value;
    var imageUrl = "https://github.com/" + userId + ".png";
    document.getElementById("profileImage").src = imageUrl;
}

async function showImageAndRepos() {
    var userId = document.getElementById("userId").value;
    var imageUrl = "https://github.com/" + userId + ".png";
    document.getElementById("profileImage").src = imageUrl;

    var response = await fetch("https://api.github.com/users/" + userId + "/repos");
    var repos = await response.json();

    var repoList = document.getElementById("list");
    repoList.innerHTML = ""; // 리스트 초기화

    repos.forEach(function (repo) {
        var repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.textContent = repo.name;
        repoList.appendChild(repoLink);

        var breakLine = document.createElement("br");
        repoList.appendChild(breakLine);
    });
}
