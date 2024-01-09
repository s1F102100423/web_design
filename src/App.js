import React, { useState, useEffect } from 'react';

const textlist = [
  "<span>サイト全体について</span><br />このサイトは、2023年11月4日～5日に行われた赤羽台祭にて公演が行われた「ほしをさがして」の特設サイトです。公演の情報や内容を告知・紹介するために、サークル員がUIデザインをし、実装面を私が担当しました。",
  "<span>バナーについて</span><br />知りたい情報にアクセスしやすくするために、CSSを使用しバナーを最上部に固定しました。文字を押すと各項目の最上部、ロゴを押すとページ全体の最上部に移動します。自然な動きにするために、クリック後の自動スクロールをJSで制御しています。",
  "<span>カードについて</span><br />物語ではカードが鍵となるため、キャストのキャラクターがカードの中に描かれていますが、より世界観を演出するため、CSSのanimationを使用しカードを回転させています。"
];

const Component1 = ({ changetext }) => (
  <div>
    <div className="container">
      <div className="row" id="title">
        <img id="top" className="col-2" src="./img/TitleLogo.png" alt="Title Logo" />
        <h1 className="col-6 titleName">特設サイト紹介</h1>
        <p className="col-3 name">1F10210042 小貫 愛未加</p>
      </div>
      <div className="row" id="detail">
        <div className="col-5">
          <img title='サイト全体について' className="col-4 icon" id="icon0" onClick={() => changetext(0)} src="./img/TitleLogo.png" style={{ backgroundColor: 'gray' }} alt="Icon 0" />
          <img title='バナーについて' className="col-3 icon" id="icon1" onClick={() => changetext(1)} src="./img/Ribon.png" alt="Icon 1" />
          <img title='カードについて' className="col-4 icon" id="icon2" onClick={() => changetext(2)} src="./img/Cancer.png" alt="Icon 2" />
          <p id="text"><span>サイト全体について</span><br />このサイトは、2023年11月4日～5日に行われた赤羽台祭にて公演が行われた「ほしをさがして」の特設サイトです。情報をわかりやすく伝えるため、1ページに全てまとめています。</p>
          <div>
          <p className='lang'>開発環境：Node.js, GitHub</p>
        <p className='lang'>開発言語：HTML, CSS(bootstrap), JavaScript(jQuery)</p>
          </div>
        </div>
        <div className="col-6">
          <iframe title="star" src="https://iniactors.github.io/star-2023/" />
          <p>実際のサイトは<a href="https://iniactors.github.io/star-2023/" target="_blank" rel="noopener noreferrer">こちら</a></p>
        </div>
      </div>
    </div>
  </div>
);

const Component2 = ({ changetext }) => (
  <div>
     <div className="container-fluid">
      <div className="row" id="title">
        <img id="top" className="col-4" src="./img/TitleLogo.png" alt="Title Logo" />
        <h1 className="col-7 titleName">特設サイト紹介</h1>
        <p className="name">1F10210042 小貫 愛未加</p>
      </div>
      <div className="container-fluid">
        <div className="row">
          <iframe className="col" id="star" src="https://iniactors.github.io/star-2023/"></iframe>
        </div>
      </div>
      <p>実際のサイトは<a href="https://iniactors.github.io/star-2023/" target="_blank" rel="noopener noreferrer">こちら</a></p>
      <div className="row" id="detail">
        <img title='サイト全体について' className="col-4 icon" id="icon0" src="./img/TitleLogo.png" style={{ backgroundColor: 'gray' }} alt="Icon 0" onClick={() => changetext(0)} />
        <img title='バナーについて' className="col-3 icon" id="icon1" src="./img/Ribon.png" alt="Icon 1" onClick={() => changetext(1)} />
        <img title='カードについて' className="col-4 icon" id="icon2" src="./img/Cancer.png" alt="Icon 2" onClick={() => changetext(2)} />
        <p id="text"><span>サイト全体について</span><br />このサイトは、2023年11月4日～5日に行われた赤羽台祭にて公演が行われた「ほしをさがして」の特設サイトです。情報をわかりやすく伝えるため、1ページに全てまとめています。</p>
        <p className='lang'>開発環境：Node.js, GitHub</p>
        <p className='lang'>開発言語：HTML, CSS(bootstrap), JavaScript(jQuery)</p>
      </div>
    </div>
  </div>
);

const App = () => {

  const [now, setNow] = useState(0);

  const changetext = (num) => {
    if (now === num) {
      console.log("same");
      return;
    }

    for (let n = 0; n <= 2; n++) {
      document.getElementById("icon" + n).removeAttribute('onclick');
    }

    document.getElementById("icon" + now).classList.add("fadeOut");
    document.getElementById("text").classList.add("fadeDown");

    setNow(num);

    window.setTimeout(goAnimation, 1000, num);
    window.setTimeout(cleanClass, 2000);
  };

  const goAnimation = (n) => {
    document.getElementById("text").innerHTML = textlist[n];
    document.getElementById("text").classList.remove("fadeDown");
    document.getElementById("text").classList.add("fadeUp");
    document.getElementById("icon" + n).classList.add("fadeIn");
  };

  const cleanClass = () => {
    for (let n = 0; n <= 2; n++) {
      const i = document.getElementById("icon" + n);

      if (i.classList.contains("fadeIn")) {
        i.classList.remove("fadeIn");
        i.style = "background-color:gray;";
      }

      if (i.classList.contains("fadeOut")) {
        i.classList.remove("fadeOut");
        i.style.backgroundColor = "";
      }

      i.setAttribute('onclick', () => changetext(n));
      document.getElementById("text").classList.remove("fadeUp");
    }
  };

  const [isConditionMet, setIsConditionMet] = useState(window.innerWidth > 800);

  useEffect(() => {
    const handleResize = () => {
      setIsConditionMet(window.innerWidth > 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isConditionMet ? <Component1 changetext={changetext} /> : <Component2 changetext={changetext} />}
    </div>
  );
};

export default App;