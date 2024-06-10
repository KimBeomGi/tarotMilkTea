import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import "./NotFound.css"
function NotFound() {
  const navigate = useNavigate()
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState(window.location.href)
  console.log('Current URL:', window.location.href);
  const handleRefresh = () => {
    window.location.reload();
  }

  return (
    <div className="NotFound">
      <div className='notFoundContainer'>
        {/* 구분1 */}
        <div>
          <img src={process.env.PUBLIC_URL+"/images/404notfoundImg.png"} alt="" className='notFoundImg'/>
        </div>
        {/* 구분2 */}
        <div>
          <div>
            <h1>사이트에 연결할 수 없습니다.</h1>
            <p>웹페이지 주소가 정확하게 입력되었는지 다시 한 번 확인하시기 바랍니다.<br/>
            현재 입력한 주소는 {currentUrl}입니다.
            </p>
          </div>
          <button onClick={() => {handleRefresh()}} className='button404 button404maring'>새로고침</button>
          <button onClick={() => {navigate('/')}} className='button404'>홈으로</button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
