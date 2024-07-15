const getPostStyle = function (title) {
    return `---
layout: post
title: ${title}
description: >
sitemap: false
---

# ${title}

---
`;
};

module.exports = getPostStyle;
