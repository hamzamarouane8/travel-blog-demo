import React from "react"
import styled from "styled-components"
import Layout from "../components/layout/layout"
import { NavBar } from "../components/nav"
import SEO from "../components/seo/seo"
//--------------------------------------------

const assets = {
  img: require('../assets/img/quote.svg')
}
export const query = graphql`
query BlogTemplate($id: String!) {
  contentfulBlog(id: {eq: $id}){
    title
    id
    slug
    content {
      childMarkdownRemark {
        html
      }
    }
    seoTitle
    seoDescription
    seoAuthor
    seoKeywords
    seoImage {
      fluid(maxWidth: 1200, quality: 100) {
        ...GatsbyContentfulFluid
      }
    }
    featuredImage {
      fluid(maxWidth: 1200, quality: 100) {
        ...GatsbyContentfulFluid
        src
      }
    }
  }

}
`

export default (props) => {
  let data = props.data.contentfulBlog
  return (
    <BlogHeader img={assets.img}>
    <Layout>
      <SEO title={data.seoTitle} description={data.seoDescription} keywords={data.seoKeyords}/>
      <NavBar/>
      <div className='blog__header'>
        <div className='blog__hero' style={{ backgroundImage: `url(${data.featuredImage.fluid.src})` }}></div>
        <div className='blog_info'>
          <h1 className='blog__title'>{data.title}</h1>
        </div>
      </div>
      <div className='blog__wrapper'>
        <div className='blog__content' >
          <div dangerouslySetInnerHTML={{ __html: `<div>${data.content.childMarkdownRemark.html}</div>` }}/>
        </div>
      </div>
    </Layout>
      </BlogHeader>
  )
}

const BlogHeader = styled.div`
.blog__hero{
  background-repeat: no-repeat;
  background-size:cover;
  background-position:center;
  height: 460px;
  width: 100vw;
  position: absolute;
  top:0;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  z-index: -1;
  opacity: 0.5;
}

.blog__info {
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  min-height: 460px;
}

.blog__title {
  text-align:center;
  max-width: 960px;
}

.blog__wrapper{
  width:100vw;
  background-color:#fff;
  top:70%;
  left:50%;
  right: 50%;
  position: absolute;
  margin-left: -50vw;
  margin-right: -50vw;
 }

  .blog__content {
    max-width: 960px;
    margin: 60px auto;
  }

  .blog__content p {
  font-size: Multi,sans-serif;
    font-size: 18px;
    line-height: 32px;
    color: #0a0a0a;
    margin: 40px 0;
  }
  
  .blog__content blockquote {
    margin :0 0 60px 0;
  }
  
  .blog__content blockquote:before {
    content: url(${props => props.img});
    display: inline-block;
    width: 50px;
    transform: translateY(30px);
  }
  
  .blog__content blockquote p {
    font-size: 48px;
    line-height: 46px;
    font-weight: 700;
    color
  }
  
  .blog__content img {
    border-radius: 5px;
    box-shadow: 0px 10px 10px -2px rgba(10, 10, 10, 0.15);
  }
  
  .center {
    width: 90%;
    display: block;
    margin: 60px auto;
  }
  
  .right {
    float: right;
    margin: 40px 0 60px 60px;
  }
  
  @media screen and (max-width: 1000px) {
    .right {
      float: none;
      width: 90%;
      display: block;
      margin: 60px auto;
    }
    .blog__content {
    padding: 0 10%;
  }
  }
`

const BlogWrapper = styled.div`
 
`
/*
 left: 50%;
  right: 50%;
  position: absolute;
  margin-left: -50vw;
  margin-right: -50vw;
 */