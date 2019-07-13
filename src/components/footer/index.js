import React from "react"
import styled from 'styled-components';
//-----------------------------------------

const assets = {
  img: require("../../assets/img/general-footer-image-bd5ba555101fe1d764b720abb5314f4b.jpg"),
}
export default ({}) =>(
    <Footer className='footer__hero' style={{
      backgroundImage: `linear-gradient(
      to bottom,
      rgba(10, 10, 10, 1)0%,
            rgba(10, 10, 10, 0.6)50%,
      rgba(10, 10, 10, 1)100%),
url(${assets.img}
      )`,
    }}>
    </Footer>
  )

 const Footer = styled.div`
 background-position:center;
 background-size:cover;
 background-repeat:no-repeat;
 height:580px;
 width:100vw;
 position:absolute;
 left:50%;
 right:50%;
 margin-left:-50vw;
 margin-right:-50vw;
 z-index:-1;
 transform:translateY(-580px);
 `