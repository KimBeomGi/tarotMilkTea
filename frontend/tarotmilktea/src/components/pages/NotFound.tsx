import React from 'react';

import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate()


  return (
    <div className="NotFound">
      <div>
        <h1>Not Found 페이지</h1>
      </div>
      <div>
        <h2>유효하지 않은 요청입니다.</h2>
        <p>웹페이지 주소가 정확하게 입력되었는지 다시 한 번 확인하시기 바랍니다.</p>
      </div>
      <button onClick={() => {navigate(-1)}}>이전 화면으로</button>
    </div>
  );
}

export default NotFound;
