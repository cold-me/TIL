# useState

## 주요개념

-   상태함수가 **작동하면 상태값이 변하고 컴포넌트가 리렌더링되어 자동으로 UI에 변경된 값이 반영**된다.
-   상태함수는 **비동기적으로 처리**되므로 바뀌는데 시간이 걸린다.
    -   일반함수 실행 완료후, 모아둔 상태 함수들은 한꺼번에 실행한다.
-   일반변수는 리렌더링될때마다 초기화된다.
    > 웬만한거에는 다 useState 쓸거고, 잠깐 기억하는 값에만 일반변수 쓴다!

<br>

## App 컴포넌트 작동순서

1. 유저가 버튼을 클릭한다.
2. increase 함수 호출 및 실행

-   `counter`는 1이 된다.
-   `setCounter2` 상태 함수 호출
-   `console.log` 실행(출력값 : counter: 1 counter2: 0 - 상태값은 아직 안변했기 때문에 0)
-   `increase` 함수 종료

3. 상태 업데이트 비동기 처리

-   `setCounter2` 상태 함수 실행 : counter2의 상태값이 1로 변경된다.

4. App 컴포넌트가 다시 리렌더링 (setState가 비동기적으로 실행되면 컴포넌트 리렌더링)

-   `let counter = 0` 이 다시 초기화되면서 `counter`는 0이 됨.
-   `counter2` 값은 업데이트되어 화면에 반영되고, 변경된 상태값이 보인다.

<br>

## App 컴포넌트에 상태 변수가 있을 경우와 없을 경우 결과차이

-   상태변수가 없는 경우 : 콘솔에서 변하는 값을 확인할 수 있지만 UI는 반영되지 않는다. (`document.getElementById('root').innerText()`를 해야만 UI에 값이 반영됨)
-   상태변수가 있는경우 : 상태를 바꾸기 위해 리렌더링이 일어나므로, 일반 변수는 초기화되고 상태는 업데이트 된다.
    -   출력값: counter : 1, counter2 : 0, ... counter : 1, counter2: 10 출력
    -   버튼 클릭시(첫 번째) : "counter2:"는 초기값(바뀌기전값)인 "0"이 찍힌다. (콘솔함수 출력후 `setCounter2`가 실행되어 counter2값은 1으로 변경됨), "counter:"는 계속 "1"로 찍힌다. 왜냐하면, `setCounter2`가 실행되었기 때문에 컴포넌트가 리렌더 되는데, 일반변수는 초기화 되기 때문이다.
    -   버튼 클릭시(두 번째) : "counter2:"는 이전 변경값인 "1"이 찍힌다. (콘솔함수 출력후 `setCounter2`가 실행되어 counter2값은 2로 변경됨), "counter:"는 계속 "1"로 찍힌다. (동일 이유)

```javascript
function App() {
    let counter = 0;
    const [counter2, `setCounter2`] = useState(0);
    const increase = () => {
        counter += 1;
        `setCounter2`(counter2 + 1);
        console.log('counter:', counter, 'counter2:', counter2);
    };
    return (
        <>
            <div>
                <div>{counter}</div>
                <div>{counter2}</div>
                <button onClick={increase}>click!</button>
            </div>
            <div>
                <Box name='Jenny' num={1} />
                <Box name='Rose' num={2} />
            </div>
        </>
    );
}

export default App;
```
