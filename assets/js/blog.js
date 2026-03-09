(function () {
  var SITE_META_FILE = "content/blog.md";

  function normalizeLogicalPostPath(path) {
    return String(path || "")
      .replace(/^\/+/, "")
      .replace(/^content\//, "");
  }

  function resolvePostPath(path) {
    return "content/" + normalizeLogicalPostPath(path);
  }

  function parsePostPath(path) {
    var normalizedPath = normalizeLogicalPostPath(path);
    var parts = normalizedPath.split("/");
    return {
      path: normalizedPath,
      year: Number(parts[0]),
      month: Number(parts[1]),
      slug: parts[2].replace(/\.md$/i, "")
    };
  }

  function slugToTitle(slug) {
    return slug
      .split("-")
      .map(function (word) {
        return word ? word.charAt(0).toUpperCase() + word.slice(1) : word;
      })
      .join(" ");
  }

  function getFirstHeading(markdown) {
    var match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : null;
  }

  function parseMarkdownToHtml(markdown) {
    if (window.marked && typeof window.marked.parse === "function") {
      return window.marked.parse(markdown || "");
    }
    return markdownToHtml(markdown || "");
  }

  function getTextFromHtml(html) {
    var container = document.createElement("div");
    container.innerHTML = String(html || "");
    return (container.textContent || container.innerText || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getExcerptFromHtml(html, wordLimit) {
    var text = getTextFromHtml(html);
    if (!text) {
      return "";
    }
    var words = text.split(/\s+/);
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ");
  }

  function escapeHtml(input) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function inlineMarkdown(line) {
    return escapeHtml(line)
      .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function markdownToHtml(markdown) {
    var lines = markdown.replace(/\r/g, "").split("\n");
    var html = [];
    var inList = false;

    function closeList() {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
    }

    for (var i = 0; i < lines.length; i += 1) {
      var raw = lines[i];
      var line = raw.trim();

      if (!line) {
        closeList();
        continue;
      }

      var heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        closeList();
        var level = heading[1].length;
        html.push("<h" + level + ">" + inlineMarkdown(heading[2]) + "</h" + level + ">");
        continue;
      }

      var listItem = line.match(/^[-*]\s+(.+)$/);
      if (listItem) {
        if (!inList) {
          html.push("<ul>");
          inList = true;
        }
        html.push("<li>" + inlineMarkdown(listItem[1]) + "</li>");
        continue;
      }

      closeList();
      html.push("<p>" + inlineMarkdown(line) + "</p>");
    }

    closeList();
    return html.join("\n");
  }

  function sortPostsLatest(paths) {
    return paths
      .slice()
      .sort(function (a, b) {
        var pa = parsePostPath(a);
        var pb = parsePostPath(b);
        if (pa.year !== pb.year) {
          return pb.year - pa.year;
        }
        if (pa.month !== pb.month) {
          return pb.month - pa.month;
        }
        return pb.slug.localeCompare(pa.slug);
      });
  }

  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function parseSiteMetaFromMarkdown(markdown) {
    var lines = String(markdown || "").replace(/\r/g, "").split("\n");
    var title = "hitherto";
    var description = "journal of the hourney so far";

    for (var i = 0; i < lines.length; i += 1) {
      var line = lines[i].trim();
      if (!line) {
        continue;
      }

      if (/^#\s+/.test(line)) {
        title = line.replace(/^#\s+/, "").trim() || title;
        continue;
      }

      if (!description || description === "journal of the hourney so far") {
        description = line;
      }
      break;
    }

    return { title: title, description: description };
  }

  async function loadSiteMeta() {
    try {
      var response = await fetch(SITE_META_FILE);
      if (!response.ok) {
        throw new Error("Site meta not found");
      }
      var markdown = await response.text();
      return parseSiteMetaFromMarkdown(markdown);
    } catch (err) {
      return { title: "hitherto", description: "journal of the hourney so far" };
    }
  }

  function groupPostsByYearMonth(paths) {
    var grouped = {};
    for (var i = 0; i < paths.length; i += 1) {
      var info = parsePostPath(paths[i]);
      var yearKey = String(info.year);
      var monthKey = String(info.month).padStart(2, "0");
      if (!grouped[yearKey]) {
        grouped[yearKey] = {};
      }
      if (!grouped[yearKey][monthKey]) {
        grouped[yearKey][monthKey] = [];
      }
      grouped[yearKey][monthKey].push(paths[i]);
    }
    return grouped;
  }

  function renderArchiveNav(container, sortedPaths) {
    var grouped = groupPostsByYearMonth(sortedPaths);
    var years = Object.keys(grouped).sort(function (a, b) {
      return Number(b) - Number(a);
    });
    var html = [];
    var latestYear = years.length > 0 ? years[0] : null;

    for (var y = 0; y < years.length; y += 1) {
      var year = years[y];
      var months = Object.keys(grouped[year]).sort(function (a, b) {
        return Number(b) - Number(a);
      });
      var yearOpen = year === latestYear ? " open" : "";

      html.push("<section class=\"archive-year\">");
      html.push("<details class=\"archive-year-toggle\"" + yearOpen + ">");
      html.push("<summary><h3>" + year + "</h3></summary>");

      for (var m = 0; m < months.length; m += 1) {
        var month = months[m];
        var monthOpen = year === latestYear && m < 2 ? " open" : "";
        html.push("<details class=\"archive-month-toggle\"" + monthOpen + ">");
        html.push("<summary><h4>" + month + "</h4></summary>");
        html.push("<ul>");
        var posts = grouped[year][month];
        for (var p = 0; p < posts.length; p += 1) {
          var path = posts[p];
          var title = slugToTitle(parsePostPath(path).slug);
          html.push('<li><a href="article.html?post=' + encodeURIComponent(path) + '">' + title + "</a></li>");
        }
        html.push("</ul>");
        html.push("</details>");
      }
      html.push("</details>");
      html.push("</section>");
    }

    container.innerHTML = html.join("\n");
  }

  window.BlogUtils = {
    loadSiteMeta: loadSiteMeta,
    parseMarkdownToHtml: parseMarkdownToHtml,
    getExcerptFromHtml: getExcerptFromHtml,
    normalizeLogicalPostPath: normalizeLogicalPostPath,
    resolvePostPath: resolvePostPath,
    parsePostPath: parsePostPath,
    slugToTitle: slugToTitle,
    getFirstHeading: getFirstHeading,
    markdownToHtml: markdownToHtml,
    sortPostsLatest: sortPostsLatest,
    getQueryParam: getQueryParam,
    renderArchiveNav: renderArchiveNav
  };
})();
