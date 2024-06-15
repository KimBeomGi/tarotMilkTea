import React, {useEffect, useState} from 'react';

import { Outlet, Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import Cookies from 'js-cookie';
import {GetTarotResultDetailDataType, TarotResultType} from '../types/readFortune/fortuneReadType'
import {getTarotResultDetail} from "../../axios/TarotCardAxios"
import { FaDove } from 'react-icons/fa';
import "./ResultTarotDetail.css"

function ResultTarotDetail() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementN, setIncrementN] = useState<number>(7)
  const [discountN, setDiscountN] = useState<number>(7)

  const location = useLocation()
  const userToken = Cookies.get('tmt_token')
  const tarotResultId:number = location.state?.tarotResultId;
  const [tarotResult, setTarotResult] = useState<TarotResultType>()

  const handleGetTarotResultList = async() => {
    if(userToken&&tarotResultId){
      try {
        const sendData:GetTarotResultDetailDataType = {
          'token' : userToken,
          'tarotResultId' : tarotResultId 
        }
        const response =  await getTarotResultDetail(sendData)
        // console.log(response?.data)
        setTarotResult(response?.data)
      } catch (error) {
        alert('결과를 불러올 수 없습니다. 나중에 다시 시도해주세요')
      }
    }else{
      alert('올바른 경로로 접속해주세요.')
    }
  }

  useEffect(() => {
    handleGetTarotResultList()
  },[])

  // 브라우저 사이즈
  const [browserWidth, setBrowserWidth] = useState<number>(window.innerWidth)
  const [browserHeight, setBrowserHeight] = useState<number>(window.innerHeight)
  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
      setBrowserHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="ResultTarotDetailBody">
      <div>
        <div className='answerDiv'>
          {/* <p className='consulP'><strong>고민주제</strong> : {selectedOption}</p> */}
          {/* <p className='consulP'><strong>고민내용</strong> : {consulValue? consulValue : "고민내용 미입력"}</p> */}
          {tarotResult 
          ?
            <div>
              {/* 이미지 */}
              <div className='resultImgs'>
                {tarotResult?.selected_cards.map((v1,i1)=>(
                  <div key={i1} className=''>
                    <img
                      className="resultImg"
                      src={`https://whalebigtarotmilktea.s3.ap-northeast-2.amazonaws.com/tarotCard${v1}.jpg`}
                      alt={process.env.PUBLIC_URL+"/images/tarotCardBack.png"}
                    />
                    {browserWidth > 480 
                    ? <h2>{tarotResult?.selected_cards_name[i1]}</h2> 
                    : ""
                    }
                    
                  </div>
                ))}
              </div>
              {/* 내용 */}
              <div className='contentDiv'>
                <p className='consulP'><strong>고민주제</strong> : {tarotResult?.subject}</p>
                <p className='consulP'><strong>고민내용</strong> : {tarotResult? tarotResult.consulValue : "고민내용 미입력"}</p>
                <p className='consulP'><strong>고민날짜</strong> : {tarotResult? tarotResult.save_date : ""} {tarotResult? tarotResult.save_time : ""}</p>
                <p className='answerP'>{tarotResult?.greeting}</p>
                <p className='answerP'>{tarotResult?.past}</p>
                <p className='answerP'>{tarotResult?.present}</p>
                <p className='answerP'>{tarotResult?.future}</p>
                <p className='answerP'>{tarotResult?.advice}</p>
                <p className='answerP'>{tarotResult?.conclusion}</p>
              </div>
            </div>
          :""
          }
          
        </div>
      </div>
    </div>
  );
}

export default ResultTarotDetail;
