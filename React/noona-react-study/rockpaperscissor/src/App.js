import { useState } from 'react';
import './App.css';
import Box from './components/Box';
// 1. 박스 2개 생성(타이틀, 사진, 결과)
// 2. 가위 버위 보 버튼이 있다.
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3, 4의 결과를 가지고 누가 이겼는데 승패를 따진다.
// 6. 승패 결과에 따라 테두리 색이바뀐다. (이기면-초록, 지면-빨강, 비기면 -검은색)

const choice = {
    rock: {
        name: 'rock',
        img: 'https://thumb.photo-ac.com/f5/f51c9569e9602dad2dc73231ac21fd5e_t.jpeg',
    },
    scissors: {
        name: 'scissors',
        img: 'https://thumb.photo-ac.com/e1/e197a21223ddf0a1e3a56d5594d8605d_t.jpeg',
    },
    paper: {
        name: 'paper',
        img: 'https://cdn.news.hidoc.co.kr/news/photo/202003/21704_51651_0750.jpg',
    },
};
function App() {
    const [userSelect, setUserSelect] = useState(null);
    const [computerSelect, setComputerSelect] = useState(null);
    const [userResult, setUserResult] = useState('');
    const [computerResult, setComputerResult] = useState('');
    const [history, setHistory] = useState([0, 0, 0, 0]);
    const historyArray = ['You Win:', 'Computer Win:', 'Tie:', 'Total:'];
    const play = (userChoice) => {
        setUserSelect(choice[userChoice]);
        let computerChoice = randomChoice();
        setComputerSelect(computerChoice);
        let result = judgement(userChoice, computerChoice.name);
        setUserResult(result);
        if (result === 'tie') {
            setComputerResult(result);
            setHistory([history[0], history[1], history[2] + 1, history[3] + 1]);
        } else if (result === 'win') {
            setComputerResult('lose');
            setHistory([history[0] + 1, history[1], history[2], history[3] + 1]);
        } else {
            setComputerResult('win');
            setHistory([history[0], history[1] + 1, history[2], history[3] + 1]);
        }
    };
    const randomChoice = () => {
        let itemArray = Object.keys(choice);
        const randomItem = Math.floor(Math.random() * itemArray.length);
        let final = itemArray[randomItem];
        return choice[final];
    };
    const judgement = (user, computer) => {
        console.log(`user, computer : ${user}, ${computer}`);
        if (user === computer) return 'tie';
        else if (user === 'rock') return computer === 'scissors' ? 'win' : 'lose';
        else if (user === 'scissors') return computer === 'rock' ? 'lose' : 'win';
        else return computer === 'rock' ? 'win' : 'lose';
    };
    return (
        <div className='main-vertical'>
            <div>
                <div className='main-horizontal'>
                    <Box title='U' item={userSelect} result={userResult} />
                    <Box title='computer' item={computerSelect} result={computerResult} />
                </div>
            </div>
            <div className='history-box'>
                <div className='main-horizontal'>
                    <button onClick={() => play('scissors')}>가위</button>
                    <button onClick={() => play('rock')}>바위</button>
                    <button onClick={() => play('paper')}>보</button>
                </div>
                <h1>
                    {history.map((item, i) => (
                        <li key={i}>
                            {historyArray[i]} {item}
                        </li>
                    ))}
                </h1>
            </div>
        </div>
    );
}

export default App;
