import './CalComponent.css';
import { useEffect, useState } from 'react';
import React from 'react';

export default function CalComponent() {

    const [Bill, SetBill] = useState< number | undefined >(undefined)
  const [People, SetPeople] = useState< number | undefined >(undefined)
  const [Tip, SetTip] = useState< number | undefined >(undefined)


  const CheckEvrything = Bill !== undefined && People !== undefined && Tip !==undefined;
  
  const TipAmount = CheckEvrything && (Bill * Tip / People).toFixed(2);


  
   const [PeopleError, SetPeopleError] = useState('');
  const TotalPerPerson = CheckEvrything && (Bill * (Tip + 1) / People).toFixed(2);
  const NotShowTip = CheckEvrything && TipAmount === "NaN" || TipAmount === "Infinity" || TipAmount === "undefined" ;
  const NotShowTotal = TotalPerPerson === "NaN" || TotalPerPerson === "Infinity" || TipAmount === "undefined";

  const tipPercentages = [5, 10, 15, 25, 50];
 

  

  useEffect(()=>{
    if(People === 0){
       SetPeopleError('cant Be Zero')
    }else {
      SetPeopleError('')
    }
  }, [People])

  

  return (
    <div className='Psection'>
      <div className='firsSection'>
        <div className='Bill' >
        <h3>Bill</h3>
      <input placeholder='$'
      className='Bill_input'
      onKeyDown={(e)=>{
        if(e.key === "." || e.key === "-" || e.key === "e" ){
           e.preventDefault()
        }
  }}
      value={Bill !== undefined ? Bill : ""}
      min={0}
      type="number"
      onChange={(e)=>{
        SetBill(e.target.valueAsNumber)
      }}
      />
      </div >
      <div className='Buttons'>
        
        {tipPercentages.map((item, index) => (
        <button key={index} onClick={()=>{SetTip(item/100)}} className='btn'>
            {item + "%"}
        </button>
      ))}
     
        
      <input placeholder='custom'
      className='custom'
      onKeyDown={(e)=>{
        if(e.key === "." || e.key === "-" || e.key === "e" ){
           e.preventDefault()
        }
  }}
      value={Tip !== undefined ? Tip * 100  : ""}
      min={0}
      max={100}
      type="number"
      onChange={(e)=>{
        SetTip(e.target.valueAsNumber / 100)
      }}
      />
      </div>

      <div className='People'>
        <h3>People</h3>
      <input placeholder='Number of People' 
      className='People_input'
      onKeyDown={(e)=>{
            if(e.key === "." || e.key === "-" || e.key === "e" ){
               e.preventDefault()
            }
      }}
      value={People !== undefined ? People : ""}
      type='number'
      min={0}
      onChange={(e)=>{
          SetPeople(e.target.valueAsNumber)
      }}
      />
      <p>{PeopleError}</p>
          </div>
             </div>
             <div className='SeconSection'>
      <div className='Tip_Amount'>Tip Amount / Person: $ {NotShowTip === CheckEvrything ? "0.00" : TipAmount} </div>
      <div className='ToTal_person'>Total Person: $ { NotShowTotal === CheckEvrything  ? "0.00" : TotalPerPerson }</div>
      </div>
      
    </div>
  )
}



