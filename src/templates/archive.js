import React from "react"
import styled from "styled-components"
import Layout from "../components/layout/layout"
import { NavBar } from "../components/nav"
import SEO from "../components/seo/seo"
import { graphql, navigate, StaticQuery, Link } from "gatsby"

//--------------------------------------------
const assets = {
  headerImg: require("../assets/img/general-header-image-949c7e63908216492c2e5e4bbc15423d.jpg"),
  back: require('../assets/img/back.svg'),
  next: require('../assets/img/next.svg'),
}

export default (props) => {
  const blogContent = props.data.allContentfulBlog
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/blog" : `/blog/${currentPage - 1}`
  const nextPage = `/blog/${currentPage + 1}`
  return (
    <Layout>
      <SEO title='Blog' keywords={["travel", "travel blog", "travel photography"]}/>
      <NavBar/>
      <header>
        <Section>
          <div className='archive__hero' style={{ backgroundImage: `url(${assets.headerImg})` }}></div>
          <div className='archive__nav'>
            <Link to='/blog'
                  className={window.location.href.indexOf("/blog") > 0 ? "archive__nav--link selected" : "archive__nav--link"}>All</Link>
            <Link to='/category/travel'
                  className={window.location.href.indexOf("category/travel") > 0 ? "archive__nav--link selected" : "archive__nav--link"}>Travel</Link>
            <Link to='/category/guide'
                  className={window.location.href.indexOf("category/guide") > 0 ? "archive__nav--link selected" : "archive__nav--link"}>Guide</Link>
            <Link to='/category/opinion'
                  className={window.location.href.indexOf("category/opinion") > 0 ? "archive__nav--link selected" : "archive__nav--link"}>Opinion</Link>
            <Link to='/category/tech'
                  className={window.location.href.indexOf("category/tech") > 0 ? "archive__nav--link selected" : "archive__nav--link"}>Tech</Link>
          </div>
          <Feed>
            {blogContent.edges.map(edge => (
              <div key={edge.node.id} className='card'
                   style={{
                     backgroundImage: `
             linear-gradient(
             to bottom,
             rgba(10, 10, 10, 0) 0%,
             rgba(10, 10, 10, 0) 50%,
             rgba(10, 10, 10, 0.7) 100%),
             url(${edge.node.featuredImage.fluid.src})
             `,
                   }}
                   onClick={() => navigate(`/blog/${edge.node.slug}`)}
              >
                {edge.node.category.map(category => (
                  <p className='card__category'>{category.title}</p>
                ))}
                <p className='card__title'>{edge.node.title}</p>
              </div>
            ))}
          </Feed>
          <div className='pagination'>
            <div className='pagination__item'>
              {!isFirst && (
                <Link to={prevPage} rel='prev'>
                  <div className='arrow__back'></div>
                </Link>
              )}
            </div>
            <div className='pagination__item'>
              {!isLast && (
                <Link to={nextPage} rel='next'>
                  <div className='arrow__next'></div>
                </Link>
              )}
            </div>
          </div>
        </Section>
      </header>
    </Layout>
  )
}
const Section = styled.div`
.archive__hero {
  background-position: center;
  background-size:cover;
  background-repeat: no-repeat;
  height:580px;
  with:100vw;
  position: absolute;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  maring-right: -50vw;
  z-index: -1;
}

.archive__hero:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0; 
  left: 0;
  bottom: 0;
  background-image : linear-gradient(
    to bottom,
    rgba(10,10,10,0.6) 0%,
    rgba(10,10,10,0.6) 50%,
    rgba(10,10,10,1) 100%
  );
}

.archive__nav {
  display: flex;
  min-height: 200px;
  padding: 60px 20px 0px 20px;
  justify-content: space-evenly;
  align-items: flex-end;
  margin-bottom: 60px;
}

.archive__nav--link {
  font-family: Muli,sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  transition: all .3s ease 0s;
  text-decoration: none;
}

.archive__nav--link::after {
  content: '';
  display: block;
  width: 0;
  height: 3px;
  background: #f06666;
  transition: width .3s;
  margin-top: 1rem;
}

.archive__nav--link:hover::after {
  width:100%;
}

.selected::after {
  width: 100%;
}

.pagination {
  display: flex;
  padding: 0 10%;
  maring: 1rem 0 3rem 0;
  justify-content: center;
}

.pagination__item {
  align-self:center;
}

.arrow__next {
  height: 15px;
  width: 15px;
  border: 1px solid #fff;
  opacity: 0.5;
  border-width: 2px 2px 0 0;
  transform: rotate(45deg);
  transition: all .3s ease;
}

.arrow__back {
  height: 15px;
  width: 15px;
  border: 1px solid #fff;
  opacity: 0.5;
  border-width: 2px 2px 0 0;
  transform: rotate(225deg);
  transition: all .3s ease;
}

.arrow__next:hover {
  height: 15px;
  width: 15px;
  border: 1px solid #f06666;
  opacity: 1.0;
  border-width: 2px 2px 0 0;
  transform: rotate(225deg);
  transition: all .3s ease;
}

.arrow__back:hover {
  height: 15px;
  width: 15px;
  border: 1px solid #f06666;
  opacity: 1.0;
  border-width: 2px 2px 0 0;
  transform: rotate(225deg);
  transition: all .3s ease;
}


@media screen and (max-width: 800px) {
  .archive__nav {
    display: flex;
    min-height: 200px;
    padding: 60px 0 0 0;
    justify-content: space-evenly;
    align-items: flex-end;
    margin-bottom: 60px;
  }
  
}
`
export const pageQuery = graphql` 
 query ArchiveQuery ($skip: Int!, $limit: Int!) {
   allContentfulBlog(
       sort: { fields: [createdAt], order: DESC }
       filter: {
       node_locale: {eq: "en-US",}}
       skip: $skip
       limit: $limit
     ) {
     edges {
       node {
         id
         slug
         title
         createdAt
         category {
           title
           id
         }
         featuredImage {
           fluid(maxWidth: 1200, quality: 85) {
             src
             ...GatsbyContentfulFluid
           }
         }
       }
     }
   }
 }
`

const Feed = styled.div`
    display: grid;
    grid-template-columns: repeat(12,1fr);
    grid-auto-rows: 300px;
    grid-gap: 16px;
    margin: 40px 0;

.card__category {
  font-size:14px;
  line-height:18px;
  font-weight:700;
  color:#fff;
  margin:0;
}

.card__title {
  font-size:24px;
  line-height:28px;
  color:#fff;
  margin:10px 0 0 0;
}

.card {
  background-size:cover;
  background-repeat:no-repeat;
  background-position: center;
  border-radius:5px;
  border:none;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  padding:20px;
  transition: all .3s ease;
}
 
.card:hover {
  cursor:pointer;
  transform:scale(1.02);
}

.card:nth-child(1){
  grid-column-start: span 6;
}
.card:nth-child(6){
  grid-column-start: span 6;
}
.card:nth-child(7){
  grid-column-start: span 6;
}
.card:nth-child(2){
  grid-column-start: span 3;
}
.card:nth-child(3){
  grid-column-start: span 3;
}
.card:nth-child(4){
  grid-column-start: span 3;
}
.card:nth-child(5){
  grid-column-start: span 3;
}
.card:nth-child(8){
  grid-column-start: span 3;
}
.card:nth-child(9){
  grid-column-start: span 3;
}

@media screen and (max-width:1200px) {
  .card:nth-child(n) {
    grid-column-start : span 6;
  }
}

@media screen and (max-width:800px) {
  .card:nth-child(n) {
    grid-column-start : span 12;
  }
}

`