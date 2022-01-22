import React, { useState } from 'react';
import './CSS/Output.css'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import CodeCompiler from './CodeCompiler'
import Field from './Field';
import Output from './Output';
import { Button } from '@themesberg/react-bootstrap';
import DevelopmentUrl from "../constant";
import Spinner from './Spinner';
import Error from './Error';





let token = localStorage.getItem('token');
export const Editor = (props) => {
  const plang = [
    "c", "c99", "c++", "c++14", "c++17","php", "perl","python2","python3",
    "ruby",
     "golang",
     "scala",
     "bashshell",
    "sql",
    "pascal",
    "c#",
     "vb.net",
    "haskell",
     "objectivec",
    "swift",
    "groovy",
    "fortran",
    "lua",
     "tcl",
    "hack",
    "rust",
   "d",
    "ada",
    "java",
    "rlanguage",
   "freebasic",
  
     "verilog",
    "cobol",
    "dart",
    "yabasic",
     "clojure",
     "nodejs",
    "scheme",
     "forth",
    "prolog",
     "octave",
     "coffeescript",
     "icon",
     "f#",
  "assemblernasm"]

  let token = localStorage.getItem('token');
  const [selectedvalue, setSelectedvalue] = useState("c");
  const [inp, setinp] = useState();
  const [code, setcode] = useState();
  const [output, setoutput] = useState();
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(null);
  const url = window.location.href;
  let quizid = url.substring(url.indexOf("Quiz/") + 7, url.lastIndexOf("/"));
  let quesid = url.substring(url.lastIndexOf("/") + 1);

  var v;
  function handleEditorChange(e) {
    setcode(e);
  }

  function handleChange(e) {
    setinp(e.target.value);
  }

  const Drophandlechange = e => {
    setSelectedvalue(e.value);

  }
  const setoutputfunc = e => {
    setoutput(e);
  }
  async function apiGet() {
    try{
    setSpinner(true);
    const response = await fetch(DevelopmentUrl + "/compile", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        code: code,
        language: selectedvalue,
        standardIn: inp

      })
  })
  const v = await(response.json());
  setoutputfunc(v.output);
  setSpinner(false);}
  catch(e){
    setError(e.message);
    setSpinner(false);
  }
}

  async function apiSubmit() {
    try{
    setSpinner(true);
    const response = await fetch(DevelopmentUrl + "/quizresults", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        code: code,
        language: selectedvalue,
        standardIn: inp,
        quesid: quesid,
        quizid: quizid

    })
})
console.log(code);
v = await(response.json());
setoutputfunc(v.output);
setSpinner(false);
props.setScoreFunc(v.score);}
catch(e){
  setError(e.message);
  setSpinner(false);
}

  }

  return (
    error ? <Error message={error} /> :
      <div>
        <Dropdown options={plang} value={selectedvalue} onChange={Drophandlechange} placeholder="Select an option" />
        <br /> <hr />
        <CodeCompiler onChange={handleEditorChange} />
        <Button variant="secondary" className="m-1" onClick={apiGet}>Compile</Button>
        <Button variant="secondary" className="m-1" onClick={apiSubmit}>Submit</Button>
        <Field id="stdin" className="title-input" placeholder="Inputs (seperated by an ' | ' symbol)" onChange={handleChange} />
        {!spinner ? <></> : <Spinner />}
        <Output showOutput={output} />
      </div>
  )
}
export default Editor;