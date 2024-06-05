import React, {useEffect, useRef, useState} from 'react';

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import AboutTarot from "./AboutTarot.json"
import aboutTarotImg1 from "../../assets/images/aboutTarotImg1.png"

import {getTarotMajorList, getTarotMinorList} from "../../axios/TarotCardAxios"
import {TarotExplainDataType} from "../types/explainCards/explainCardsType"
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

  const [cardOrder, setCardOrder] = useState<string[]>(['1','2','3','4','5','6','7','8','9','10','Page','Knight','Queen','King'])
  const [majorData, setMajorData] = useState<TarotExplainDataType[]>([])
  const [pentasData, setPentasData] = useState<TarotExplainDataType[]>([])
  const [wandsData, setWandsData] = useState<TarotExplainDataType[]>([])
  const [cupsData, setCupsData] = useState<TarotExplainDataType[]>([])
  const [swordsData, setSwordsData] = useState<TarotExplainDataType[]>([])

  const handleGetTarotMajorList = async () => {
    try {
      const response = await getTarotMajorList()
      setMajorData(response?.data)
    } catch (error) {
      console.log('데이터를 받아올 수 없습니다.', error)      
    }
  }
  const handleGetTarotMinorList = async () => {
    try {
      const response = await getTarotMinorList()
      const pent = response?.data.filter((item: { distinguish: number; }) => item.distinguish === 1);
      const wand = response?.data.filter((item: { distinguish: number; }) => item.distinguish === 2);
      const cup = response?.data.filter((item: { distinguish: number; }) => item.distinguish === 3);
      const sword = response?.data.filter((item: { distinguish: number; }) => item.distinguish === 4);
      setPentasData(pent)
      setWandsData(wand)
      setCupsData(cup)
      setSwordsData(sword)
    } catch (error) {
      console.log('데이터를 받아올 수 없습니다.', error)      
    }
  }

  useEffect(() => {
    handleGetTarotMajorList()
    handleGetTarotMinorList()
  }, [])


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
              {majorData?.map((v3, i3) => (
                <tr key={i3}
                  onClick={() => {
                    navigate(`/explain/${v3.card_num }`)
                  }}
                >
                  <td>{v3.card_num }</td>
                  <td>{v3.card_name }</td>
                  <td>
                    {v3.card_means.join(", ")}
                  </td>
                  <td>
                    {v3.card_r_means.join(", ")}
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
              {cardOrder.map((v4, i4) => (
                <tr key={i4}>
                  <td>{v4}</td>
                  <td className='minorTarot-table-element'
                    onClick={() => {
                      navigate(`/explain/${pentasData[i4].card_num}`)
                    }}
                  >
                    {pentasData.length>0?pentasData[i4].card_means.join(", "):""}
                  </td>
                  <td className='minorTarot-table-element'
                    onClick={() => {
                      navigate(`/explain/${wandsData[i4].card_num}`)
                    }}
                  >
                    {wandsData.length>0?wandsData[i4].card_means.join(", "):""}
                  </td>
                  <td className='minorTarot-table-element'
                    onClick={() => {
                      navigate(`/explain/${cupsData[i4].card_num}`)
                    }}
                  >
                    {cupsData.length>0?cupsData[i4].card_means.join(", "):""}
                  </td>
                  <td className='minorTarot-table-element'
                    onClick={() => {
                      navigate(`/explain/${swordsData[i4].card_num}`)
                    }}
                  >
                    {swordsData.length>0?swordsData[i4].card_means.join(", "):""}
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
