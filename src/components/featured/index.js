import React from 'react'
import {graphql,navigate,StaticQuery} from 'gatsby'
import styled from 'styled-components';

//--------------------------------------------------

export default ({}) => (
  <StaticQuery query={graphql`query MyQuery {
  allContentfulBlog(limit: 1, sort: {fields: [createdAt], order: DESC}, filter: {node_locale: {eq: "en-US"}, featured: {eq: true}}) {
    edges {
      node {
        id
        slug
        title
        shortDescription
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
`}

  render={data=>{
    console.log('edge.node.featuredImage.fluid.src')

    return(
    <Featured>
      {
        data.allContentfulBlog.edges.map(edge=>(
          <div key={edge.node.id} className='header__section'>
            <div className='header__hero' style={{backgroundImage:`url(${edge.node.featuredImage.fluid.src})`}}></div>
            <div className='header__content'>
              <div className='header__info'>
                <h1 className='header__title'>{edge.node.title}</h1>
                <p className='header__subtitle'>{edge.node.shortDescription}</p>
                <button onClick={()=>navigate(`/blog/$edge.node.slug`)} className='btn__med'>Read More</button>
              </div>
            </div>
          </div>
        ))
      }
    </Featured>
  )}}
  />
)

const Featured = styled.header`
.header__hero {
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
  height: 580px;
  width:100vw;
  position:absolute;
  top:0;
  left:50%;
  right:50%;
  margin-left:-50vw;
  margin-right:-50vw;
  z-index:-1;
}

.header__hero:before {
  content:'';
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  background-image : linear-gradient(
    to bottom,
    rgba(10,10,10,0.6) 0%,
    rgba(10,10,10,0.6) 50%,
    rgba(10,10,10,1) 100%
  );
}
.header__content {
  display:flex;
  flex-direction: column;
  justify-content:center;
  min-height: 500px;
}

.header__info {
  max-width:500px;
  margin-top:40px;
}

.header__title {
  margin: 0 0 38px 0;
}

.header__subtitle {
  font-size: 18px;
  line-height:24px;
  color:#300;
  margin: 0 0 38px 0;
}

`
