# 싸이월드 사진첩 이미지 백업을 위한 스크랩퍼

## 필요한 것

- `git clone` 할 수 있는 능력
- [node.js](https://nodejs.org/en/download/) app 를 CLI로 실행할 수 있는 능력
- 웹 브라우저 개발자 도구에서 HTML 을 확인할 수 있는 능력
- 잘 모르겠으면 주변 개발자 친구의 도움을 받아보자!

## 방법

1.  `npm install` 한다.

1.  백업하고 싶은 싸이월드 사진첩으로 간다.

1.  사진첩 하단의 **더보기** 버튼을 계속 클릭하여 사진첩 끝까지 페이지를 로드한다.

1.  개발자도구를 열고 `<div class="postlist_area">` 부분을 찾고 해당 HTML 블록을 통째로 복사한다.
    ![image](https://user-images.githubusercontent.com/8033320/84590517-50017900-ae72-11ea-853e-c973cb09e1e3.png)

1.  복사된 내용을 프로젝트 하위의 `raw.txt` 로 저장한다.

    - 한번에 여러 사진첩을 스크랩핑하고 싶으면, 각 사진첩의 `postlist_area` 내용을 하단에 계속 추가해도 된다.

1.  CLI 로 `npm start` 를 실행한다. 파싱된 이미지 링크를 순차적으로 가져오면서 `/imgs` 디렉토리에 저장한다.
    ![image](https://user-images.githubusercontent.com/8033320/84590581-d4ec9280-ae72-11ea-9bd4-dc9392b608a9.png)

1.  프로젝트 하위 `/imgs` 디렉토리를 살펴보면 사진이 저장되어 있다.

## 사족

1. 내 것만 후딱 백업할려고 후딱 대충 만든거라 무슨 예외가 발생할지 모름.
