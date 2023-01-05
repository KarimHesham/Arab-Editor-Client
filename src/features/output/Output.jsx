const Output = () => {
  let code = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <style>* {
        box-sizing: border-box;
      }
      body {
        margin: 0;
      }
      .test{
        justify-content:center;
        color:red;
        display:flex;
      }
      .gjs-row{
        padding-top:10px;
        padding-right:10px;
        padding-bottom:10px;
        display:table;
        width:100%;
        padding-left:10px;
      }
      .gjs-cell{
        width:8%;
        display:table-cell;
        height:75px;
      }
      #ib54{
        width:30%;
      }
      #inbw{
        width:70%;
        background-color:#c1c0c0;
      }
      #isv8t{
        padding:10px;
      }
      #i0h6i{
        background-color:#c8a1a1;
      }
      #iq7w{
        background-color:#0f0000;
      }
      #i9ill{
        padding:10px;
      }
      #iloqf{
        padding:10px;
      }
      #ifmif{
        padding:10px;
      }
      #irohb{
        padding:10px;
      }
      #ix4ar{
        width:30%;
      }
      #if2ru{
        width:70%;
      }
      #iqtkd{
        padding:10px;
      }
      #ixjxs{
        padding:10px;
      }
      #i8kst{
        background-color:#954949;
      }
      @media (max-width: 768px){
        .gjs-cell{
          display:block;
          width:100%;
        }
      }
      
      </style>
    </head>
    <body id="ir73">
  <div class="test">page 2
  </div>
  <div id="i84b" class="gjs-row">
    <div id="iq7w" class="gjs-cell">
    </div>
  </div>
  <div id="iy2g" class="gjs-row">
    <div id="ib54" class="gjs-cell">
    </div>
    <div id="inbw" class="gjs-cell">
    </div>
  </div>
  <div id="icqi" class="gjs-row">
    <div id="iseu" class="gjs-cell">
      <div id="i9ill">Hi
      </div>
    </div>
    <div class="gjs-cell">
    </div>
    <div id="i0h6i" class="gjs-cell">
      <div id="isv8t">Hello
      </div>
    </div>
  </div>
  <div class="gjs-row" id="iwa9t">
    <div class="gjs-cell">
    </div>
    <div class="gjs-cell">
      <div id="ifmif">Insert your text here
      </div>
    </div>
    <div class="gjs-cell">
    </div>
  </div>
  <div id="iloqf">Insert your text here
  </div>
  <div class="gjs-row" id="i9lqr">
    <div class="gjs-cell">
    </div>
    <div class="gjs-cell">
    </div>
    <div class="gjs-cell">
    </div>
  </div>
  <div class="gjs-row" id="imqng">
    <div class="gjs-cell">
    </div>
    <div class="gjs-cell">
    </div>
    <div class="gjs-cell">
      <div id="irohb">Insert your text here
      </div>
    </div>
  </div>
  <div class="gjs-row" id="i1zef">
    <div class="gjs-cell" id="ix4ar">
      <div id="iqtkd">Insert your text here
      </div>
    </div>
    <div class="gjs-cell" id="if2ru">
    </div>
  </div>
  <div class="gjs-row" id="iyy27">
    <div class="gjs-cell">
      <div id="ixjxs">Insert your text here
      </div>
    </div>
  </div>
  <div class="gjs-row" id="iiklz">
    <div class="gjs-cell">
    </div>
    <div class="gjs-cell">
    </div>
    <div class="gjs-cell" id="i8kst">
    </div>
  </div>
</body>
    </html>
`;

  return (
    <iframe
      srcDoc={code}
      title="output"
      sandbox="allow-scripts"
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
      }}
    />
  );
};

export default Output;
