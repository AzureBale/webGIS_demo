   if(document.body.clientWidth < 700){
      document.getElementById('cleanScreen').style.display = 'none';
      document.getElementById('result').style.display = 'none';
      document.getElementById('textRoute').style.display = 'none';
      document.getElementById('text').style.display = 'none';
      document.getElementById('panel').style.display = 'none';
      document.getElementById('routePanel').style.display = 'none';
      document.getElementById('coordinate').style.display = 'none';
      document.getElementById('anySearchPanel').style.display = 'none';
      alert('屏幕尺寸太小，无法使用功能');
    }else{
      document.getElementById('cleanScreen').style.display = 'flex';
      document.getElementById('result').style.display = 'flex';
      document.getElementById('textRoute').style.display = 'flex';
      document.getElementById('text').style.display = 'flex';
      document.getElementById('panel').style.display = 'flex';
      document.getElementById('routePanel').style.display = 'flex';
      document.getElementById('coordinate').style.display = 'flex';
      document.getElementById('anySearchPanel').style.display = 'flex';
    }

    
function hidePanel(){
      document.getElementById('cleanScreen').style.display = 'none';
      document.getElementById('result').style.display = 'none';
      document.getElementById('textRoute').style.display = 'none';
      document.getElementById('text').style.display = 'none';
      document.getElementById('panel').style.display = 'none';
      document.getElementById('routePanel').style.display = 'none';
      document.getElementById('coordinate').style.display = 'none';
      document.getElementById('anySearchPanel').style.display = 'none';
}
function showPanel(){
      document.getElementById('cleanScreen').style.display = 'flex';
      document.getElementById('result').style.display = 'flex';
      document.getElementById('textRoute').style.display = 'flex';
      document.getElementById('text').style.display = 'flex';
      document.getElementById('panel').style.display = 'flex';
      document.getElementById('routePanel').style.display = 'flex';
      document.getElementById('coordinate').style.display = 'flex';
      document.getElementById('anySearchPanel').style.display = 'flex';
}
