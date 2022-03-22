import React, { useState } from 'react';

function NameList() {
 
  const [listOfNames,setListOfNames] = useState("")
  var currentName = ""

  const addName = () => {
    alert("Welcome "+currentName)
    // listOfNames += currentName+" "
    setListOfNames(listOfNames +" "+ currentName)
  }

}

export default NameList;
