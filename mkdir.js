chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    let domain = url.replace(/(^\w+:|^)\/\//, '');
    var names = domain.split(".");
    var extensions = ['com', 'org', 'gov', 'online'];
    var countOfDots = (domain.match(/\./g) || []).length;
    console.log(countOfDots)
    var filename = item.filename;
    if(countOfDots == 1){
      filename = names[0] + '/' + filename;
    }
    //example.extension.extension
    else if(countOfDots > 1 && extensions.indexOf(names[1]) >= 0){
      filename = names[0] + '/' + filename;
    }
    else if(countOfDots > 1 && extensions.indexOf(names[2]) >= 0){
      filename = names[1] + '/' + filename;
    }
    //www.example.extension or mail.example.example
    else if(countOfDots > 1 && (names[0] === 'www' || names[0] === 'mail' )){
      filename = names[1] + '/' + filename;
    }else{
      let ex = extensions.filter(value => names.includes(value));
      if(ex.length > 0){
        ex = ex[0];
        indexOfExtension = names.indexOf(ex);
        filename = names[indexOfExtension -1] + '/' + filename;
      }else{
        filename = names[0] + '/' + filename;
      }
    }
    suggest({filename: filename});
  });
  return true;
});