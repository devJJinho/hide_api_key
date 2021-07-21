# What is this?
Client-side에서 API Key 노출 없이 날씨API([OpenWeather](https://openweathermap.org/))와 통신하기 위해 만든 Redirect Server입니다.

# Why is it needed?
날씨 API를 사용하기 위해선 {위도}, {경도}, {API Key}를 Parameter로 넘겨야합니다.
서버가 따로 없이 작동하는 웹 어플리케이션 특성상 누가 대신 Get request를 수행해 줄 수 있는게 아니기 때문에 내부 로직에서 보내는 Get request에 위 Param을 모두 포함해야됩니다. 
때문에 API Key 값은 Network의 요청URL에 항상 노출되게 됩니다.

# How does it work?

![how it work](/img/diagram.png)
Netlify Domain으로 {위도}, {경도} 값을 쿼리 스트링으로 가진 Get request가 오면 
{위도}, {경도} 값에 {API Key}를 덧붙여서 OpenWeather API과 통신하고 그 결과를 반환하는 Js 함수를 작성했습니다. 그리고 이것을 서버리스 컴퓨팅 서비스의 개인 컨테이너에 등록함으로써 배포했습니다.

>서버리스 컴퓨팅을 사용한 이유로는 :
>1. 로직이 단기간 이벤트성 트래픽 처리를 요했습니다.
>2. 물리적인 서버 관리는 클라우드 사업자가 하기 때문에 기능 구현에만 집중하면 된다는 장점이 있습니다.

>서버리스 컴퓨팅은  ***Netlify*** 의 ***Function*** 을 사용했습니다.
>Git repository와 연동되어 push시 자동 deploy되기 때문에 구현에 용이했고, 무료 라이센스의 경우 월 125,000 Request, 100 hours Run time을 제공하기 때문에 사용 환경에 적합했습니다. 

---
![simulation](/img/simulation.gif)

# Reference





[Client-Side에서 Youtube API Key 숨기기
](https://velog.io/@bigsaigon333/Client-Side%EC%97%90%EC%84%9C-Youtube-API-Key-%EC%88%A8%EA%B8%B0%EA%B8%B0)