# 2023_React_Vite_setting

## vite 다운

[vite 공식사이트](https://ko.vitejs.dev/guide/)

```
npm create vite@latest
	OR
yarn create vite
	OR
pnpm create vite
```

```
프로젝트 이름 설정 
react-typescript 선택
npm i 로 dependencies 다운
```

## eslint

dev dependency로 eslint 
```
npm i -D eslint 
```

eslint를 다운받으면 실행을 해서 여러 기본 셋팅을 진행
```
npx eslint --init
```

```
- To check syntax and find problems
- javscript modules (import/export)
- react
- yes (Does your project use Typescript?)
- Browser (Where does your code run ?)
- javascript (What format do you want your config file to be in? ) -> 원하는 형식을 사용해도 무관
- yes (Would you like to install them now?)
- npm or yarn or pnpm (Which package manager do you want to use ?)
```

<img width="814" alt="스크린샷 2023-07-26 오후 10 48 04" src="https://github.com/Southbig/2023_React_Vite_setting/assets/83868259/f55013c3-a392-4d81-9c26-c0c40982d579">

eslint 설정이 된 eslintrc.cjs 파일이 생성

<img width="548" alt="스크린샷 2023-07-26 오후 10 51 24" src="https://github.com/Southbig/2023_React_Vite_setting/assets/83868259/400070c6-cc85-499a-ac61-2caa136a0e73">

package.json의 devDependencies

<img width="539" alt="스크린샷 2023-07-26 오후 10 54 16" src="https://github.com/Southbig/2023_React_Vite_setting/assets/83868259/e3bc621d-ff1c-4ab3-b5d9-b5edb35c1648">

## airbnb 설정

```
npx install-peerdeps --dev eslint-config-airbnb
```

### eslintrc.cjs 파일 변경
```
 extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
```
이전과 다른점은 eslint:recommended를 뺀것인데 airbnb 룰이 이것을 덮어써주기 때문에 제게해도 무방

### typescript 설정도 추가

```
npm install -D eslint-config-airbnb-typescript
```

위 설정에 들어가면 @typescript-eslint/eslint-plugin 과 @typescript-eslint/parser 도 install하라고 나오지만 앞선 설정들로 인해 이미 다운받았기 때문에 필요없다

### extends 추가

```
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
```

위 typescript 설정 문서에 보면 parserOptions로 tsconfig.json 파일의 위치를 넣어주게 되어있다

```
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
```

eslint설정에서는 tsconfig 파일의 설정을 인식하지만 tsconfig에서는 eslint설정 파일을 인식하지 못한다
그래서 다음과 같은 에러문이 module.exports에 나온다

```
Parsing error: ESLint was configured to run on `<tsconfigRootDir>/.eslintrc.cjs` using `parserOptions.project`: <tsconfigRootDir>/tsconfig.json
However, that TSConfig does not include this file. Either:
- Change ESLint's list of included files to not include this file
- Change that TSConfig to include this file
- Create a new TSConfig that includes this file and include it in your parserOptions.project
See the typescript-eslint docs for more info: https://typescript-eslint.io/linting/troubleshooting#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file
```

에러를 없애기위해 tsconfig.json 파일의 include 에 eslintrc.cjs 파일을 넣어으면 된다

```
  "include": [".eslintrc.cjs", "src"],   
```

## prettier

```
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

### .prettierrc.json 파일 세팅

```
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid"
}
```

###  eslint에도 추가

```
 extends: [ 'plugin:prettier/recommended']
 plugins: ['react', '@typescript-eslint', 'prettier'],
```

**extends에 prettier는 맨 마지막에 넣어야한다, 그래야 모든 extends에 prettier 설정이 들어갈 수 있다.**


## Husky

```
// 다음 명렁어로 다운
npm install husky --save-dev
// 다음 명령어로 실행
npx husky install // husky에 등록된 hook을 실제 .git에 적용시키기 위한 스크립트
```

###  package.json에 scripts를 추가

```
  "scripts": {
    "postinstall": "husky install"
  },
```

### prettier와 eslint를 검사하는 명령어 추가

```
// 초기
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
  },
```


```
// 추가
  "scripts": {
    "postinstall": "husky install",
    "format": "prettier --cache --write .",
	  "lint": "eslint --cache .",
  },
```

postinstall은 npm install을 하게되면 자동으로 받아지게 해주지만

format과 lint는
npm run 일일히 실행해 검사해야 한다

팀 작업을 위한 룰 강제를 위한것이 husky 이기에 github에 push하거나 commit을 작성하려할 때마다 format과 lint가 먹히도록 하자

```
npx husky add .husky/pre-commit "npm run format"
npx husky add .husky/pre-push "npm run lint"
```

이제 commit 전 그리고 push 전에 실행될 명령어가 설정되었고 모든 사전 작업이 마무리 되었다

husky에는 test를 돌리도록 할 수도 있고 많은 작업을 설정할 수 있으니 팀 내의 의도에 맞게 조작을 하면 될 것이다





















