(() => {
  const repoPattern = /^https?:\/\/github\.com\/[a-z0-9_-]+\/[a-z0-9_-]+/i
  const repoURL = location.href.match(repoPattern)
  if (repoURL == null) return
  
  const stargazersYouKnowURL = repoURL + '/stargazers/you_know'
  const request = new XMLHttpRequest()
  request.open('GET', stargazersYouKnowURL, true)
  request.responseType = 'document'
  request.send()
  request.onload = () => {
    const responseDocument = request.response
    const avatars = responseDocument.querySelectorAll('.follow-list .avatar')
    if (avatars.length == 0) return
    
    const starringContainer = document.querySelector('.starring-container')
    const stargazersYouKnow = document.createElement('div')
    stargazersYouKnow.classList.add('dropdown-menu', 'dropdown-menu-s', 'text-center')
    stargazersYouKnow.style.display = 'none'
    
    const heading = document.createElement('h3')
    heading.textContent = 'Includes'
    stargazersYouKnow.appendChild(heading)
    
    Array.prototype.forEach.call(avatars, avatar => {
      const newAvatar = new Image()
      newAvatar.classList.add('avatar', 'avatar-small')
      newAvatar.src = avatar.src
      newAvatar.alt = avatar.alt
      newAvatar.width = newAvatar.height = 36
      stargazersYouKnow.appendChild(newAvatar)
    })
    
    starringContainer.append(stargazersYouKnow)
    starringContainer.addEventListener('mouseenter', () => stargazersYouKnow.style.display = 'block')
    starringContainer.addEventListener('mouseleave', () => stargazersYouKnow.style.display = 'none')  
  }
}) ()