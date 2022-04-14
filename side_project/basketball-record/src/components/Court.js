import "./Court.css";

function Court() {
  // 球場定點
  function getCursorPosition(vas, event) {
    const rect = vas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let location = { x: x, y: y };
    console.log("x: " + x + " y: " + y);
  }

  return (
    <div>
      <svg
        onClick={(e) => {
          console.log(e.target);
          getCursorPosition(e.target, e);
        }}
        height="555"
        version="1.1"
        width="555"
        xmlnsXlink="http://www.w3.org/2000/svg"
        style={{ overflow: "hidden", position: "relative" }}
        viewBox="0 0 555 555"
        preserveAspectRatio="xMinYMin"
      >
        <desc className="example1">Created with Raphaël 2.1.0</desc>
        <defs className="example1">
          <pattern
            id="C4226D81-5B91-43DD-9247-0494A66A1E70"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(251.5,142.3)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="070D3C46-B60B-4728-983C-EB53E845BFAE"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(199.3,212.4)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="552AD0E7-74B7-47FA-9D15-7B2CCB3F2EB6"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(214.8,151)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="556D8D13-AAC0-48DE-9BAC-3B3684E013E6"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(323.1,131.9)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="DD34E371-09F5-4C0C-83F5-803C2A650731"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(216.9,223.7)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="3720E19B-99D8-46E2-A0FB-8D07689C8D28"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(214.6,133.4)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="1700B1FA-5AB9-4122-9580-906EFABBD52D"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(214.8,212.4)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="68A2B35B-A441-4B3C-8B44-FBE5753E2954"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(56.8,162.5)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="0E46E422-5151-485F-B201-1860DDE5649C"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(194.6,0)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="470D9FFB-0063-44C6-B210-E03C96403BA1"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(188.6,242.1)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="8854DA75-26B7-4A07-A7AE-D21E6BEB91D6"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(212,505.9)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="CED39EB2-FECD-45FB-9AFB-E9A8E3E99B02"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(194.6,111)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="EB678CA5-F054-46EF-A86D-96235D142EB4"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(162,328.9)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="D1180169-FF94-421B-BF11-77A1F34A38C0"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(212,432)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="EBD5942C-CBBA-4A3F-A0D5-B5A0DBA106E2"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(0.3,505.9)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="56BB1893-B75B-4600-A37E-9C1C77B9C852"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(354.5,0)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="DB373714-1988-487A-A66E-9CB5F79CFFF4"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(425.1,0)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="5B7000BD-383E-4C31-A219-D09E126B7F5F"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(372.3,0)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //    //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="DA8FAEB4-F574-409B-89E7-E791B57DBBC8"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(214.6,0)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="149C44ED-105C-4C81-908C-878B940EE03B"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(525.6,0)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="836F7C33-2DC9-4E52-8341-E5CB526A70A5"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(332.6,505.9)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="C448C204-6E54-4FA9-8FEB-7FCD89EA012E"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(103.9,0)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="4E4F645F-D399-4993-895B-BD6D577C4B3D"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(354.2,212.4)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="97AD38B4-29A0-4450-B666-153286EB1840"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(354.5,111.6)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="9E5CB46F-2E13-464C-B86C-511B4D4C5225"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(348.4,162.3)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="35179F87-BEEF-4104-A978-85C144A4AB4A"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(42.5,0)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="A47FB2B3-1243-4D2D-8CCE-778A89F716C8"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(0.3,208.2)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //   xlinkHref="./img/images.jpeg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="DCCE6BD2-C8BC-4647-AE6C-896D46CD9DE7"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(0.3,0)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
          <pattern
            id="A708AC9E-8273-473A-8C7D-F6AD73B17693"
            x="0"
            y="0"
            patternUnits="userSpaceOnUse"
            height="281"
            width="275"
            patternTransform="matrix(1,0,0,1,0,0) translate(356.4,208.2)"
            className="example1"
          >
            <image
              x="0"
              y="0"
              //   xlinkHref="./img/wood.jpg"
              className="example1"
              width="275"
              height="281"
            ></image>
          </pattern>
        </defs>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#C4226D81-5B91-43DD-9247-0494A66A1E70)"
          stroke="none"
          d="M306.9,148.3C298.6,144.5,289.3,142.3,279.6,142.3C269.5,142.3,260,144.6,251.5,148.7C260.2,151.3,269.3,152.7,278.7,152.7C288.4,152.7,297.9,151.1,306.9,148.3Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M306.9,148.3C298.6,144.5,289.3,142.3,279.6,142.3C269.5,142.3,260,144.6,251.5,148.7C260.2,151.3,269.3,152.7,278.7,152.7C288.4,152.7,297.9,151.1,306.9,148.3Z"
          id="c08_1"
          //   className="c08"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#070D3C46-B60B-4728-983C-EB53E845BFAE)"
          stroke="none"
          d="M199.3,212.4C201.2,213.3,203.1,214.3,205,215.2C204.9,214.2,204.9,213.3,204.8,212.4L204.6,212.4L199.3,212.4Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M199.3,212.4C201.2,213.3,203.1,214.3,205,215.2C204.9,214.2,204.9,213.3,204.8,212.4L204.6,212.4L199.3,212.4Z"
          id="c816_1"
          //   className="c816"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#552AD0E7-74B7-47FA-9D15-7B2CCB3F2EB6)"
          stroke="none"
          d="M214.8,202.4L344.3,202.4C342.7,180.4,330,161.4,311.9,151C301.3,154.7,290.1,156.7,278.7,156.7C278.7,156.7,278.7,156.7,278.7,156.7C267.6,156.7,256.8,154.8,246.6,151.3C228.8,161.9,216.5,180.6,214.8,202.4Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M214.8,202.4L344.3,202.4C342.7,180.4,330,161.4,311.9,151C301.3,154.7,290.1,156.7,278.7,156.7C278.7,156.7,278.7,156.7,278.7,156.7C267.6,156.7,256.8,154.8,246.6,151.3C228.8,161.9,216.5,180.6,214.8,202.4Z"
          id="c816_2"
          //   className="c816"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#556D8D13-AAC0-48DE-9BAC-3B3684E013E6)"
          stroke="none"
          d="M344.5,170L344.5,131.9C340.9,135.1,337,138.1,332.8,140.8C329.7,142.8,326.4,144.6,323.1,146.3C331.8,152.5,339.2,160.6,344.5,170Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M344.5,170L344.5,131.9C340.9,135.1,337,138.1,332.8,140.8C329.7,142.8,326.4,144.6,323.1,146.3C331.8,152.5,339.2,160.6,344.5,170Z"
          id="c816_3"
          //   className="c816"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#DD34E371-09F5-4C0C-83F5-803C2A650731)"
          stroke="none"
          d="M279.6,272.4C309.8,272.4,335.2,251.7,342.5,223.7C322.2,231.4,300.6,235.4,278.7,235.4C257.5,235.4,236.6,231.7,216.9,224.4C217.4,226.2,217.9,227.9,218.5,229.6L218.5,229.6L218.5,229.6C227.6,254.6,251.6,272.4,279.6,272.4Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#be9d53"
          stroke="none"
          d="M279.6,272.4C309.8,272.4,335.2,251.7,342.5,223.7C322.2,231.4,300.6,235.4,278.7,235.4C257.5,235.4,236.6,231.7,216.9,224.4C217.4,226.2,217.9,227.9,218.5,229.6L218.5,229.6L218.5,229.6C227.6,254.6,251.6,272.4,279.6,272.4Z"
          id="c1624_1"
          //   className="c1624"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#3720E19B-99D8-46E2-A0FB-8D07689C8D28)"
          stroke="none"
          d="M214.6,170C219.9,160.8,227,152.9,235.4,146.7C228,143.2,221,138.7,214.6,133.4L214.6,170Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M214.6,170C219.9,160.8,227,152.9,235.4,146.7C228,143.2,221,138.7,214.6,133.4L214.6,170Z"
          id="c816_3"
          //   className="c816"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#1700B1FA-5AB9-4122-9580-906EFABBD52D)"
          stroke="none"
          d="M344.3,212.4L214.8,212.4C215,214.9,215.3,217.3,215.8,219.7C235.7,227.4,257,231.4,278.7,231.4C301,231.4,323,227.2,343.5,219C343.9,216.8,344.2,214.6,344.3,212.4Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M344.3,212.4L214.8,212.4C215,214.9,215.3,217.3,215.8,219.7C235.7,227.4,257,231.4,278.7,231.4C301,231.4,323,227.2,343.5,219C343.9,216.8,344.2,214.6,344.3,212.4Z"
          id="c816_4"
          //   className="c816"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#68A2B35B-A441-4B3C-8B44-FBE5753E2954)"
          stroke="none"
          d="M134.7,162.5L56.8,223C66.9,234.7,82.1,250.4,102.1,265.9C125.3,284,150.4,298.4,176.8,308.7C179.5,309.7,182.2,310.7,184.8,311.6L211.2,238.1C208.6,232.4,206.7,226.3,205.7,219.9C200.6,217.6,195.6,215.1,190.8,212.4L184.6,212.4L184.6,208.7C165.2,196.6,148.2,180.9,134.7,162.5Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#be9d53"
          stroke="none"
          d="M134.7,162.5L56.8,223C66.9,234.7,82.1,250.4,102.1,265.9C125.3,284,150.4,298.4,176.8,308.7C179.5,309.7,182.2,310.7,184.8,311.6L211.2,238.1C208.6,232.4,206.7,226.3,205.7,219.9C200.6,217.6,195.6,215.1,190.8,212.4L184.6,212.4L184.6,208.7C165.2,196.6,148.2,180.9,134.7,162.5Z"
          id="lc1624_1"
          //   className="lc1624"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#0E46E422-5151-485F-B201-1860DDE5649C)"
          stroke="none"
          d="M204.6,117.8L204.6,0L194.6,0L194.6,103.2C197.5,108.4,200.9,113.3,204.6,117.8Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M204.6,117.8L204.6,0L194.6,0L194.6,103.2C197.5,108.4,200.9,113.3,204.6,117.8Z"
          id="c08_2"
          //   className="c08"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#470D9FFB-0063-44C6-B210-E03C96403BA1)"
          stroke="none"
          d="M188.6,313C218,323,248.9,328,280.7,328C312.1,328,342.6,323.1,371.5,313.2L346,242.1C333.4,266.1,308.4,282.4,279.6,282.4C251.2,282.4,226.4,266.5,213.7,243.1L188.6,313Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#be9d53"
          stroke="none"
          d="M188.6,313C218,323,248.9,328,280.7,328C312.1,328,342.6,323.1,371.5,313.2L346,242.1C333.4,266.1,308.4,282.4,279.6,282.4C251.2,282.4,226.4,266.5,213.7,243.1L188.6,313Z"
          id="c1624_2"
          //   className="c1624"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#8854DA75-26B7-4A07-A7AE-D21E6BEB91D6)"
          stroke="none"
          d="M349.1,505.9L212,505.9C213.7,528.2,226.1,548.5,245.3,560L315.8,560C335,548.5,347.5,528.2,349.1,505.9Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="none"
          stroke="none"
          d="M349.1,505.9L212,505.9C213.7,528.2,226.1,548.5,245.3,560L315.8,560C335,548.5,347.5,528.2,349.1,505.9Z"
          id="backOfCourt_1"
          //   className="backOfCourt"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#CED39EB2-FECD-45FB-9AFB-E9A8E3E99B02)"
          stroke="none"
          d="M194.6,202.4L204.6,202.4L204.6,123.8C201,119.9,197.6,115.5,194.6,111L194.6,202.4Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M194.6,202.4L204.6,202.4L204.6,123.8C201,119.9,197.6,115.5,194.6,111L194.6,202.4Z"
          id="c816_5"
          //   className="c816"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#EB678CA5-F054-46EF-A86D-96235D142EB4)"
          stroke="none"
          d="M399,495.9L352.6,329.2C329.4,335.1,305.3,338,280.7,338C255.6,338,230.9,334.9,207.1,328.9L162,495.9L202,495.9C204.5,454.8,238.8,422,280.6,422C322.3,422,356.6,454.8,359.1,495.9L399,495.9Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#be9d53"
          stroke="none"
          d="M399,495.9L352.6,329.2C329.4,335.1,305.3,338,280.7,338C255.6,338,230.9,334.9,207.1,328.9L162,495.9L202,495.9C204.5,454.8,238.8,422,280.6,422C322.3,422,356.6,454.8,359.1,495.9L399,495.9Z"
          id="c24Plus_1"
          //   className="c24Plus"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#D1180169-FF94-421B-BF11-77A1F34A38C0)"
          stroke="none"
          d="M280.6,432C244.3,432,214.5,460.3,212,495.9L349.1,495.9C346.6,460.3,316.8,432,280.6,432Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#be9d53"
          stroke="none"
          d="M280.6,432C244.3,432,214.5,460.3,212,495.9L349.1,495.9C346.6,460.3,316.8,432,280.6,432Z"
          id="c24Plus_2"
          //   className="c24Plus"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#EBD5942C-CBBA-4A3F-A0D5-B5A0DBA106E2)"
          stroke="none"
          d="M202,505.9L0.3,505.9L0.3,560L228.5,560C213,546.3,203.3,526.8,202,505.9Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="none"
          stroke="none"
          d="M202,505.9L0.3,505.9L0.3,560L228.5,560C213,546.3,203.3,526.8,202,505.9Z"
          id="backOfCourt_2"
          //   className="backOfCourt"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#56BB1893-B75B-4600-A37E-9C1C77B9C852)"
          stroke="none"
          d="M354.5,115.5C357.4,111.9,360,108,362.3,103.9L362.3,0L354.5,0L354.5,115.5Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M354.5,115.5C357.4,111.9,360,108,362.3,103.9L362.3,0L354.5,0L354.5,115.5Z"
          id="c08_3"
          //   className="c08"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#DB373714-1988-487A-A66E-9CB5F79CFFF4)"
          stroke="none"
          d="M457.4,56.4C457.4,87.7,449.3,118.4,433.8,145.4C431.1,150.1,428.2,154.6,425.1,159.1L503.9,220.3C510.2,212.7,514,207.1,515.6,204.8L515.6,0L448.3,0C454.4,18.2,457.4,37.1,457.4,56.4Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#be9d53"
          stroke="none"
          d="M457.4,56.4C457.4,87.7,449.3,118.4,433.8,145.4C431.1,150.1,428.2,154.6,425.1,159.1L503.9,220.3C510.2,212.7,514,207.1,515.6,204.8L515.6,0L448.3,0C454.4,18.2,457.4,37.1,457.4,56.4Z"
          id="r1624_1"
          //   className="r1624"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#5B7000BD-383E-4C31-A219-D09E126B7F5F)"
          stroke="none"
          d="M372.3,204.2C396.2,189,416.3,168,430.4,143.4C445.4,117.1,453.4,87,453.4,56.4C453.4,37.1,450.3,18.2,444.1,0L372.3,0L372.3,204.2Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M372.3,204.2C396.2,189,416.3,168,430.4,143.4C445.4,117.1,453.4,87,453.4,56.4C453.4,37.1,450.3,18.2,444.1,0L372.3,0L372.3,204.2Z"
          id="r816_1"
          //   className="r816"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#DA8FAEB4-F574-409B-89E7-E791B57DBBC8)"
          stroke="none"
          d="M239.2,144.1C250.9,136.6,264.7,132.3,279.6,132.3C294.1,132.3,307.6,136.4,319.1,143.6C328.4,139.3,337,133.5,344.5,126.4L344.5,0L214.6,0L214.6,128.1C222,134.7,230.3,140.1,239.2,144.1Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M239.2,144.1C250.9,136.6,264.7,132.3,279.6,132.3C294.1,132.3,307.6,136.4,319.1,143.6C328.4,139.3,337,133.5,344.5,126.4L344.5,0L214.6,0L214.6,128.1C222,134.7,230.3,140.1,239.2,144.1Z"
          id="c08_4"
          //   className="c08"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#149C44ED-105C-4C81-908C-878B940EE03B)"
          stroke="none"
          d="M525.6,0L560,0L560,204.2L525.6,204.2L525.6,0"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M525.6,0L560,0L560,204.2L525.6,204.2L525.6,0"
          id="r24Plus_1"
          //   className="r24Plus"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#836F7C33-2DC9-4E52-8341-E5CB526A70A5)"
          stroke="none"
          d="M560,505.9L359.1,505.9C357.8,526.8,348.1,546.3,332.6,560L560,560L560,505.9Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="none"
          stroke="none"
          d="M560,505.9L359.1,505.9C357.8,526.8,348.1,546.3,332.6,560L560,560L560,505.9Z"
          id="backOfCourt_3"
          //   className="backOfCourt"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#C448C204-6E54-4FA9-8FEB-7FCD89EA012E)"
          stroke="none"
          d="M103.9,56.4C103.9,86.9,111.9,116.9,126.9,143.2C140.9,167.8,160.8,188.7,184.6,203.9L184.6,0L113.2,0C107.1,18.1,103.9,37.1,103.9,56.4Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#be9d53"
          stroke="none"
          d="M103.9,56.4C103.9,86.9,111.9,116.9,126.9,143.2C140.9,167.8,160.8,188.7,184.6,203.9L184.6,0L113.2,0C107.1,18.1,103.9,37.1,103.9,56.4Z"
          id="l816_1"
          //   className="l816"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#4E4F645F-D399-4993-895B-BD6D577C4B3D)"
          stroke="none"
          d="M354.4,212.4C354.3,213,354.3,213.6,354.2,214.3C355.5,213.7,356.8,213,358.1,212.4L354.5,212.4L354.4,212.4Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M354.4,212.4C354.3,213,354.3,213.6,354.2,214.3C355.5,213.7,356.8,213,358.1,212.4L354.5,212.4L354.4,212.4Z"
          id="c816_7"
          //   className="c816"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#97AD38B4-29A0-4450-B666-153286EB1840)"
          stroke="none"
          d="M354.5,202.4L362.3,202.4L362.3,111.6C360,115.2,357.3,118.6,354.5,121.8L354.5,202.4Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M354.5,202.4L362.3,202.4L362.3,111.6C360,115.2,357.3,118.6,354.5,121.8L354.5,202.4Z"
          id="c816_8"
          //   className="c816"
          fillOpacity="1"
          opacity="0.6"
          className="example3"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#9E5CB46F-2E13-464C-B86C-511B4D4C5225)"
          stroke="none"
          d="M348.4,237.1L375.3,311.9C378.3,310.9,381.3,309.7,384.3,308.6C410.4,298.2,435.2,283.8,457.9,265.7C477.2,250.4,491.7,235,501.4,223.4L422.8,162.3C409.1,180.9,392,196.8,372.3,208.9L372.3,212.4L366.5,212.4C362.3,214.7,358,216.9,353.7,218.9C352.7,225.3,350.9,231.4,348.4,237.1Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#be9d53"
          stroke="none"
          d="M348.4,237.1L375.3,311.9C378.3,310.9,381.3,309.7,384.3,308.6C410.4,298.2,435.2,283.8,457.9,265.7C477.2,250.4,491.7,235,501.4,223.4L422.8,162.3C409.1,180.9,392,196.8,372.3,208.9L372.3,212.4L366.5,212.4C362.3,214.7,358,216.9,353.7,218.9C352.7,225.3,350.9,231.4,348.4,237.1Z"
          id="rc1624_1"
          //   className="rc1624"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#35179F87-BEEF-4104-A978-85C144A4AB4A)"
          stroke="none"
          d="M99.9,56.4C99.9,37.1,103,18.2,109,0L42.5,0L42.5,204.7C44.1,207,48,212.5,54.2,219.9L132.3,159.2C129.1,154.7,126.2,150,123.4,145.2C108.1,118.3,99.9,87.6,99.9,56.4Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M99.9,56.4C99.9,37.1,103,18.2,109,0L42.5,0L42.5,204.7C44.1,207,48,212.5,54.2,219.9L132.3,159.2C129.1,154.7,126.2,150,123.4,145.2C108.1,118.3,99.9,87.6,99.9,56.4Z"
          id="l1624_1"
          //   className="l1624"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#A47FB2B3-1243-4D2D-8CCE-778A89F716C8)"
          stroke="none"
          d="M203.2,327.8C193,325.1,182.9,321.8,172.9,317.9C145.6,307.2,119.6,292.3,95.6,273.6C54.8,241.7,34.1,210.3,33.3,209L32.8,208.2L0.3,208.2L0.3,495.9L157.8,495.9L203.2,327.8Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#be9d53"
          stroke="none"
          d="M203.2,327.8C193,325.1,182.9,321.8,172.9,317.9C145.6,307.2,119.6,292.3,95.6,273.6C54.8,241.7,34.1,210.3,33.3,209L32.8,208.2L0.3,208.2L0.3,495.9L157.8,495.9L203.2,327.8Z"
          id="lc24Plus_1"
          //   className="lc24Plus"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#DCCE6BD2-C8BC-4647-AE6C-896D46CD9DE7)"
          stroke="none"
          d="M0.3,0L32.5,0L32.5,204.2L0.3,204.2L0.3,0"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#9e9e9e"
          stroke="none"
          d="M0.3,0L32.5,0L32.5,204.2L0.3,204.2L0.3,0"
          id="l24Plus_1"
          //   className="l24Plus"
          fillOpacity="1"
          opacity="0.75"
          className="example5"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="url(#A708AC9E-8273-473A-8C7D-F6AD73B17693)"
          stroke="none"
          d="M560,495.9L560,208.2L525.2,208.2L524.8,208.9C524,210.2,504.2,241.7,464.1,273.5C440.6,292.3,415,307.2,387.9,317.9C377.7,321.9,367.1,325.4,356.4,328.2L403.1,495.9L560,495.9Z"
          opacity="1"
          className="example2"
        ></path>
        <path
          onClick={() => {
            console.log("111111");
          }}
          fill="#be9d53"
          stroke="none"
          d="M560,495.9L560,208.2L525.2,208.2L524.8,208.9C524,210.2,504.2,241.7,464.1,273.5C440.6,292.3,415,307.2,387.9,317.9C377.7,321.9,367.1,325.4,356.4,328.2L403.1,495.9L560,495.9Z"
          id="rc24Plus_1"
          //   className="rc24Plus"
          fillOpacity="1"
          opacity="0.4"
          className="example4"
        ></path>
        <text
          x="277"
          y="55"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_c08"
          //   data-className="c08"
        >
          <tspan className="example1" dy="7.514904975891113">
            12.1%
          </tspan>
        </text>
        <text
          x="277"
          y="195"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_c816"
          //   data-className="c816"
        >
          <tspan className="example1" dy="7.514908790588379">
            18.2%
          </tspan>
        </text>
        <text
          x="277"
          y="295"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_c1624"
          //   data-className="c1624"
        >
          <tspan className="example1" dy="7.514908790588379">
            5.3%
          </tspan>
        </text>
        <text
          x="277"
          y="395"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_c24Plus"
          //   data-className="c24Plus"
        >
          <tspan className="example1" dy="7.514908790588379">
            9.2%
          </tspan>
        </text>
        <text
          x="150"
          y="55"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_l816"
          //   data-className="l816"
        >
          <tspan className="example1" dy="7.514904975891113">
            5.8%
          </tspan>
        </text>
        <text
          x="89"
          y="155"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_l1624"
          //   data-className="l1624"
        >
          <tspan className="example1" dy="7.514908790588379">
            0.7%
          </tspan>
        </text>
        <text
          x="43"
          y="55"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example7"
          fontSize="28px"
          fontFamily="Roboto, sans-serif"
          id="label_l24Plus"
          //   data-className="l24Plus"
        >
          <tspan className="example1" dy="9.802045822143555">
            1.8%
          </tspan>
        </text>
        <text
          x="139"
          y="244"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_lc1624"
          //   data-className="lc1624"
        >
          <tspan className="example1" dy="7.514908790588379">
            3.0%
          </tspan>
        </text>
        <text
          x="89"
          y="395"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_lc24Plus"
          //   data-className="lc24Plus"
        >
          <tspan className="example1" dy="7.514908790588379">
            3.0%
          </tspan>
        </text>
        <text
          x="477"
          y="155"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_r1624"
          //   data-className="r1624"
        >
          <tspan className="example1" dy="7.514908790588379">
            1.1%
          </tspan>
        </text>
        <text
          x="395"
          y="55"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_r816"
          //   data-className="r816"
        >
          <tspan className="example1" dy="7.514904975891113">
            18.1%
          </tspan>
        </text>
        <text
          x="513"
          y="55"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_r24Plus"
          //   data-className="r24Plus"
        >
          <tspan className="example1" dy="7.514904975891113">
            0.5%
          </tspan>
        </text>
        <text
          x="422"
          y="233"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_rc1624"
          //   data-className="rc1624"
        >
          <tspan className="example1" dy="7.514908790588379">
            8.7%
          </tspan>
        </text>
        <text
          x="477"
          y="395"
          textAnchor="middle"
          font='10px "Arial"'
          stroke="none"
          fill="#444444"
          className="example6"
          fontSize="22px"
          fontFamily="Roboto, sans-serif"
          id="label_rc24Plus"
          //   data-className="rc24Plus"
        >
          <tspan className="example1" dy="7.514908790588379">
            4.9%
          </tspan>
        </text>
        <image
          x="228"
          y="439"
          width="110"
          height="110"
          preserveAspectRatio="none"
          // xlinkHref="./img/teams/logos/PHX_logo.svg"
          className="example1"
        ></image>
      </svg>
    </div>
  );
}

export default Court;
