# Vanilla JS와 React 비교

## 1. Vanilla JS

-   일반변수 : `<script>` 내에서 사용
-   UI 변경방법 : DOM API를 사용하여 직접 UI를 변경해야 한다. 상태 값이 변경되면 UI를 수동으로 업데이트해야 하므로, 여러 곳에서 변수를 사용하는 경우 코드 중복이 발생하고, 관리가 번거롭다.
-   문제점
    -   중복 코드 : UI를 변경하는 코드가 반복된다.
    -   부정확한 UI 업데이트 : 상태 변화가 여러 곳에서 일어날 경우, UI가 일관성 없게 갱신될 수 있다. 예를 들어, count 값이 변경되었을 때 모든 UI 요소를 정확하게 반영하기 위해서는 innerText를 각각 수정해야 한다.

```javascript
  <p id="count1">카운트: 0</p>
  <p id="count2">카운트: 0</p>
  <p id="count3">카운트: 0</p>
  <button onclick="increase()">증가</button>

  <script>
    let count = 0;

    function increase() {
      count += 1;
      // 변수를 사용하는 모든 요소의 UI를(DOM API를 이용하여) 모두 직접 변경해야 한다.
      document.getElementById("count1").innerText = `카운트: ${count}`;
      document.getElementById("count2").innerText = `카운트: ${count}`;
      document.getElementById("count3").innerText = `카운트: ${count}`;
    }
  </script>
```

## 2. React

-   일반변수 : `<script>` 내에서 사용
-   상태변수 : 값 변경시 자동으로 UI가 반영되는 변수
    -   선언방법: `const [count, setCount] = useState(초기값)`
    -   UI 변경 방법 및 장점 : setCount가 호출되면 Virtual DOM이 리렌더링되어 UI가 자동으로 새롭게 업데이트된다. 상태값을 변경하면 UI에 동시에 반영하므로 개발자가 직접 DOM을 수정할 필요가 없다.
        -   코드 중복 없음 : 상태를 관리하기만 하면 되고, UI 변경을 위한 DOM 조작을 직접 할 필요가 없다.
        -   일관된 UI : 상태 값이 여러 곳에서 사용되더라도 React가 상태 변화를 자동으로 UI에 반영한다.

```javascript
// 아래와 같이 UI를 변경하는 경우 직접 DOM 조작을 해야한다. 만약, 여러 DOM 요소에서 동일한 상태 변수를 참조하고 있을 경우, 그 모든 요소를 일일이 갱신해야 한다.(코드 중복 발생) 또한, 일부 요소는 갱신이 빠르게 이루어지고, 다른 요소는 갱신이 누락되거나 늦어지는 경우가 발생할 수 있다.
count += 1;
document.getElementById('count1').innerText = `${count}`;
document.getElementById('count2').innerText = `${count}`;

// 상태변수를 이용하여 관리하는 경우, 값 변경시 자동으로 UI가 갱신된다.
// 즉, UI를 직접 변경하는 DOM 조작 코드의 중복도 없고, UI도 일관되게 반영한다.
import { useState } from 'react';
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>카운트: {count}</p>
            <p>카운트: {count}</p>
            <p>카운트: {count}</p>
            <button onClick={() => setCount(count + 1)}>증가</button>
        </div>
    );
}
```

## 3. 비교

| 구분             | 바닐라 JS                                                                | React                                                            |
| ---------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| **UI 변경 방식** | DOM API를 사용하여 직접 UI를 변경                                        | 상태 변수를 이용하여 UI를 자동으로 업데이트                      |
| **상태 관리**    | 수동으로 관리, 상태 변화 시 UI를 직접 업데이트                           | 상태 변수(useState)를 사용하여 자동으로 UI가 업데이트됨          |
| **코드 중복**    | UI 업데이트 코드가 반복되며, 여러 곳에서 상태를 갱신해야 함              | 상태 변경만으로 UI가 자동으로 업데이트되므로 코드 중복이 없음    |
| **UI 일관성**    | 상태 변화 시 UI가 일관되지 않게 갱신될 수 있음 (수동 갱신으로 인한 실수) | 상태가 변경되면 UI가 자동으로 일관되게 갱신됨                    |
| **문제점**       | 코드 중복, UI 갱신 실수, 유지보수 어려움                                 | 리액트 내부에서 상태 관리만 하면 되므로 직관적이고 유지보수 용이 |

<br>

# 리액트 특징(Virtual DOM과 Diffing 알고리즘)

### 1. Virtual DOM을 이용한 효율적인 렌더링

-   상태 변경시 새로운 가상 DOM을 생성하고, 이를 이전 가상 DOM과 비교(diffing)하여 변경된 부분만 비교하여 찾아 실제 DOM에 반영한다.

### 2. diffing 알고리즘

-   작동방식 : 리액트는 상태 업데이트가 일어나면 새로운 가상 DOM을 생성하고, 이를 이전 가상 DOM과 비교하여 변경된 부분만 찾아 실제 DOM에 반영한다. 이때 직접적인 DOM API 호출은 리액트 내부에서 자동으로 처리되며, 개발자는 상태 업데이트 함수만 호출하면 된다.

-   장점: DOM 조작 횟수를 줄여 성능을 최적화하고, 상태 기반 UI 자동 갱신을 통해 일관된 동작을 보장한다.

### 3. 예시

#### 바닐라 JS

-   innerHTML을 사용하면 전체 요소가 다시 생성되어 성능에 비효율적일 수 있다.

```javascript
// innerHTML : 변경된 것은 'Item3' 한 줄인데, 모든 <li>를 다시 생성한다.
document.getElementById('list').innerHTML = `<li>Item1</li><li>Item2</li><li>Item3</li>`;
```

-   appendChild를 사용하면 추가된 요소만 관리하지만, 여전히 직접 DOM 조작을 관리해야 한다.

```javascript
// appendChild : 직접 DOM 조작 관리해야 한다.
const newItem = document.createElement('li');
newItem.textContent = 'Item 3';
document.getElementById('list').appendChild(newItem);
```

#### React

-   React는 상태 변수를 사용하여 UI를 관리하며, 상태가 변경되면 자동으로 변경된 부분만 리렌더링된다. Virtual DOM의 diffing 알고리즘을 통해 효율적으로 변경된 부분만 업데이트한다.

```javascript
// React : 리액트는 상태 변수를 통해 UI를 자동으로 업데이트하고, diffing 알고리즘을 통해 변경된 부분만 업데이트합니다.
// 이 예시에서 setItems()를 호출하면, 리액트는 상태 변경을 감지하고 가상 DOM을 업데이트한 후, diffing 알고리즘을 통해 변경된 부분만 실제 DOM에 반영한다. 예를 들어, 새로운 <li>가 추가되면, 리액트는 기존 <li> 요소들을 재사용하고, 새로운 <li>만 추가한다.
import { useState } from 'react';

function App() {
    const [items, setItems] = useState(['Item1', 'Item2']);

    const addItem = () => {
        setItems([...items, `Item${items.length + 1}`]);
    };

    return (
        <div>
            <ul>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <button onClick={addItem}>아이템 추가</button>
        </div>
    );
}
```

<br>

# 프로젝트 생성 및 구조확인

-   프로젝트 생성 : `npx create-react-app 프로젝트명`
    -   기본적인 파일구조 및 설정을 자동으로 생성한다.
    -   `rafce` : 컴포넌트 자동생성 단축명령어
-   리액트의 구조

    -   리액트에서 html 파일은 단 하나 존재한다 : public/index.html

        -   즉, SPA(Single Page Application)로 동작한다. 페이지가 새로 고침되지 않고 JavaScript 코드가 동적으로 UI를 업데이트하기 때문에 웹사이트가 마치 모바일 앱처럼 작동한다.

    -   public 폴더: 웹어플리케이션에서 어떤 경로든 접근할수 있는 정적파일을 보관하는 장소이다. 따라서, index.js에서 public 폴더 내의 index.html에 접근할 수 있다.

-   파일구조
    -   index.html : `<div id="root"></div>`라는 root div가 존재한다. (앞으로 이 root div안에 모든 리액트 컴포넌트가 삽입된다.)
    -   index.js : `const root = document.getElementById("root")` 해서 root div을 얻는다. 그리고 이 root에 **컴포넌트나 태그들**을 렌더링한다.(`ReactDOM.render()`: 렌더링할 수 있도록 리액트 함수를 사용한다.)
