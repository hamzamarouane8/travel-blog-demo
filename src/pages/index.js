import React from "react"
import Featured from "../components/featured"
import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"
import { NavBar } from "../components/nav"
import "../assets/styles/app.scss"
import Home from "../components/home"
import { Link } from "gatsby"
import styled from "styled-components"
import Footer from "../components/footer"
//-------------------------------------------------

const IndexPage = () => (
  <Layout>
    <SEO title="Home"/>
    <NavBar/>
    <Featured/>
    <Home/>
    <ViewMoreLink to='/blog' className='viewmore'>View More</ViewMoreLink>
    <Footer/>
  </Layout>
)

export default IndexPage

const ViewMoreLink = styled(Link)`
font-size:18px;
line-height24px;
font-weight:700;
color:#fff;
text-align:center;
margin-bottom:40px;
display:block;
text-decoration:none;
transition:all .3s ease 0s;
&:hover{
  color:#f06666;
}

`