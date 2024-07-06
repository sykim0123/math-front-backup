async function sendMessage() {
  const input = document.getElementById('messageInput'); // 입력 필드의 요소를 가져옵니다.
  const message = input.value; // 입력 필드의 값을 가져옵니다.
  if (!message) return; // 입력 필드가 비어 있으면 함수를 종료합니다.

  appendMessage(`You: ${message}`); // 사용자가 입력한 메시지를 채팅 박스에 추가합니다.

  try {
    const response = await fetch('https://port-0-test-back-lxlts66g89582f3b.sel5.cloudtype.app/solve-equation', {
      method: 'POST', // HTTP 메서드를 POST로 설정합니다.
      headers: {
        'Content-Type': 'application/json' // 요청의 콘텐츠 유형을 JSON으로 설정합니다.
      },
      body: JSON.stringify({ equation: message }), // 메시지를 JSON 형식으로 변환하여 요청의 본문에 추가합니다.
      credentials: 'include'  // 자격 증명을 포함합니다.
    });

    if (response.ok) {
      const data = await response.json(); // 응답을 JSON 형식으로 변환합니다.
      appendMessage(`수학 선생님: ${formatResponse(data.response)}`); // 응답 데이터를 형식화하여 채팅 박스에 추가합니다.
    } else {
      appendMessage('수학 선생님: 에러가 발생했습니다.'); // 응답이 성공적이지 않을 경우 에러 메시지를 표시합니다.
    }
  } catch (error) {
    console.error('Error:', error); // 콘솔에 에러를 출력합니다.
    appendMessage('수학 선생님: 에러가 발생했습니다.'); // 에러가 발생했을 경우 에러 메시지를 표시합니다.
  }

  input.value = ''; // 입력 필드를 비웁니다.
}

function formatResponse(response) {
  if (typeof response === 'object') {
    response = JSON.stringify(response, null, 2); // 객체를 사람이 읽을 수 있는 형식으로 변환합니다.
  }
  return response.replace(/\n/g, '<br>').replace(/\\\[/g, '[').replace(/\\\]/g, ']').replace(/\\\(/g, '(').replace(/\\\)/g, ')'); // 응답의 형식을 변환하여 HTML에 표시할 수 있도록 합니다.
}

function appendMessage(message) {
  const chatbox = document.getElementById('chatbox'); // 채팅 박스의 요소를 가져옵니다.
  const messageElement = document.createElement('div'); // 새로운 div 요소를 생성합니다.
  messageElement.innerHTML = message; // innerHTML을 사용하여 HTML 태그를 렌더링합니다.
  chatbox.appendChild(messageElement); // 새로운 메시지를 채팅 박스에 추가합니다.
  chatbox.scrollTop = chatbox.scrollHeight; // 채팅 박스를 스크롤하여 최신 메시지가 보이도록 합니다.
}

function checkEnterKey(event) {
  if (event.key === 'Enter') { // 엔터 키가 눌렸는지 확인합니다.
    sendMessage(); // 엔터 키가 눌렸을 경우 sendMessage 함수를 호출합니다.
  }
}
