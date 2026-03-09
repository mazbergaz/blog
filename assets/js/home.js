(async function () {
  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

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
      var excerptHtml = "";
      var cardImageHtml = "";
      var articleHref = "article.html?post=" + encodeURIComponent(path);

      try {
        var response = await fetch(BlogUtils.resolvePostPath(path));
        if (response.ok) {
          var markdown = await response.text();
          var heading = BlogUtils.getFirstHeading(markdown);
          if (heading) {
            title = heading;
          }
          var parsedHtml = BlogUtils.parseMarkdownToHtml(markdown, path);
          var parsedBodyHtml = BlogUtils.removeFirstHeadingFromHtml(parsedHtml);
          var parsedContainer = document.createElement("div");
          parsedContainer.innerHTML = parsedBodyHtml;
          var firstImage = parsedContainer.querySelector("img");
          var hasImage = Boolean(firstImage);

          if (hasImage) {
            cardImageHtml = '<img class="card-image" src="' + escapeHtml(firstImage.getAttribute("src") || "") + '" alt="' + escapeHtml(firstImage.getAttribute("alt") || "") + '">';
          }

          excerptHtml = BlogUtils.getExcerptHtmlByWords(parsedBodyHtml, hasImage ? 50 : 100);
        }
      } catch (err) {
        excerptHtml = "";
        cardImageHtml = "";
      }

      var preview = excerptHtml || "<p>No preview available.</p>";
      return (
        '<article class="card card-clickable" data-href="' + articleHref + '" role="link" tabindex="0" aria-label="Read article: ' + escapeHtml(title) + '">' +
          "<h2>" + escapeHtml(title) + "</h2>" +
          cardImageHtml +
          '<div class="card-excerpt">' + preview + "</div>" +
          '<a class="read-more" href="' + articleHref + '">...continue reading</a>' +
        "</article>"
      );
    })
  );

  listContainer.innerHTML = cards.join("\n");

  var cardElements = listContainer.querySelectorAll(".card-clickable");
  cardElements.forEach(function (card) {
    function navigateToCardHref() {
      var href = card.getAttribute("data-href");
      if (href) {
        window.location.href = href;
      }
    }

    card.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        return;
      }
      navigateToCardHref();
    });

    card.addEventListener("keydown", function (event) {
      if (event.target.closest("a")) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        navigateToCardHref();
      }
    });
  });

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
