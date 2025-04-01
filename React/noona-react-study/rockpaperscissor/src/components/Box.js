import React from 'react';

const Box = ({ title, item, result }) => {
    const colors = { tie: 'green-border', win: 'red-border', lose: 'blue-border', default: 'black-border' };
    const resultImg = {
        win: 'https://static.vecteezy.com/system/resources/previews/013/836/471/non_2x/comic-lettering-win-comic-speech-bubble-with-emotional-text-win-bright-dynamic-cartoon-illustration-in-retro-pop-art-style-comic-text-sound-effects-png.png',
        lose: 'https://thumb.ac-illust.com/3b/3be13ba99a48685ffb5ea17dd139a7cd_t.jpeg',
        tie: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHtvheHdPEh449e4k26Z4xl1Z1VGmmi7OMPw&s',
        default: 'https://롤스타.cc/wp-content/uploads/2024/08/%EB%A1%A4-%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg',
    };
    return (
        <div className={`box ${colors[result] || colors['default']}`}>
            <h1>{title}</h1>
            <img className='item-img' src={(item && item.img) || resultImg['default']} alt='choice-img' />
            <h2>{result}</h2>
            {result && resultImg[result] && (
                <img className='result-img' src={result && resultImg[result]} alt='result-img' />
            )}
        </div>
    );
};
export default Box;
