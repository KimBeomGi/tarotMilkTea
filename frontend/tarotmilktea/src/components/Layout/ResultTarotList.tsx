import React, {useEffect, useState} from 'react';

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { decrement, increment, incrementByAmount, decrementByAmount } from '../../store/slices/counter/counterSlice'
import Cookies from 'js-cookie';
import {getTarotResultList} from "../../axios/TarotCardAxios"
import {tarotResultDataListType} from "../types/readFortune/fortuneReadType"
import "./ResultTarotList.css"

function ResultTarotList() {
  const navigate = useNavigate()
  const userToken = Cookies.get('tmt_token')
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementN, setIncrementN] = useState<number>(7)
  const [discountN, setDiscountN] = useState<number>(7)
  const [resultData, setResultData] = useState<tarotResultDataListType[]>([])


  const handleGetTarotResultList = async() => {
    if(userToken){
      try {
        const response = await getTarotResultList(userToken)
        // console.log(response?.status)
        console.log(response?.data)
        console.log(response?.data[0])
        let results = response?.data
        setResultData(results)
      } catch (error:any) {
        console.log(error)
      }
    }else{
      alert('로그인 후 이용해주세요.')
    }
  }


  useEffect(() => {
    handleGetTarotResultList()
  } ,[])
  return (
    <div className="ResultTarotListBody">
      <div>
        <h1>내 타로 결과 보관함</h1>
      </div>
      <div className='resultListBody'>
        {resultData.map(((v1, i1) => (
          <div 
            className='resultBody'
            key={v1.id || i1}
            onClick={() => {console.log(v1.id)}}
          >
            <div>
              <div>
                <p><strong>고민 주제</strong> : {v1.subject}</p>
                <p><strong>고민 내용</strong> : {v1.consulValue}</p> 
              </div>
              <img className='parchmentImg'
                src={process.env.PUBLIC_URL+"/images/parchment.png"} alt="" 
                onClick={()=>{}}
              />
            </div>
            <div className="coverImageDiv">
              {v1.selected_cards.map((v2,i2)=>(
                <div key={i2}>
                  <img 
                    className='coverImage'
                    src={`https://whalebigtarotmilktea.s3.ap-northeast-2.amazonaws.com/tarotCard${v2}.jpg`}
                    alt={process.env.PUBLIC_URL+"/images/tarotCardBack.png"}
                  />
                </div>
              ))}
            </div>
            <hr />
          </div>
        )))}
      </div>
    </div>
  );
}

export default ResultTarotList;
