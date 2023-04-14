var content = document.getElementById("content");
var popupWrapper = document.getElementById("popup-wrapper");

function showPopup(event) {
  event.preventDefault(); // 阻止表单提交

  // 获取搜索关键字
  var keyword = event.target.keyword.value;

  // 模拟从服务器获取小说信息
  // 在这里，您需要使用实际的服务器端代码来获取小说信息
  // 这里的代码仅用于演示目的
  var novel = {
    title: "三体",
    author: "刘慈欣",
    summary: "人类文明不断发展，在大反转中逐渐面临灭亡的危险。在这一背景下，一群科学家不懈努力，试图与外星文明进行联系，并寻找解决方案。然而，他们不知道的是，外星文明的真实面目可能远远超出他们的想象...",
    updated: "2022-12-31",
    cover: "https://i.loli.net/2022/04 "};

  // 将小说信息显示在弹窗中
  var title = document.getElementById("title");
  var summary = document.getElementById("summary");
  var updated = document.getElementById("updated");
  var cover = document.getElementById("cover");
  title.textContent = novel.title;
  summary.textContent = novel.summary;
  updated.textContent = "更新时间：" + novel.updated;
  cover.src = novel.cover;
  popupWrapper.style.display = "block";
}

function hidePopup() {
  popupWrapper.style.display = "none";
}

// 绑定表单提交事件
var form = document.getElementById("search-form");
form.addEventListener("submit", showPopup);

// 将popup-wrapper覆盖在content上面
content.parentNode.insertBefore(popupWrapper, content);
