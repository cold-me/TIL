# useEffect

## 주요개념

```javascript
useEffect(() => {
  // 콜백 함수 내용
  return () => {
    // 클린업 함수 내용
  };
}, [의존성 배열]);
```

-   `useEffect` : 컴포넌트의 생명주기(마운트, 업데이트, 언마운트)에 맞춰 특정 작업을 수행할 수 있도록 해주는 훅으로 **렌더링 이후 실행**된다.
-   `useEffect`의 2가지 인수 :

    -   콜백 함수 : 실행할 코드
    -   의존성 배열 : 실행 조건 결정

-   동작흐름

    > -   마운트 : 컴포넌트가 처음으로 화면에 나타나는 순간 (첫렌더링)
    > -   업데이트 : 상태 변경 등으로 컴포넌트가 다시 렌더링되는 것
    > -   언마운트 : 컴포넌트가 화면에서 사라지는 순간(마지막 렌더링 후 제거)

    1. 마운트 시 → 한 번 실행 ([] 빈 배열이면 한 번만 실행)
    2. 의존성 배열 값 변경 시 → 실행 (배열 내 여러개의 값이 바뀌어도 한번만 실행)
    3. 언마운트 시 → 클린업 함수 실행 (return 내부 함수)

-   `의존성 배열`에 따른 동작
    -   `[]` (빈 배열): 마운트될 때 한 번 실행
    -   `[변수1, 변수2]`: 배열 안 변수 값이 변경될 때마다 실행 (여러 개 변경되어도 한 번만 실행)
    -   `의존성 배열 없음`: 컴포넌트가 리렌더링될 때마다 실행
-   클린업 함수(`return`) : 언마운트시 실행

## 예시코드

-   마운트
    -   첫 렌더링 되어 "~~ Render ~~"가 실행되고, 이어서 useEffect 초기 실행으로 "App start!", "Update!"가 출력된다.
    -   초기값이 `true`인 showTimer때문에 `<Timer/>` 컴포넌트가 마운트된다.
-   [증가] 버튼 클릭시
    -   `handleClick` 함수가 실행되고 `setCount`, `setValue` 함수가 호출된다.
    -   리렌더링되어 "~~Render~~" 출력되고 화면에는 1씩 증가한 `count`와 `value`값이 표출된다.
    -   `count`, `value`가 변경되었으므로 이 둘이 들어간 의존성 배열의 `useEffect`가 업데이트 되면서 "Update!"가 1회 출력된다.
-   타이머 동작
    -   마운트한 `<Timer/>`의 useEffect의 콜백 함수인 `setInterVal()` 때문에 1초마다 "count 실행"이 출력된다.
    -   [타이머 보이기] 버튼클릭시 showTimer가 `false`가 되어 `<Timer/>` 컴포넌트는 언마운트된다.
    -   언마운트되면서 클린업 함수가 실행되어 "타이머 정리"가 출력되고, `clearInterval(intereval)`되어 타이머가 정리된다.

```javascript
function App() {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(1);
    const [showTimer, setShowTimer] = useState(true);

    const handleClick = () => {
        setCount((prev) => prev + 1);
        setValue((prev) => prev + 1);
    };

    useEffect(() => {
        console.log('App start!');
    }, []);

    // 배열에 있는 여러개의 값이 바뀌어도 한번만 호출된다.
    useEffect(() => {
        console.log('Update!');
    }, [count, value]);

    return (
        <>
            <div>
                {console.log('~~Render~~')}
                <h1> count : {count}</h1>
                <h1> value : {value}</h1>
                <button onClick={handleClick}>증가</button>
                <button onClick={() => setShowTimer((prev) => !prev)}>타이머 보이기</button>
                {showTimer && <Timer />}
            </div>
        </>
    );
}

export default App;


// Timer.js
import React, { useEffect } from 'react';

const Timer = () => {
    useEffect(() => {
        const intereval = setInterval(() => {
            console.log('count 실행');
        }, 1000);
        return () => {
            console.log('타이머 정리');
            clearInterval(intereval);
        };
    }, []);

    return <div>Timer</div>;
};

export default Timer;

```
