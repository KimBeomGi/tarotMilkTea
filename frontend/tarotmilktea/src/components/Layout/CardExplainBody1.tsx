import React, {useState} from 'react';

import { Outlet, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import AboutTarot from "./AboutTarot.json"

import "./CardExplainBody1.css"

function CardExplainBody1() {
  // const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const aboutTarot = useState(AboutTarot)
  

  return (
    <div className="CardExplainBody1">
      <div className='cEB1-shape'>
        <h1>타로 역사</h1>
        <div>
          {aboutTarot[0].tarotHistory.map((v1, i1) => (
            <p key={i1}>{v1}</p>
          ))}
        </div>
        <h1>타로 구성</h1>
        <div>
          {aboutTarot[0].tarotConfiguration.map((v2, i2) => (
              <p key={i2}>{v2}</p>
          ))}
        </div>
        <h1>타로 카드별 의미</h1>
        <h2>메이저 타로 카드</h2>
        <div>
          <table>
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
                <tr key={i3}>
                  <td>{v3.number}</td>
                  <td>{v3.name}</td>
                  <td>
                    {v3.forward.map((v4, i4) => (
                    <span key={i4}>
                      {v4}
                    </span>
                    ))}
                  </td>
                  <td>
                    {v3.reverse.map((v5, i5) => (
                      <span key={i5}>
                        {v5}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>마이너 타로 카드</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>WANDS</th>
                <th>CUPS</th>
                <th>SWORDS</th>
                <th>PENTACLES</th>
              </tr>
            </thead>
            <tbody>
              {aboutTarot[0].minorTarotMeaning.map((v6, i6) => (
                <tr key={i6}>
                  <td>{v6.number}</td>
                  <td>
                    {v6.wands.map((v7, i7) => (
                      <span key={i7}>
                        {v7}
                      </span>
                    ))}
                  </td>
                  <td>
                    {v6.cups.map((v8, i8) => (
                      <span key={i8}>
                        {v8}
                      </span>
                    ))}
                  </td>
                  <td>
                    {v6.swords.map((v9, i9) => (
                      <span key={i9}>
                        {v9}
                      </span>
                    ))}
                  </td>
                  <td>
                    {v6.pentacles.map((v10, i10) => (
                      <span key={i10}>
                        {v10}
                      </span>
                    ))}
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
