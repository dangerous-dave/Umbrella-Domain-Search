chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "searchDomain",
      title: "Umbrella Domain Search",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "searchDomain") {
      const query = info.selectionText.trim();
      if (isValidDomain(query)) {
        const url = `https://dashboard.umbrella.com/o/1927251/#/investigate/domain-view/name/${query}/view`;
        chrome.tabs.create({ url });
      } else {
        alert("The highlighted text doesn't seem to be a valid domain.");
      }
    }
  });
  
  function isValidDomain(domain) {
    const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/i;
    return domainRegex.test(domain);
  }
  