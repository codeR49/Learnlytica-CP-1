import React from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";
let code ="";
export default function CodeCompiler(props) {
  return (
   <Editor
   height="270px" 

      lineNumbers="true"
         tabSize="2"
          spellcheck="true"
          autocorrect="true"
          defaultvalue= "Code Here"
          mode= "javascript"
         theme= "seti"
          matchBrackets= "true"
          autoCloseBrackets="true"
          closeBrackets= "true"
          
          style={{color:"black",fontSize:"14px" }}
     defaultLanguage="javascript"
     defaultValue="// Code Here"
     onChange={props.onChange}
   />
  );
}