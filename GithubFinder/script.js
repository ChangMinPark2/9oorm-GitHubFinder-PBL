async function fetchGitHubUserProfile() {
    var userId = document.getElementById("userId").value;
    var imageUrl = "https://github.com/" + userId + ".png";
    document.getElementById("profileImage").src = imageUrl;

    var response = await fetch("https://api.github.com/users/" + userId);

    if(response.status === 404){
        alert('존재하지 않는 아이디입니다');
        return;
    }
    let user = await response.json();

    profileImage.style.visibility = "visible"; // 아이디 검색 후에는 이미지 보임

    let profile = document.getElementById("profile");
    // 사용자 이름과 회사 정보를 표시
    profile.innerHTML = "이름: " + user.name + "<br/>" + "회사: " + (user.company ? user.company : "정보 없음");
}

async function showImageAndRepos() {
    fetchGitHubUserProfile();

    let userId = document.getElementById("userId").value;
    let response = await fetch("https://api.github.com/users/" + userId + "/repos");
    let repos = await response.json();

    let repoList = document.getElementById("list");
    repoList.innerHTML = ""; // 리스트 초기화

    repos.forEach(function (repo) {
        let repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.textContent = repo.name;
        repoList.appendChild(repoLink);

        let breakLine = document.createElement("br");
        repoList.appendChild(breakLine);
    });
}
