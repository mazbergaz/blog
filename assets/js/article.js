(async function () {
  function updateArticleStickyOffset() {
    var header = document.querySelector(".main-header-sticky");
    var title = document.getElementById("article-title");
    var root = document.documentElement;
    if (!header || !root) {
      return;
    }
    root.style.setProperty("--site-header-height", header.offsetHeight + "px");
    root.style.setProperty("--article-title-sticky-height", (title ? title.offsetHeight : 0) + "px");
  }

  function extractArticleByline(container, bylineEl) {
    if (!container || !bylineEl) {
      return false;
    }

    bylineEl.hidden = true;
    bylineEl.innerHTML = "";

    var paragraphs = container.querySelectorAll("p");
    var found = false;

    paragraphs.forEach(function (paragraph) {
      if (found) {
        return;
      }

      var text = (paragraph.textContent || "").replace(/\s+/g, " ").trim();
      var isByline = /^dengan hormat,\s*Bergas Bimo Br(?:an|n)arto\s*-\s*.+/i.test(text);

      if (!isByline) {
        return;
      }

      if (!/<br\s*\/?\s*>/i.test(paragraph.innerHTML)) {
        paragraph.innerHTML = paragraph.innerHTML.replace(/dengan hormat,\s*/i, "dengan hormat,<br>");
      }

      bylineEl.innerHTML = paragraph.innerHTML;
      bylineEl.hidden = false;
      paragraph.remove();
      found = true;
    });

    return found;
  }

  var manifestPosts = await BlogUtils.loadPostsManifest();
  var allPosts = BlogUtils.sortPostsLatest(manifestPosts);
  var navContainer = document.getElementById("archive-nav");
  var siteTitleEl = document.getElementById("site-title");
  var siteDescriptionEl = document.getElementById("site-description");

  var siteMeta = await BlogUtils.loadSiteMeta();
  siteTitleEl.textContent = siteMeta.title;
  siteDescriptionEl.innerHTML = siteMeta.descriptionHtml;
  document.title = siteMeta.title;
  updateArticleStickyOffset();
  window.addEventListener("resize", updateArticleStickyOffset);

  BlogUtils.renderArchiveNav(navContainer, allPosts);

  var postPath = BlogUtils.normalizeLogicalPostPath(BlogUtils.getQueryParam("post"));
  var titleEl = document.getElementById("article-title");
  var bylineEl = document.getElementById("article-byline");
  var bodyEl = document.getElementById("article-body");
  var prevEl = document.getElementById("prev-link");
  var nextEl = document.getElementById("next-link");

  if (!postPath || allPosts.indexOf(postPath) === -1) {
    titleEl.textContent = "Article not found";
    bodyEl.innerHTML = '<p><a href="index.html">Back to homepage</a></p>';
    prevEl.style.visibility = "hidden";
    nextEl.style.visibility = "hidden";
    return;
  }

  var index = allPosts.indexOf(postPath);
  var info = BlogUtils.parsePostPath(postPath);
  var fallbackTitle = BlogUtils.slugToTitle(info.slug);

  try {
    var response = await fetch(BlogUtils.resolvePostPath(postPath));
    if (!response.ok) {
      throw new Error("Unable to load article");
    }
    var markdown = await response.text();
    var heading = BlogUtils.getFirstHeading(markdown);
    titleEl.textContent = heading || fallbackTitle;
    document.title = (heading || fallbackTitle) + " - " + siteMeta.title;
    updateArticleStickyOffset();
    var parsedHtml = BlogUtils.parseMarkdownToHtml(markdown, postPath);
    bodyEl.innerHTML = BlogUtils.removeFirstHeadingFromHtml(parsedHtml);
    extractArticleByline(bodyEl, bylineEl);
    updateArticleStickyOffset();
  } catch (err) {
    titleEl.textContent = fallbackTitle;
    document.title = fallbackTitle + " - " + siteMeta.title;
    bodyEl.innerHTML = "<p>Unable to load this article.</p>";
  }

  var prevPath = allPosts[index + 1] || null;
  var nextPath = allPosts[index - 1] || null;

  if (prevPath) {
    prevEl.href = "article.html?post=" + encodeURIComponent(prevPath);
  } else {
    prevEl.style.visibility = "hidden";
  }

  if (nextPath) {
    nextEl.href = "article.html?post=" + encodeURIComponent(nextPath);
  } else {
    nextEl.style.visibility = "hidden";
  }
})();
