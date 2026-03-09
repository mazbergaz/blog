(async function () {
  var perPage = 14;
  var allPosts = BlogUtils.sortPostsLatest(window.BLOG_POSTS || []);
  var totalPages = Math.max(1, Math.ceil(allPosts.length / perPage));
  var pageParam = Number(BlogUtils.getQueryParam("page") || "1");
  var currentPage = Number.isFinite(pageParam) ? Math.min(Math.max(pageParam, 1), totalPages) : 1;

  var listContainer = document.getElementById("post-list");
  var pageInfo = document.getElementById("page-info");
  var prevButton = document.getElementById("page-prev");
  var nextButton = document.getElementById("page-next");
  var navContainer = document.getElementById("archive-nav");
  var siteTitleEl = document.getElementById("site-title");
  var siteDescriptionEl = document.getElementById("site-description");

  var siteMeta = await BlogUtils.loadSiteMeta();
  siteTitleEl.textContent = siteMeta.title;
  siteDescriptionEl.textContent = siteMeta.description;
  document.title = siteMeta.title;

  BlogUtils.renderArchiveNav(navContainer, allPosts);

  var start = (currentPage - 1) * perPage;
  var pagePosts = allPosts.slice(start, start + perPage);

  var cards = await Promise.all(
    pagePosts.map(async function (path) {
      var info = BlogUtils.parsePostPath(path);
      var title = BlogUtils.slugToTitle(info.slug);
      var excerpt = "";

      try {
        var response = await fetch(BlogUtils.resolvePostPath(path));
        if (response.ok) {
          var markdown = await response.text();
          var heading = BlogUtils.getFirstHeading(markdown);
          if (heading) {
            title = heading;
          }
          var parsedHtml = BlogUtils.parseMarkdownToHtml(markdown);
          excerpt = BlogUtils.getExcerptFromHtml(parsedHtml, 150);
        }
      } catch (err) {
        excerpt = "";
      }

      var preview = excerpt || "No preview available.";
      return (
        '<article class="card">' +
          "<h2>" + title + "</h2>" +
          "<p>" + preview + "</p>" +
          '<a class="read-more" href="article.html?post=' + encodeURIComponent(path) + '">...continue reading</a>' +
        "</article>"
      );
    })
  );

  listContainer.innerHTML = cards.join("\n");

  pageInfo.textContent = "Page " + currentPage + " of " + totalPages;
  prevButton.disabled = currentPage <= 1;
  nextButton.disabled = currentPage >= totalPages;

  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      window.location.href = "index.html?page=" + (currentPage - 1);
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      window.location.href = "index.html?page=" + (currentPage + 1);
    }
  });
})();
