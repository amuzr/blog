---
layout: post
title: '자바스크립트 클린코드'
date: '2019-08-28 21:20:12 +0900'
tags: ['code', 'javascript', 'clean code']
draft: false
---

# 들어가며

프로그램을 짜다 보면, 코드를 쓰는 시간보다 코드를 읽는 시간이 훨씬 더 많다. 우리 개발자들에게 체크아웃해 코드를 꺼낼 때보다 체크인해서 코드를 넣을 때 더 깨끗한 상태로 만들어야 할 의무가 있다.

이 글은 단순히 스타일 가이드가 아니라 자바스크립트(JavaScript)로 코드를 작성할 때 자기도 만족스럽고 남도 만족스럽도록 깨끗한 코드를 작성하는 방법을 소개한다. 평상시에 놓치기 쉽고 실수하기 쉬운 여러가지 패턴을 실제 예를 들면서 소개하려고 한다. 이 글에서 소개하는 원칙들을 알게된다해서 당장 더 나은 개발자가 되는 것은 아니며 코드를 작성할 때 실수를 하지 않게 해주는 것은 아니다. 하지만 팀원들과 같이 코드를 리뷰하며 점점 완벽하게 만들어가야 한다.

자바스크립트를 1~2년간 사용해봤던 웹개발자를 대상으로 작성하였다. 변수의 선언부터 함수의 작성방법, 동시성까지 짧지만 자바스크립트 개발자라면 필수로 알아야 될 내용을 담았다.
대부분 ES5 기준에 맞추어 작성하였으나 더 나은 예제를 보여주기 위하여 일부 ES6 문법도 사용하였다. 최근 Babel 등 여러 라이브러리들이 ES6 변환을 지원 하고 있다.

# 변수 이름 짓기와 위치 잡기

변수를 선언할 때 어떤 이름을 지을 지 어떤 곳에 위치하게 할지 중요하다. 자바스크립트에서의 변수는 일급객체이기 때문에 함수의 선언도 같이 알아본다.

## 의미 있는 이름

소프트웨어에서 이름은 어디나 쓰인다. 코드를 작성하면서 길게 고민하는 시간 중에 하나는 이름을 정하는 시간이다. 이름을 잘 짓는 간단한 규칙을 몇 가지 소개한다.

- 의도를 분명히 밝혀라

  변수나 함수 그리고 클래스 이름은 존재 이유와 수행 기능, 사용방법에 대해 모두 답해야 한다. 따로 주석이 필요하다면 의도를 분명히 드러내지 못한 것이다.

  ```javascript
  const yyyymmdstr = moment().format(‘YYYY/MM/DD’);

  // 이름 yyyymmdstr 은 아무 의미도 갖지 않는다.
  const currentDate = moment().format(‘YYYY/MM/DD’);
  ```

- 의미있게 구분하라

  product라는 객체가 있다고 가정하자. 다른 객체를 productInfo 혹은 productData 라고 부른다면 개념을 구분하지 않은 채 이름만 달리한 경우가 된다. info나 data는 의미가 불분명한 불용어다.
  불용어는 중복이다.

  ```javascript
  getUserInfo();
  getClientData();
  getCustomerRecord();

  // 명확한 관례가 없다면 읽는 사람이 차이를 알도록 이름을 지어라.
  getUser();
  ```

- 검색하기 쉬운 이름을 사용하라

  문자 하나를 사용하는 이름과 상수는 텍스트 코드에서 쉽게 눈에 띄지 않는다는 문제점이 있다. 우리는 작성할 코드보다 읽을 코드가 더 많기 때문에 코드를 읽기 쉽고 검색 가능하게 작성해야 한다. buddy.js 그리고 ESLint 와 같은 도구들이 이름이 정해져 있지 않은 상수들을 발견하고 고칠 수 있게 도와줄 수 있을 것이다.

  ```javascript
  // 대체 86400000은 무엇을 의미하는 걸까?
  setTimeout(blastoff, 86400000);

  // 대문자로 `const` 전역 변수를 선언하라.
  const MILLISECONDS_IN_A_DAY = 86400000;
  setTimeout(blastoff, MILLISECONDS_IN_A_DAY);
  ```

- 자신의 기억력을 자랑하지 마라

  코드를 읽으면서 변수 이름을 자신이 아는 이름으로 변환해야 한다면 그 변수 이름은 바람직하지 못하다. 루프에서 반복 횟수를 세는 변수 i, j, k는 괜찮다. 단, 루프 범위가 아주 작고 다른 이름과 충돌하지 않을 때만 괜찮다.

  ```javascript
  const locations = ['서울', '인천', '수원'];
  locations.forEach(l => {
    doStuff();
    doSomeOtherStuff();
    // ...
    // 잠깐, `l`은 뭘까?
    dispatch(l);
  });

  // 명시적인 것이 암시적인 것보다 좋다.
  const locations = ['서울', '인천', '수원'];
  locations.forEach(location => {
    doStuff();
    doSomeOtherStuff();
    // ...
    dispatch(location);
  });
  ```

- 의미있는 맥락을 추가하고 불필요한 맥락을 없애라

  스스로 의미가 분명한 이름이 없지 않다. 하지만 대다수 이름은 그렇지 못하다. 그래서 객체, 함수, 이름 공간에 넣어 맥락을 부여한다. 모든 방법이 실패하면 마지막 수단으로 접두어를 붙인다.

  ```javascript
  const Car = {
    carMake: 'BMW',
    carModel: 'M3',
    carColor: '파란색',
  };

  function paintCar(car) {
    car.carColor = '빨간색';
  }

  // 문맥상 필요없는 것들을 쓰지 마라.
  const Car = {
    make: 'BMW',
    model: 'M3',
    color: '파란색',
  };

  function paintCar(car) {
    car.color = '빨간색';
  }
  ```

## 적합한 위치

자바스크립트에서는 프로토타입체인 의 개념이 있어서 스코프 에 대해 잘 알고 사용해야 한다. 다른 라이브러리들과의 충돌이 일어날 수 있고 의도하지 않은 곳에서 부수효과 가 발생할 수 있다. 어떤 위치에 어떻게 선언하는지 다양한 예시로 알아보자.

- 변수를 선언 할 때는 꼭 타입을 작성하라

  ```javascript
  superpower = new SuperPower();

  // var 를 사용하지 않으면 전역 변수로 선언된다.
  var superpower = new SuperPower();
  ```

- 하나의 변수선언에 대해 하나의 타입만 작성하라

  이 방법의 경우 간단히 새 변수를 추가하는게 가능하다. 또한 , 를 ; 로 바꿔버리는 것에 대해 걱정할 필요가 없다. 정의되지 않은 변수를 마지막으로 선언하는 것은 이미 할당된 변수 중 하나를 지정해야하는 경우에 유용하다.

  ```javascript
  var items = idx,
    length,
    getItems(),
    goSportsTeam = true,
    dragonball = 'z';

  var items = getItems();
  var goSportsTeam = true;
  var dragonball = 'z';
  var idx, length;

  ```

- 변수의 할당은 스코프의 시작 부분에서 하라

  변수를 할당할때는 필요하고 합리적인 장소에 두자.

  ```javascript
  // 필요없는 함수 호출
  function (hasName) {
    const name = getName();

    if (!hasName) {
      return false;
    }

    this.setFirstName(name);

    return true;
  }

  // good
  function (hasName) {
    if (!hasName) {
      return false;
    }

    const name = getName();
    this.setFirstName(name);

    return true;
  }
  ```

- 함수 선언을 사용하라

  - 익명함수는 호이스팅 될 수 없다

    var 선언은 할당이 없이 스코프의 선두에 호이스팅된다.

    ```javascript
    // (notDefined 가 글로벌변수에 존재하지 않는다고 판정한 경우.)
    // 잘 동작하지 않는다.
    function example() {
      console.log(notDefined); // => throws a ReferenceError
    }

    // 그 변수를 참조하는 코드의 뒤에서 그 변수를 선언한 경우
    // 변수가 호이스팅된 상태에서 동작한다.
    // 주의：`true` 라는 값 자체는 호이스팅되지 않는다.
    function example() {
      console.log(declaredButNotAssigned); // => undefined
      var declaredButNotAssigned = true;
    }

    // 인터프리터는 변수선언을 스코프의 선두에 호이스팅한다.
    // 위의 예는 다음과 같이 다시 쓸 수 있다.
    function example() {
      var declaredButNotAssigned;
      console.log(declaredButNotAssigned); // => undefined
      declaredButNotAssigned = true;
    }

    // using const and let
    // const 와 let 을 이용한 경우
    function example() {
      console.log(declaredButNotAssigned); // => throws a ReferenceError
      console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
      const declaredButNotAssigned = true;
    }
    ```

  - 명명 된 함수도 호이스팅될 수 없다

    ```javascript
    function example() {
      console.log(named); // => undefined
      named(); // => TypeError named is not a function

      superPower(); // => ReferenceError superPower is not defined

      var named = function superPower() {
        console.log('Flying');
      };
    }

    // 함수명과 변수명이 같은 경우도 같은 현상이 발생한다.
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      var named = function named() {
        console.log('named');
      };
    }
    ```

    함수선언은 함수명과 함수본체가 호이스팅된다.

  ```javascript
  function example() {
    superPower(); // => Flying

    function superPower() {
      console.log('Flying');
    }
  }
  ```

# 함수와 클래스 언제 어떻게 사용할까

자바스크립트는 ES6로 올라가면서 다른 객체지향 언어들처럼 클래스를 지원한다. 함수와 클래스는 언제 어떻게 사용하는지 알아보자.

## 함수 작성하기

효율적인 함수 작성법을 알아보자.

- 작게 만들어라!

  함수를 만드는 첫째 규칙은 ‘작게!’다. 함수를 만드는 둘째 규칙은 ‘더 작게!’다. 이 규칙은 근거를 대기가 곤란하다. 함수가 작을수록 더 좋다는 증거나 자료는 없지만 작은 함수가 좋다.

  - 블록과 들여쓰기

  If 문/else 문/while 문 등에 들어가는 블록은 한 줄이어야 한다. 대게 거기서 함수를 호출한다. 그러면 바깥을 감싸는 함수가 작아질 뿐 아니라, 블록 안에서 호출하는 함수 이름을 적절히 짓는다면, 코드를 이해하기도 쉬워진다.

- 하나의 행동만 해라!

  이것은 소프트웨어 엔지니어링에서 가장 중요한 규칙이다. 함수가 1개 이상의 행동을 한다면 작성하는 것도, 테스트하는 것도, 이해하는 것도 어려워진다.

  ```javascript
  function emailClients(clients) {
    clients.forEach(client => {
      const clientRecord = database.lookup(client);
      if (clientRecord.isActive()) {
        email(client);
      }
    });
  }

  // 좀 더 고치기 쉬워지고 읽기 쉬워진다.
  function emailClients(clients) {
    clients.filter(isClientActive).forEach(email);
  }

  function isClientActive(client) {
    const clientRecord = database.lookup(client);
    return clientRecord.isActive();
  }
  ```

- 함수당 추상화 수준은 하나로!

  추상화된 이름이 여러 의미를 내포하고 있다면 그 함수는 너무 많은 일을 하게끔 설계된 것이다. 함수들을 나누어서 재사용 가능하고 테스트하기 쉽게 만들어라.
  코드는 위에서 아래로 이야기처럼 읽혀야 좋다.

  ```javascript
  function parseBetterJSAlternative(code) {
    const REGEXES = [
      // ...
    ];

    const statements = code.split(' ');
    const tokens = [];
    REGEXES.forEach(REGEX => {
      statements.forEach(statement => {
        // ...
      });
    });

    const ast = [];
    tokens.forEach(token => {
      // lex...
    });

    ast.forEach(node => {
      // parse...
    });
  }

  // 단일행동을 추상화 해야 한다.
  function tokenize(code) {
    const REGEXES = [
      // ...
    ];

    const statements = code.split(' ');
    const tokens = [];
    REGEXES.forEach(REGEX => {
      statements.forEach(statement => {
        tokens.push(/* ... */);
      });
    });

    return tokens;
  }

  function lexer(tokens) {
    const ast = [];
    tokens.forEach(token => {
      ast.push(/* ... */);
    });

    return ast;
  }

  function parseBetterJSAlternative(code) {
    const tokens = tokenize(code);
    const ast = lexer(tokens);
    ast.forEach(node => {
      // parse...
    });
  }
  ```

- 함수가 무엇을 하는지 알 수 있는 이름을 사용하라!

  서술적인 이름을 사용하라. 좋은 이름이 주는 가치는 아무리 강조해도 지나치지 않다. 이름이 길어도 괜찮다. 길고 서술적인 이름이 짧고 어려운 이름보다 좋다.
  이름을 붙일 때는 일관성이 있어야 한다. 모듈 내에서 함수 이름은 같은 문구, 명사, 동사를 사용한다.

  ```javascript
  includeSetupAndTeardownPages();
  includeSetupPages();
  includeSetupPage();
  ```

- 추상화 함수를 만들어 중복을 제거하라!

  중복된 코드를 작성하지 않기 위해 최선을 다해라. 중복된 코드가 있다는 것은 어떤 로직을 수정해야 할 일이 생겼을 때 수정해야 할 코드가 한 곳 이상이라는 것을 뜻한다.
  즉 중복 코드를 제거한다는 것은 하나의 함수 혹은 클래스를 사용하여 이 여러 가지 사소한 차이점을 처리할 수 있는 추상화를 만드는 것을 의미한다.

  ```javascript
  function showDeveloperList(developers) {
    developers.forEach(developers => {
      const expectedSalary = developer.calculateExpectedSalary();
      const experience = developer.getExperience();
      const githubLink = developer.getGithubLink();
      const data = {
        expectedSalary,
        experience,
        githubLink,
      };

      render(data);
    });
  }

  function showManagerList(managers) {
    managers.forEach(manager => {
      const expectedSalary = manager.calculateExpectedSalary();
      const experience = manager.getExperience();
      const portfolio = manager.getMBAProjects();
      const data = {
        expectedSalary,
        experience,
        portfolio,
      };

      render(data);
    });
  }

  // 중복된 코드는 제거한다.
  function showEmployeeList(employees) {
    employees.forEach(employee => {
      const expectedSalary = employee.calculateExpectedSalary();
      const experience = employee.getExperience();

      let portfolio = employee.getGithubLink();

      if (employee.type === 'manager') {
        portfolio = employee.getMBAProjects();
      }

      const data = {
        expectedSalary,
        experience,
        portfolio,
      };

      render(data);
    });
  }
  ```

- 함수의 매개변수로 플래그 를 사용하지 마라

  플래그를 사용하는 것 자체가 그 함수가 한가지 이상의 역할을 하고 있다는 것을 뜻한다.

  ```javascript
  function createFile(name, temp) {
    if (temp) {
      fs.create(`./temp/${name}`);
    } else {
      fs.create(name);
    }
  }

  // Boolean 기반으로 함수가 실행되는 코드가 나뉜다면 함수를 분리하라
  function createFile(name) {
    fs.create(name);
  }

  function createTempFile(name) {
    createFile(`./temp/${name}`);
  }
  ```

- 부수효과를 피해라

  함수는 값을 받아서 어떤 일을 하거나 값을 반환할 때 부수효과를 만들어낸다. 부수효과는 함수로 넘어온 인수나 시스템 전역 변수를 수정하기도 한다.

  때때로 프로그램에서 부수효과를 만들어야 할 때가 있지만 그 때 해야 할 일은 한 개의 함수를 만드는 일이다. 즉, 어떠한 구조체도 없이 객체 사이의 상태를 공유하거나, 무엇이든 쓸 수 있는 변경 가능한 데이터 유형을 사용하거나, 같은 부수효과를 만들어내는 것을 여러 개 만들거나 하면 안된다.

  전역 환경을 사용하는 것은 JavaScript에서 나쁜 관행이다. 다른 라이브러리들과의 충돌이 일어날 수 있고, 당신의 API를 쓰는 유저들은 운영환경에서 예외가 발생하기 전까지는 문제를 인지하지 못할 것이기 때문이다.

  ```javascript
  let name = 'Ryan McDermott';

  function splitIntoFirstAndLastName() {
    name = name.split(' ');
  }

  splitIntoFirstAndLastName();

  console.log(name); // ['Ryan', 'McDermott'];

  // 전역 변수를 사용하는 다른 함수가 있다고 생각하고 구분해주어야 한다.
  function splitIntoFirstAndLastName(name) {
    return name.split(' ');
  }

  const name = 'Ryan McDermott';
  const newName = splitIntoFirstAndLastName(name);

  console.log(name); // 'Ryan McDermott';
  console.log(newName); // ['Ryan', 'McDermott'];
  ```

- 명령형 프로그래밍보다 함수형 프로그래밍을 지향하라

  JavaScript는 Haskell 처럼 함수형 프로그래밍 언어는 아니지만 함수형 프로그래밍처럼 작성할 수 있다. 함수형 언어는 더 깔끔하고 테스트하기 쉽다. 가능하면 이 방식을 사용하도록 하자.
  ES5 에서도 lodash.js 나 underscore.js 를 이용해 함수형 프로그래밍을 할 수 있다.

  ```javascript
  const programmerOutput = [
    {
      name: 'Uncle Bobby',
      linesOfCode: 500,
    },
    {
      name: 'Suzie Q',
      linesOfCode: 1500,
    },
    {
      name: 'Jimmy Gosling',
      linesOfCode: 150,
    },
    {
      name: 'Gracie Hopper',
      linesOfCode: 1000,
    },
  ];

  let totalOutput = 0;

  for (let i = 0; i < programmerOutput.length; i++) {
    totalOutput += programmerOutput[i].linesOfCode;
  }

  // 더 간결하고 어떤 행동을 하는지 알기 쉽다.
  const totalOutput = programmerOutput
    .map(programmer => programmer.linesOfCode)
    .reduce((acc, linesOfCode) => acc + linesOfCode, INITIAL_VALUE);
  ```

## 보기 쉬운 클래스 사용하기

객체지향에 익숙해져 있는 대부분의 개발자들은 함수보다 클래스가 보기 쉽고 이해하기 쉬울 것이다. 클래스와 함수를 어떻게 구별하고 사용하는지 알아보자.

- ES5의 함수보다 ES6의 클래스를 사용하라

  ES5의 함수에서 이해하기 쉬운 상속 및 메소드 정의를 하는 것은 매우 어렵다. 매번 그런 것은 아니지만 상속이 필요한 경우라면 클래스를 사용하는 것이 좋다. 하지만 크고 복잡한 객체가 필요한 경우가 아니라면 클래스보다 작은 함수를 사용하라.

  ```javascript
  const Animal = function(age) {
    if (!(this instanceof Animal)) {
      throw new Error('Instantiate Animal with `new`');
    }

    this.age = age;
  };

  Animal.prototype.move = function() {};

  const Mammal = function(age, furColor) {
    if (!(this instanceof Mammal)) {
      throw new Error('Instantiate Mammal with `new`');
    }

    Animal.call(this, age);
    this.furColor = furColor;
  };

  Mammal.prototype = Object.create(Animal.prototype);
  Mammal.prototype.constructor = Mammal;
  Mammal.prototype.liveBirth = function liveBirth() {};

  // ES6 클래스
  class Animal {
    constructor(age) {
      this.age = age;
    }

    move() {
      /* ... */
    }
  }

  class Mammal extends Animal {
    constructor(age, furColor) {
      super(age);
      this.furColor = furColor;
    }

    liveBirth() {
      /* ... */
    }
  }
  ```

- 단일 책임 원칙 (Single Responsibility Principle, SRP)

  클린코드 에서 말하길 “클래스를 수정 할 때는 수정 해야 하는 이유가 2개 이상 있으면 안된다”. 이것은 하나의 클래스에 많은 기능을 쑤셔넣는 것이나 다름 없다. 이 문제는 클래스가 개념적으로 응집되어 있지 않다는 것이고, 클래스를 바꿔야 할 이유가 된다. 클래스를 수정하는데 들이는 시간을 줄이는 것은 중요하다. 왜냐하면 하나의 클래스에 너무 많은 기능들이 있고 당신이 이 작은 기능들을 수정할 때 이 코드가 다른 모듈들에 어떤 영향을 끼치는지 이해하기 어려울 수 있기 때문이다.

  ```javascript
  class UserSettings {
    constructor(user) {
      this.user = user;
    }

    changeSettings(settings) {
      if (this.verifyCredentials()) {
        // ...
      }
    }

    verifyCredentials() {
      // ...
    }
  }

  // 응집도가 높고 결합도는 낮아야 한다
  class UserAuth {
    constructor(user) {
      this.user = user;
    }

    verifyCredentials() {
      // ...
    }
  }

  class UserSettings {
    constructor(user) {
      this.user = user;
      this.auth = new UserAuth(user);
    }

    changeSettings(settings) {
      if (this.auth.verifyCredentials()) {
        // ...
      }
    }
  }
  ```

- 개방/폐쇄 원칙 (Open/Closed Principle, OCP)

  소프트웨어 개체(클래스,모듈,함수 등)은 확장에는 열려있어야 하며 수정에는 닫혀있어야 한다. 이것의 의미는 기본적으로 사용자가 .js 소스 코드 파일을 열어 수동으로 조작하지 않고도 모듈의 기능을 확장하도록 허용해야 한다는 것이다.

  ```javascript
  class AjaxAdapter extends Adapter {
    constructor() {
      super();
      this.name = 'ajaxAdapter';
    }

    request(url) {
      // request and return promise
    }
  }

  class NodeAdapter extends Adapter {
    constructor() {
      super();
      this.name = 'nodeAdapter';
    }

    request(url) {
      // request and return promise
    }
  }

  class HttpRequester {
    constructor(adapter) {
      this.adapter = adapter;
    }

    fetch(url) {
      return this.adapter.request(url).then(response => {
        // transform response and return
      });
    }
  }
  ```

- 리스코프 치환 원칙 (Liskov Substitution Principle, LSP)

  리스코프 원칙이란 자료형 S가 자료형 T의 하위형이라면 프로그램이 갖추어야 할 속성들의 변경사항 없이 자료형 T의 객체를 자료형 S의 객체로 교체할 수 있어야 한다는 원칙이다.
  부모 클래스와 자식 클래스를 가지고 있을 때 베이스 클래스와 하위 클래스를 잘못된 결과 없이 서로 교환하여 사용할 수 있다. 상속을 통해 “is-a” 관계를 사용하여 모델링한다면 문제가 발생한다.

  ```javascript
  class Rectangle {
    constructor() {
      this.width = 0;
      this.height = 0;
    }

    setWidth(width) {
      this.width = width;
    }

    setHeight(height) {
      this.height = height;
    }

    getArea() {
      return this.width * this.height;
    }
  }

  class Square extends Rectangle {
    setWidth(width) {
      this.width = width;
      this.height = width;
    }

    setHeight(height) {
      this.width = height;
      this.height = height;
    }
  }

  function renderLargeRectangles(rectangles) {
    rectangles.forEach(rectangle => {
      rectangle.setWidth(4);
      rectangle.setHeight(5);
      const area = rectangle.getArea(); // 정사각형일때 25를 리턴한다.
      console.log(area);
    });
  }

  const rectangles = [new Rectangle(), new Rectangle(), new Square()];
  renderLargeRectangles(rectangles);

  // 좋은예, 영향이 없도록 분리한다.
  class Shape {}

  class Rectangle extends Shape {
    constructor(width, height) {
      super();
      this.width = width;
      this.height = height;
    }

    getArea() {
      return this.width * this.height;
    }
  }

  class Square extends Shape {
    constructor(length) {
      super();
      this.length = length;
    }

    getArea() {
      return this.length * this.length;
    }
  }

  function renderLargeShapes(shapes) {
    shapes.forEach(shape => {
      const area = shape.getArea();
      console.log(area);
    });
  }

  const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
  renderLargeShapes(shapes);
  ```

- 메소드 체이닝을 사용하라

  JavaScript에서 메소드 체이닝은 매우 유용한 패턴이며 jQuery나 Lodash 같은 많은 라이브러리에서 이 패턴을 찾아볼 수 있다. 이는 코드를 간결하고 이해하기 쉽게 만들어준다. 이런 이유들로 메소드 체이닝을 쓰는 것을 권한다. 클래스 함수에서 단순히 모든 함수의 끝에 ‘this’를 리턴해주는 것으로 클래스 메소드를 추가로 연결할 수 있다.

  ```javascript
  class Car {
    constructor() {
      this.make = 'Honda';
      this.model = 'Accord';
      this.color = 'white';
    }

    setMake(make) {
      this.make = make;
      // 메모: 체이닝을 위해 this를 리턴한다
      return this;
    }

    setModel(model) {
      this.model = model;
      return this;
    }

    setColor(color) {
      this.color = color;
      return this;
    }

    save() {
      console.log(this.make, this.model, this.color);
      return this;
    }
  }

  const car = new Car()
    .setColor('pink')
    .setMake('Ford')
    .setModel('F-150')
    .save();
  ```

- 상속(extends)보단 조합(composition)을 사용하라.

  GoF의 디자인패턴 에서 유명한 전략으로 가능하다면 상속보다는 조합을 사용해야 한다. 상속을 사용했을 때 얻을 수 있는 이득보다 조합을 사용했을 때 얻을 수 있는 이득이 많기 때문이다.
  조합보다 상속을 쓰는게 좋을만한 예시를 몇 개만 들어보면,

  ```
  a.	당신의 상속관계가 “is-a” 관계가 아니라 “has-a” 관계일 때 (사람 > 동물 / 유저 > 유저정보)
  b.	기반 클래스의 코드를 다시 사용할 수 있을 때
  c.	기반 클래스를 수정하여 파생된 클래스 모두를 수정하고 싶을 때
  ```

  ```javascript
  class Employee {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }

    // ...
  }

  // 이 코드가 안좋은 이유는 Employees가 tax data를 "가지고" 있기 때문이다.
  // EmployeeTaxData는 Employee 타입이 아닙니다.
  class EmployeeTaxData extends Employee {
    constructor(ssn, salary) {
      super();
      this.ssn = ssn;
      this.salary = salary;
    }

    // ...
  }

  // has-a 관계일 땐 조합을 사용하라.
  class EmployeeTaxData {
    constructor(ssn, salary) {
      this.ssn = ssn;
      this.salary = salary;
    }

    // ...
  }

  class Employee {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }

    setTaxData(ssn, salary) {
      this.taxData = new EmployeeTaxData(ssn, salary);
    }
    // ...
  }
  ```

# 동시성과 에러처리

자바스크립트는 단일 스레드로 동작하기 때문에 동시성을 구현하는게 중요하다. 동시성 구현방법의 트렌드가 어떻게 변해 왔는지 알아보며 동시성을 처리하는데 있어서 필수적인 에러처리에 대해서도 알아본다.

- Callback 대신 Promise를 사용하라

  Callback 은 깔끔하지 않다. 그리고 엄청나게 많은 중첩을 만들어 낸다. ES6에는 Promise가 내장되어 있다. ES5에서도 Promise 라이브러리를 추가해서 사용할 수 있다.

  ```javascript
  require('request').get(
    'https://en.wikipedia.org/wiki/Robert_Cecil_Martin',
    (requestErr, response) => {
      if (requestErr) {
        console.error(requestErr);
      } else {
        require('fs').writeFile('article.html', response.body, writeErr => {
          if (writeErr) {
            console.error(writeErr);
          } else {
            console.log('File written');
          }
        });
      }
    },
  );

  // promise – then 구문을 사용하자
  require('request-promise')
    .get('https://en.wikipedia.org/wiki/Robert_Cecil_Martin')
    .then(response => {
      return require('fs-promise').writeFile('article.html', response);
    })
    .then(() => {
      console.log('File written');
    })
    .catch(err => {
      console.error(err);
    });
  ```

- Async/Await는 Promise보다 더욱 깔끔하다

  Promise 도 callback 에 비해 깔끔하지만 ES2017 에선 async와 await가 있다. 이들은 callback에 대한 더욱 깔끔한 해결책을 준다. 필요한 것은 함수 앞에 async를 붙이는 것 뿐이다.

  async-await는 Observer 패턴으로 ES5에서도 RxJs 라이브러리를 통해 사용할 수 있다.

  ```javascript
  async function getCleanCodeArticle() {
    try {
      const response = await require('request-promise').get(
        'https://en.wikipedia.org/wiki/Robert_Cecil_Martin',
      );
      await require('fs-promise').writeFile('article.html', response);
      console.log('File written');
    } catch (err) {
      console.error(err);
    }
  }
  ```

- 단순히 에러를 확인만 하지 마라

  에러를 뱉는다는 것은 좋은 것이다! 이것은 프로그램에서 무언가가 잘못되었을 때 런타임에서 성공적으로 확인되면 현재 스택에서 함수 실행을 중단하고 프로세스를 종료하고 스택 추적으로 콘솔을 통해 사용자에게 그 이유를 알려준다.

  단순히 에러를 확인하는 것만으로 그 에러가 해결되거나 대응할 수 있게 되는 것은 아니다. console.log를 통해 콘솔에 로그를 기록하는 것은 에러 로그를 잃어버리기 쉽다. 만약에 try/catch 로 어떤 코드를 감쌌다면 그에 대한 계획이 있거나 어떠한 행동을 해야한다.

  ```javascript
  try {
    functionThatMightThrow();
  } catch (error) {
    // 첫번째 방법은 console.error를 이용한다. 이건 console.log보다 조금 더 알아채기 쉽다.
    console.error(error);
    // 다른 방법은 유저에게 알리는 방법이다.
    notifyUserOfError(error);
    // 또 다른 방법은 서비스 자체에 에러를 기록하는 방법이다.
    reportErrorToService(error);
    // 혹은 그 어떤 방법이 될 수 있다.
  }
  ```

  마찬가지로 Promise가 실패된 것을 무시하지 마라

# 마치며

이 글의 내용은 좋은 코드를 작성하기 위한 방법의 일부분이다. 디자인 패턴과 리팩토링을 지속적으로 학습하여 더 좋은 코드를 만들기 위한 노력은 계속되어야 한다.
그저 돌아가는 코드만으로는 부족하다. 돌아가는 코드가 심하게 망가지는 사례는 흔하다. 설계와 구조를 개선할 시간이 없다고 변명하며 단순히 돌아가는 코드에 만족하는 프로그래머도 있다. 나쁜 코드보다 더 오랫동안 더 심각하게 개발 프로젝트에 악영향을 미치는 요인도 없다. 나쁜 일정은 다시 짜면 된다. 나쁜 요구사항은 다시 정의하면 된다. 하지만 나쁜 코드는 썩어 문드러진다. 클린 코드 에서는 “점점 무게가 늘어나 팀의 발목을 잡고, 너무 서두르다가 이후로 영원히 자신들의 운명을 지배할 악성 코드라는 굴레를 짊어진다.”고 얘기하고 있다.
물론 나쁜 코드도 이후에 깨끗한 코드로 개선할 수 있지만, 비용이 엄청나게 많이 든다. 처음부터 코드를 깨끗하게 유지하는 것이 상대적으로 쉽다. 그러므로 언제나 최대한 깔끔하고 단순하게 정리하자.

### --

본 글은 전 회사에서 글쓰기 교육을 통해 작성한 글입니다.

## 참고

- Clean-code-javascript. https://github.com/qkraudghgh/clean-code-javascript-ko
- Airbnb JavaScript Style Guide. https://github.com/airbnb/javascript
- 로버트 C. 마틴, 『CLEAN CODE(클린 코드)』. 박재호, 이해영 역, 인사이트, 2013.
