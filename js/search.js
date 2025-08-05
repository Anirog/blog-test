let posts = [];

fetch('search.json')
  .then(response => response.json())
  .then(data => posts = data);

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('searchResults');
  const originalCards = document.querySelectorAll('.card.blog-card');

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();

    // Show/hide based on search input
    if (query) {
      const results = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.join(',').toLowerCase().includes(query)
      );

      resultsDiv.innerHTML = results.map(post => `
        <div class="card blog-card">
          <h2 class="blog-title">${post.title}</h2>
          <img src="${post.image}" alt="${post.image_alt}" class="card-img">
          <div class="card-content">
            <p class="blog-meta">
              <span class="blog-tags">
                ${post.tags.map(tag => `<a href="tag-${tag.toLowerCase()}.html" class="blog-tag">${tag}</a>`).join(' ')}
              </span>
            </p>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="${post.url}" class="blog-readmore">Read more →</a>
          </div>
        </div>
      `).join('');

      originalCards.forEach(card => card.style.display = 'none');
    } else {
      resultsDiv.innerHTML = '';
      originalCards.forEach(card => card.style.display = '');
    }
  });
});