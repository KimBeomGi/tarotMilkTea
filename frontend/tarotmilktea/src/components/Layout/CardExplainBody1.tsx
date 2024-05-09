import React, {useEffect, useRef, useState} from 'react';

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import AboutTarot from "./AboutTarot.json"
import aboutTarotImg1 from "../../assets/images/aboutTarotImg1.png"

import "./CardExplainBody1.css"

function CardExplainBody1() {
  // const count = useAppSelector((state) => state.counter.value)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const aboutTarot = useState(AboutTarot)
  const historyPDiv = useRef<HTMLDivElement>(null)
  const historyImgDiv = useRef<HTMLDivElement>(null)
  const [historyPDivHeight, setHistoryPDivHeight] = useState(0); // historyPDiv의 높이를 저장할 상태 변수를 생성합니다.
  const [bH, setBH] = useState<number>(window.innerHeight)
  const [bW, setBW] = useState<number>(window.innerWidth)

  useEffect(() => {
    const updateHeightAndWidth = () => {
      setBH(window.innerHeight);
      setBW(window.innerWidth);
  
      if (historyPDiv.current && historyImgDiv.current) {
        if (window.innerWidth >= 1024) {
          const newHeight = historyPDiv.current?.offsetHeight;
          historyImgDiv.current.style.height = `${newHeight}px`;
          historyImgDiv.current.style.width = 'auto';
          historyImgDiv.current.style.maxWidth = `${window.innerWidth / 2}px`;
        } else if(window.innerWidth <= 768){
          historyImgDiv.current.style.height = 'auto';
          historyImgDiv.current.style.width = `${window.innerWidth * 0.7}px`;
        }else if(window.innerWidth < 1024) {
          historyImgDiv.current.style.height = 'auto';
          historyImgDiv.current.style.width = `${window.innerWidth}px`;
        }
      }
    };
  
    window.addEventListener('resize', updateHeightAndWidth);
    // 초기 설정을 위해 직접 호출
    updateHeightAndWidth();
  
    return () => {
      window.removeEventListener('resize', updateHeightAndWidth);
    };
  }, [])
  

  return (
    <div className="CardExplainBody1">
      <div className='cEB1-shape'>
        <h1 className='cEB1-shape-history-title'>타로 카드의 역사</h1>
        <div className='cEB1-shape-history-content'>
          <div 
            className='cEB1-shape-history-content-imgdiv'
            ref={historyImgDiv}
          >
            <img 
              src={aboutTarotImg1} 
              alt="대중적인 웨이트 타로 카드" 
              className='cEB1-shape-history-content-img' 
            />
          </div>
          <div className='cEB1-shape-history-content-paragraphdiv' ref={historyPDiv}>
            {aboutTarot[0].tarotHistory.map((v1, i1) => (
              <p key={i1}>{v1}</p>
            ))}
          </div>
        </div>
        <h1>타로 카드 구성</h1>
        <div>
          {aboutTarot[0].tarotConfiguration.map((v2, i2) => (
              <p key={i2}>{v2}</p>
          ))}
        </div>
        <h1>타로 카드별 의미</h1>
        <h2>메이저 타로 카드</h2>
        <div
          className='majorTarot-table-div'
        >
          <table
            className='majorTarot-table'
          >
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>정방향</th>
                <th>역방향</th>
              </tr>
            </thead>
            <tbody>
              {aboutTarot[0].majorTarotMeaning.map((v3, i3) => (
                <tr key={i3}
                  onClick={() => {
                    console.log(v3.card_id)
                    navigate(`/explain/${v3.card_id}`)
                  }}
                  
                >
                  <td>{v3.number}</td>
                  <td>{v3.name}</td>
                  <td>
                    {v3.forward.join(", ")}
                  </td>
                  <td>
                    {v3.reverse.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>마이너 타로 카드</h2>
        <div 
          className='minorTarot-table-div'
        >
          <table
            className='minorTarot-table'
          >
            <thead>
              <tr>
                <th>번호</th>
                <th>PENTACLES</th>
                <th>WANDS</th>
                <th>CUPS</th>
                <th>SWORDS</th>
              </tr>
            </thead>
            <tbody>
              {aboutTarot[0].minorTarotMeaning.map((v4, i4) => (
                <tr key={i4}>
                  <td>{v4.number}</td>
                  <td className='minorTarot-table-element'
                    onClick={() => {
                      console.log(v4.number, v4.pentacles.card_id)
                      navigate(`/explain/${v4.pentacles.card_id}`)
                    }}
                  >
                    {v4.pentacles.means.join(", ")}
                  </td>
                  <td className='minorTarot-table-element'
                    onClick={() => {
                      console.log(v4.number, v4.wands.card_id)
                      navigate(`/explain/${v4.wands.card_id}`)
                    }}
                  >
                    {v4.wands.means.join(", ")}
                  </td>
                  <td className='minorTarot-table-element'
                    onClick={() => {
                      console.log(v4.number, v4.cups.card_id)
                      navigate(`/explain/${v4.cups.card_id}`)
                    }}
                  >
                    {v4.cups.means.join(", ")}
                  </td>
                  <td className='minorTarot-table-element'
                    onClick={() => {
                      console.log(v4.number, v4.swords.card_id)
                      navigate(`/explain/${v4.swords.card_id}`)
                    }}
                  >
                    {v4.swords.means.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <h1>타로 스프레드</h1> */}
      </div>
    </div>
  );
}

export default CardExplainBody1;
